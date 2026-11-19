"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { m, AnimatePresence } from "motion/react";
import { serviceOptions } from "@/lib/enquiry-schema";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { AlertIcon, CheckIcon } from "@/components/ui/Icons";

/**
 * Detailed project enquiry. On submit the form validates, then opens the visitor's email app
 * with a fully written enquiry addressed to the agency (mailto), so nothing depends on a server.
 */

const BUDGETS = ["Under $500", "$500 to $1,500", "$1,500 to $5,000", "$5,000+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 to 3 months", "Flexible"];
const CONTACT_PREFS = ["Email", "Phone call", "WhatsApp"];

interface Values {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  contactPref: string;
  message: string;
  consent: boolean;
}
type Errors = Partial<Record<keyof Values, string>>;
const fieldOrder: Array<keyof Values> = ["name", "email", "phone", "service", "budget", "timeline", "message", "consent"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, like name@company.com.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number, including country code.";
  if ((v.contactPref === "Phone call" || v.contactPref === "WhatsApp") && !v.phone.trim())
    e.phone = `Add a number so we can reach you by ${v.contactPref === "WhatsApp" ? "WhatsApp" : "phone"}.`;
  if (!v.service) e.service = "Choose the service you’re interested in.";
  if (!v.budget) e.budget = "Choose an approximate budget.";
  if (!v.timeline) e.timeline = "Choose a timeline.";
  if (v.message.trim().length < 30) e.message = "Tell us a little more about the project (at least 30 characters).";
  if (!v.consent) e.consent = "Please confirm so we can reply to your enquiry.";
  return e;
}

function buildMail(v: Values) {
  const service = serviceOptions.find((o) => o.value === v.service)?.label ?? v.service;
  const subject = `New project enquiry: ${service} | ${v.name.trim()}`;
  const line = (k: string, val: string) => `${k}: ${val.trim() || "Not provided"}`;
  const body = [
    "Hello Devereux Digitals,",
    "",
    "I would like to enquire about a project. My details are below.",
    "",
    "CONTACT DETAILS",
    line("Name", v.name),
    line("Email", v.email),
    line("Phone", v.phone),
    line("Preferred contact", v.contactPref),
    "",
    "BUSINESS",
    line("Company", v.company),
    line("Current website / social", v.website),
    "",
    "PROJECT",
    line("Service", service),
    line("Budget", v.budget),
    line("Timeline", v.timeline),
    "",
    "PROJECT DETAILS",
    v.message.trim(),
    "",
    "Kind regards,",
    v.name.trim(),
  ].join("\n");
  return { subject, body, href: `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <m.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} className="field-error">
          <AlertIcon size={16} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </m.p>
      )}
    </AnimatePresence>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-7">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden="true" className="form-step">
        <span className="form-step-num">{n}</span>
        <span className="t-h4">{title}</span>
      </div>
      {children}
    </fieldset>
  );
}

export function ProjectEnquiryForm({ defaultService }: { defaultService?: string }) {
  const uid = useId();
  const initialService = serviceOptions.some((o) => o.value === defaultService) ? (defaultService as string) : "";
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    service: initialService,
    budget: "",
    timeline: "",
    contactPref: "Email",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<null | ReturnType<typeof buildMail>>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: keyof Values) => (errors[name] ? id(`${name}-error`) : undefined);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (errors[name as keyof Values]) setErrors((cur) => ({ ...cur, [name]: validate(next)[name as keyof Values] }));
      return next;
    });
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === "radio") return;
    const name = e.target.name as keyof Values;
    setErrors((cur) => ({ ...cur, [name]: validate(values)[name] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = fieldOrder.find((f) => errs[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      track("contact_form_error", { fields: Object.keys(errs).join(",") });
      return;
    }
    const mail = buildMail(values);
    track("contact_form_submit", { service: values.service });
    window.location.href = mail.href;
    setSent(mail);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="card p-8 outline-none md:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-success)_18%,transparent)] text-success">
          <CheckIcon size={24} />
        </span>
        <h2 className="t-h3 mt-6">Your enquiry is ready to send</h2>
        <p className="t-body mt-3">
          We’ve opened your email app with everything filled in. Just press <strong className="text-ink">Send</strong> and we’ll reply to{" "}
          <strong className="text-ink">{values.email}</strong>.
        </p>
        <p className="t-body mt-3">If your email app didn’t open, use one of these options:</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={sent.href} className="field-input inline-flex w-auto items-center justify-center font-semibold">
            Open email again
          </a>
          <button
            type="button"
            className="field-input inline-flex w-auto items-center justify-center font-semibold"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`To: ${site.contact.email}\nSubject: ${sent.subject}\n\n${sent.body}`);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Copied to clipboard" : "Copy enquiry text"}
          </button>
        </div>
        <p className="t-caption mt-4">
          Or email us directly at{" "}
          <a href={`mailto:${site.contact.email}`} className="text-ink underline underline-offset-4">
            {site.contact.email}
          </a>
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <button type="button" className="link-arrow" onClick={() => setSent(null)}>
            Edit enquiry
          </button>
          <Link href="/" className="link-arrow">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const text = (name: keyof Values, label: ReactNode, props: React.InputHTMLAttributes<HTMLInputElement> = {}, full = false) => (
    <div className={full ? "field sm:col-span-2" : "field"}>
      <label htmlFor={id(name)} className="field-label">
        {label}
      </label>
      <input
        id={id(name)}
        name={name}
        value={values[name] as string}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describe(name)}
        className="field-input"
        {...props}
      />
      <FieldError id={id(`${name}-error`)} message={errors[name]} />
    </div>
  );

  const chips = (name: "budget" | "timeline" | "contactPref", label: string, options: string[]) => (
    <div className="field" role="radiogroup" aria-labelledby={id(`${name}-label`)} aria-describedby={describe(name)}>
      <p id={id(`${name}-label`)} className="field-label">
        {label}
      </p>
      <div className="chip-group mt-1">
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="radio" name={name} value={o} checked={values[name] === o} onChange={onChange} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <FieldError id={id(`${name}-error`)} message={errors[name]} />
    </div>
  );

  const optional = <span className="font-normal text-subtle">(optional)</span>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-7 p-6 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="t-h3">Project enquiry</h2>
          <p className="t-caption mt-1.5">Takes about 2 minutes. Fields are required unless marked optional.</p>
        </div>
      </div>

      {errorCount > 0 && (
        <div role="alert" className="flex gap-3 rounded-xl border border-danger/50 bg-danger/10 p-4 text-[0.95rem]">
          <AlertIcon className="mt-0.5 shrink-0 text-danger" />
          <p>{`Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} below, then send your enquiry again.`}</p>
        </div>
      )}

      <Step n={1} title="About you">
        <div className="grid gap-6 sm:grid-cols-2">
          {text("name", "Full name", { type: "text", autoComplete: "name" })}
          {text("email", "Email address", { type: "email", inputMode: "email", autoComplete: "email" })}
          {text("phone", <>Phone / WhatsApp {optional}</>, { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "+1 555 123 4567" })}
          {text("company", <>Company or brand {optional}</>, { type: "text", autoComplete: "organization" })}
          {text("website", <>Current website or social link {optional}</>, { type: "text", inputMode: "url", placeholder: "https://" }, true)}
        </div>
      </Step>

      <Step n={2} title="Your project">
        <div className="grid gap-6">
          <div className="field">
            <label htmlFor={id("service")} className="field-label">
              Service of interest
            </label>
            <select
              id={id("service")}
              name="service"
              value={values.service}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describe("service")}
              className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a5a9b2%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11"
            >
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <FieldError id={id("service-error")} message={errors.service} />
          </div>
          {chips("budget", "Approximate budget (USD)", BUDGETS)}
          {chips("timeline", "Ideal timeline", TIMELINES)}
        </div>
      </Step>

      <Step n={3} title="Project details">
        <div className="grid gap-6">
          <div className="field">
            <label htmlFor={id("message")} className="field-label">
              Tell us about the project
            </label>
            <textarea
              id={id("message")}
              name="message"
              rows={6}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={[id("message-hint"), describe("message")].filter(Boolean).join(" ")}
              placeholder="Your goals, who it’s for, anything that has or hasn’t worked before, and examples you like."
              className="field-input min-h-40 resize-y py-3"
            />
            <p id={id("message-hint")} className="t-caption mt-1.5">
              The more detail you share, the more useful our first reply will be.
            </p>
            <FieldError id={id("message-error")} message={errors.message} />
          </div>
          {chips("contactPref", "How should we contact you?", CONTACT_PREFS)}
        </div>
      </Step>

      <div className="field border-t border-line pt-7">
        <label className="flex cursor-pointer items-start gap-3.5 text-[0.95rem] leading-snug text-muted">
          <input name="consent" type="checkbox" checked={values.consent} onChange={onChange} aria-invalid={Boolean(errors.consent)} aria-describedby={describe("consent")} className="peer sr-only" />
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-line-strong bg-bg text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-[var(--color-on-accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-bright"
          >
            <CheckIcon size={14} strokeWidth={3} />
          </span>
          <span>
            I agree to Devereux Digitals using these details to reply to my enquiry. See the{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id={id("consent-error")} message={errors.consent} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-caption max-w-[22rem]">Submitting opens your email app with the enquiry written and addressed to {site.contact.email}.</p>
        <Button type="submit" arrow className="max-sm:w-full">
          Send enquiry
        </Button>
      </div>
    </form>
  );
}
