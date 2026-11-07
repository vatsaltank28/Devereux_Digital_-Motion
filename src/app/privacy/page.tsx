import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Devereux Digitals handles the details you share through the project enquiry form.",
  path: "/privacy",
  noindex: true,
});

const Todo = ({ children }: { children: string }) => (
  <mark className="rounded bg-accent-deep px-1.5 py-0.5 text-accent-bright">[{children}]</mark>
);

/**
 * DRAFT. Describes what the website itself does today. Legal wording, retention periods, controller identity and
 * jurisdiction-specific rights must be supplied/approved by the client (PRD §12, §18). Marked noindex until then.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Draft: describes how this website handles enquiry details. It must be reviewed and replaced with the approved policy before launch."
        trail={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />
      <section className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <div className="max-w-[44rem] space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <div>
              <h2 className="t-h4 text-ink">Who we are</h2>
              <p className="mt-3">
                {site.legalName ?? site.name} operates this website. <Todo>Legal entity name, registered address and contact for privacy requests</Todo>
              </p>
            </div>
            <div>
              <h2 className="t-h4 text-ink">What the enquiry form collects</h2>
              <p className="mt-3">
                When you send an enquiry we receive your name, work email, the service you’re interested in, an optional company or website, and the project summary you write. We use these only to reply to you and to discuss your project.
              </p>
            </div>
            <div>
              <h2 className="t-h4 text-ink">Where it goes</h2>
              <p className="mt-3">
                Enquiries are delivered to us by <Todo>email or CRM provider approved by the client</Todo>. We do not sell your details. The form has spam protection and a rate limit; it does not send what you type to analytics.
              </p>
            </div>
            <div>
              <h2 className="t-h4 text-ink">How long we keep it</h2>
              <p className="mt-3">
                <Todo>Retention period to be confirmed</Todo>
              </p>
            </div>
            <div>
              <h2 className="t-h4 text-ink">Analytics and cookies</h2>
              <p className="mt-3">
                <Todo>Describe the analytics provider and consent approach once approved. Until one is configured, this site sets no analytics cookies.</Todo>
              </p>
            </div>
            <div>
              <h2 className="t-h4 text-ink">Your rights</h2>
              <p className="mt-3">
                <Todo>List the rights that apply in the client’s jurisdiction and how to exercise them</Todo>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
