import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactCards } from "@/components/ui/ContactLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ProjectEnquiryForm } from "@/components/forms/ProjectEnquiryForm";

export const metadata: Metadata = buildMetadata({
  title: "Start a Project",
  description: "Tell Devereux Digitals about your project. Send an enquiry and we’ll reply to talk through the scope.",
  path: "/contact",
});

const nextSteps = [
  { title: "Send your enquiry", body: "Complete the form and submit it. Your enquiry comes straight to us." },
  { title: "We review it", body: "We read your goals, budget and timeline, and reply within one business day." },
  { title: "Discovery call", body: "A short call to clarify scope and answer your questions. No obligation." },
  { title: "Proposal", body: "A clear plan with deliverables, timeline and price, so you can decide with confidence." },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[]; package?: string | string[]; addons?: string | string[] }> }) {
  const params = await searchParams;
  const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v)?.slice(0, 200);
  const service = one(params.service);
  const pkg = one(params.package);
  const addons = one(params.addons)?.split("|").filter(Boolean).slice(0, 12) ?? [];

  return (
    <div className="relative isolate overflow-hidden pb-[var(--section-y)] pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3rem)]">
      <div className="hero-atmosphere absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="mb-8">
            <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          </div>
          <SectionLabel>Talk to us</SectionLabel>
          <SplitHeading as="h1" trigger="load" delay={0.05} className="t-h2 mt-6 max-w-[16ch]">
            Let’s build something that moves you forward.
          </SplitHeading>
          <p className="hero-rise t-lead mt-7" style={{ animationDelay: "0.4s" }}>
            Tell us what you’re looking to achieve. Whether it’s a new digital project, a growth campaign or something entirely different, we’ll help you find the right solution.
          </p>

          <div className="hero-rise mt-10" style={{ animationDelay: "0.5s" }}>
            <h2 className="t-h4">What happens next</h2>
            <ol className="mt-5 border-y border-line">
              {nextSteps.map((st, i) => (
                <li key={st.title} className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-line py-4 first:border-t-0">
                  <span className="form-step-num">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{st.title}</p>
                    <p className="mt-1 text-[0.95rem] text-muted">{st.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h2 className="t-h4">Prefer to reach us directly?</h2>
            <p className="mt-2 text-[0.95rem] text-muted">Email, call or message us on the channel that suits you.</p>
            <ContactCards className="mt-5" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ProjectEnquiryForm defaultService={service} selectedPackage={pkg} selectedAddOns={addons} />
        </div>
      </div>
    </div>
  );
}
