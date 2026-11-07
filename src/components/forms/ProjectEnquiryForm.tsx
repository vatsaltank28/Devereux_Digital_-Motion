"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { m, AnimatePresence } from "motion/react";
import { enquirySchema, flattenErrors, serviceOptions, type EnquiryFieldErrors } from "@/lib/enquiry-schema";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { AlertIcon, CheckIcon } from "@/components/ui/Icons";

type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  name: string;
  email: string;
  service: string;
  company: string;
  message: string;
  consent: boolean;
  nickname: string;
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldOrder: Array<keyof Values> = ["name", "email", "service", "company", "message", "consent"];

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <m.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18 }}
          className="field-error"
        >
          <AlertIcon size={16} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </m.p>
      )}
    </AnimatePresence>
  );
}

export function ProjectEnquiryForm({ defaultService }: { defaultService?: string }) {
  const uid = useId();
  const [startedAt] = useState(() => Date.now());
  const initialService = serviceOptions.some((o) => o.value === defaultService) ? (defaultService as string) : "";
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    service: initialService,
    company: "",
    message: "",
    consent: false,
    nickname: "",
  });
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [devNotDelivered, setDevNotDelivered] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard / screen-reader users land on the result.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;

  const validate = (v: Values) => {
    const res = enquirySchema.safeParse({ ...v, startedAt });
    return res.success ? {} : flattenErrors(res.error);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Once a field has shown an error, re-validate it live so the message clears as soon as it's fixed.
      if (errors[name as keyof EnquiryFieldErrors]) {
        const live = validate(next);
        setErrors((cur) => ({ ...cur, [name]: live[name as keyof EnquiryFieldErrors] }));
      }
      return next;
    });
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof Values;
    if (name === "nickname") return;
    const live = validate(values);
    setErrors((cur) => ({ ...cur, [name]: live[name as keyof EnquiryFieldErrors] }));
  };

  const focusFirstError = (errs: EnquiryFieldErrors) => {
    const first = fieldOrder.find((f) => errs[f as keyof EnquiryFieldErrors]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setServerMessage(null);

    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus("error");
      focusFirstError(clientErrors);
      track("contact_form_error", { fields: Object.keys(clientErrors).join(",") });
      return;
    }

    setStatus("submitting");
    try {
      const turnstileToken = (formRef.current?.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null)?.value;
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt, turnstileToken }),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string; fieldErrors?: EnquiryFieldErrors; delivered?: boolean; mode?: string }
        | null;

      if (res.ok && body?.ok) {
        setDevNotDelivered(body.mode === "dev-not-delivered");
        setStatus("success");
        track("contact_form_submit", { service: values.service });
        return;
      }

      // Recoverable failure: keep every value, explain what happened.
      if (body?.fieldErrors) {
        setErrors(body.fieldErrors);
        focusFirstError(body.fieldErrors);
      }
      setServerMessage(body?.message ?? "Something went wrong sending your enquiry. Your message is still here — please try again.");
      setStatus("error");
      track("contact_form_error", { code: res.status });
    } catch {
      setServerMessage("We couldn’t reach the server. Check your connection — your message is still here, so you can try again.");
      setStatus("error");
      track("contact_form_error", { code: "network" });
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="card p-8 outline-none md:p-12"
        aria-live="polite"
      >
        <span className="grid size-12 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-success)_18%,transparent)] text-success">
          <CheckIcon size={24} />
        </span>
        {devNotDelivered ? (
          <>
            <h2 className="t-h3 mt-6">Form works — nothing was sent</h2>
            <p className="t-body mt-3">
              Development mode: no email or webhook provider is configured, so this enquiry was validated but <strong className="text-ink">not delivered</strong>. Add the variables from <code className="rounded bg-surface-3 px-1.5 py-0.5 text-[0.9em]">.env.example</code> to go live.
            </p>
          </>
        ) : (
          <>
            <h2 className="t-h3 mt-6">Thanks — your enquiry has been sent</h2>
            <p className="t-body mt-3">
              We’ll read it and reply to <strong className="text-ink">{values.email}</strong> to talk through what you need.
            </p>
          </>
        )}
        <Link href="/" className="link-arrow mt-8">
          Back to home
        </Link>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const describe = (name: keyof EnquiryFieldErrors) => (errors[name] ? id(`${name}-error`) : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 md:p-10" aria-describedby={id("intro")}>
      <p id={id("intro")} className="t-caption mb-8">
        All fields are required unless marked optional.
      </p>

      {(serverMessage || (status === "error" && errorCount > 0)) && (
        <div role="alert" className="mb-8 flex gap-3 rounded-xl border border-danger/50 bg-danger/10 p-4 text-[0.95rem]">
          <AlertIcon className="mt-0.5 shrink-0 text-danger" />
          <p>
            {serverMessage ??
              `Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} below, then send your enquiry again.`}
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={id("name")} className="field-label">
            Name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className="field-input"
          />
          <FieldError id={id("name-error")} message={errors.name} />
        </div>

        <div className="field">
          <label htmlFor={id("email")} className="field-label">
            Work email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className="field-input"
          />
          <FieldError id={id("email-error")} message={errors.email} />
        </div>

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

        <div className="field">
          <label htmlFor={id("company")} className="field-label">
            Company or website <span className="font-normal text-subtle">(optional)</span>
          </label>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describe("company")}
            className="field-input"
          />
          <FieldError id={id("company-error")} message={errors.company} />
        </div>

        <div className="field sm:col-span-2">
          <label htmlFor={id("message")} className="field-label">
            Project summary
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
            className="field-input min-h-40 resize-y py-3"
          />
          <p id={id("message-hint")} className="t-caption mt-1.5">
            What you want to achieve, any deadlines, and links to anything relevant.
          </p>
          <FieldError id={id("message-error")} message={errors.message} />
        </div>

        {/* Honeypot — hidden from people and assistive tech; bots tend to fill every field. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={id("nickname")}>Leave this field empty</label>
          <input id={id("nickname")} name="nickname" type="text" tabIndex={-1} autoComplete="off" value={values.nickname} onChange={onChange} />
        </div>
      </div>

      <div className="field mt-6">
        <label className="flex cursor-pointer items-start gap-3.5 text-[0.95rem] leading-snug text-muted">
          <input
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={onChange}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describe("consent")}
            className="peer sr-only"
          />
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

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile mt-6" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
        </>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" arrow={status !== "submitting"} disabled={status === "submitting"} aria-busy={status === "submitting"} className="max-sm:w-full">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <span className="sr-only" role="status" aria-live="polite">
          {status === "submitting" ? "Sending your enquiry" : ""}
        </span>
      </div>
    </form>
  );
}
