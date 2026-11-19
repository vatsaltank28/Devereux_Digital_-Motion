import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the Devereux Digitals website and engaging our services.",
  path: "/terms",
  noindex: true,
});

/** Highlighted placeholder for details the client still has to confirm. */
const Todo = ({ children }: { children: string }) => (
  <mark className="rounded bg-accent-deep px-1.5 py-0.5 text-accent-bright">[{children}]</mark>
);

const Section = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <section className="border-t border-line pt-8">
    <h2 className="t-h4 text-ink">
      <span className="mr-3 font-display text-sm tabular-nums text-accent-bright">{String(n).padStart(2, "0")}</span>
      {title}
    </h2>
    <div className="mt-4 space-y-4">{children}</div>
  </section>
);

const mail = (
  <a href={`mailto:${site.contact.email}`} className="text-ink underline underline-offset-4">
    {site.contact.email}
  </a>
);

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms & Conditions"
        description="The terms that apply when you use this website and when you engage Devereux Digitals for a project."
        trail={[{ name: "Home", href: "/" }, { name: "Terms" }]}
      />
      <div className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <p className="t-caption">
            Last updated: <Todo>Effective date</Todo>
          </p>
          <div className="mt-8 max-w-[46rem] space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <Section n={1} title="About these terms">
              <p>
                These terms apply to your use of this website and to services provided by {site.legalName ?? site.name} (“Devereux Digitals”, “we”, “us”). By using this website or engaging our services, you agree to them. Where a written proposal or agreement exists for your project, that document takes priority over these terms.
              </p>
            </Section>

            <Section n={2} title="Our services">
              <p>
                We provide web design and development, digital and sales marketing, paid advertising, e-commerce solutions, video and content, AI and business solutions, and branding and creative design. The exact scope, deliverables and timeline for each project are confirmed in writing before work begins.
              </p>
            </Section>

            <Section n={3} title="Pricing and quotes">
              <ul className="list-disc space-y-2 pl-5">
                <li>All prices shown on this website are in US dollars (USD).</li>
                <li>Prices are starting estimates. Final pricing depends on project scope and is confirmed in your quote or proposal.</li>
                <li>Optional add-ons are priced separately and confirmed in your quote.</li>
                <li>
                  Advertising spend, third-party subscriptions, API usage, hosting, domains, plugins and other platform costs are separate from our fees and are paid by the client.
                </li>
                <li>
                  Quotes are valid for <Todo>Quote validity, for example 30 days</Todo>.
                </li>
              </ul>
            </Section>

            <Section n={4} title="Payments">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  One-off projects: <Todo>Deposit required before work starts, for example 50%, and when the balance is due</Todo>
                </li>
                <li>
                  Monthly packages are billed in advance each month. <Todo>Billing date and accepted payment methods</Todo>
                </li>
                <li>
                  Late payments may pause work until the account is up to date. <Todo>Any late payment fee</Todo>
                </li>
              </ul>
            </Section>

            <Section n={5} title="Monthly packages and cancellation">
              <p>
                Monthly packages continue month to month until cancelled. <Todo>Notice period to cancel, for example 14 or 30 days, and any minimum term</Todo> Unused deliverables do not carry over to the next month unless agreed in writing.
              </p>
            </Section>

            <Section n={6} title="Revisions and approvals">
              <p>
                Each project includes the number of revision rounds stated in your proposal. <Todo>Default number of revision rounds</Todo> Additional changes, or changes to an agreed scope, may be quoted separately. Work is treated as approved when you confirm it, or when it goes live at your request.
              </p>
            </Section>

            <Section n={7} title="Your responsibilities">
              <ul className="list-disc space-y-2 pl-5">
                <li>Provide content, footage, logins, feedback and approvals on time so the project can stay on schedule.</li>
                <li>Make sure you have the rights to any text, images, video, logos or other material you give us to use.</li>
                <li>Keep your account passwords and platform access secure after handover.</li>
              </ul>
            </Section>

            <Section n={8} title="Ownership and intellectual property">
              <p>
                Once your project is paid in full, ownership of the final deliverables created for you transfers to you, except for third-party assets (such as fonts, stock media, plugins and software), which remain under their own licences. We may show completed work in our portfolio and on this website unless you ask us not to in writing.
              </p>
            </Section>

            <Section n={9} title="Refunds">
              <p>
                <Todo>Refund policy, for example whether deposits are refundable and how work already completed is charged if a project is cancelled</Todo>
              </p>
            </Section>

            <Section n={10} title="Results">
              <p>
                We work hard to deliver quality and measurable outcomes, but results from marketing, advertising, SEO and sales activity depend on many factors outside our control. We do not guarantee specific rankings, traffic, leads, sales or revenue.
              </p>
            </Section>

            <Section n={11} title="Limitation of liability">
              <p>
                To the extent permitted by law, we are not liable for indirect or consequential losses, or for issues caused by third-party platforms, hosting providers or services outside our control. Our total liability for any project is limited to the fees you paid for that project.
              </p>
            </Section>

            <Section n={12} title="Using this website">
              <p>
                The content, design and images on this website belong to Devereux Digitals or are used with permission, and may not be copied or reused without our consent. Information on this website is provided for general guidance and may change without notice.
              </p>
            </Section>

            <Section n={13} title="Governing law">
              <p>
                These terms are governed by the laws of <Todo>Country / state whose law applies</Todo>.
              </p>
            </Section>

            <Section n={14} title="Contact us">
              <p>
                Questions about these terms? Email {mail} or call {site.contact.phone}.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
