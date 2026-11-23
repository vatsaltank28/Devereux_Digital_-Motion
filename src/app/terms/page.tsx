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

const EFFECTIVE_DATE = "November 22, 2026";

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
            Effective date: {EFFECTIVE_DATE}
          </p>
          <div className="mt-8 max-w-[46rem] space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <Section n={1} title="About these terms">
              <p>
                These terms apply to your use of this website and to services provided by Devereux Digitals (“Devereux Digitals”, “we”, “us” or “our”), a digital services agency located at {site.contact.address}. By using this website or engaging our services, you agree to them. Where a written proposal or agreement exists for your project, that document takes priority over these terms.
              </p>
            </Section>

            <Section n={2} title="Our services">
              <p>
                We provide web design and development, digital and sales marketing, paid advertising, ecommerce solutions, video and content, AI and business solutions, and branding and creative design for businesses, brands, creators, SMPs, servers and online communities. The exact scope, deliverables and timeline for each project are confirmed in writing before work begins.
              </p>
            </Section>

            <Section n={3} title="Pricing and quotes">
              <ul className="list-disc space-y-2 pl-5">
                <li>Submitting a project enquiry does not create a contract or commit you or us to a project.</li>
                <li>All prices shown on this website are in US dollars (USD).</li>
                <li>Prices are starting estimates. Final pricing depends on project scope and is confirmed in your quote or proposal.</li>
                <li>Optional add ons are priced separately and confirmed in your quote.</li>
                <li>
                  Advertising spend, third party subscriptions, API usage, hosting, domains, plugins and other platform costs are separate from our fees and are paid by the client.
                </li>
                <li>
                  Quotes are valid for 30 days from the date issued unless stated otherwise.
                </li>
              </ul>
            </Section>

            <Section n={4} title="Payments">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  One off projects require a deposit, as stated in your proposal, before work begins. The remaining balance is due on completion, before final files are handed over or the project goes live.
                </li>
                <li>
                  Monthly packages are billed in advance at the start of each billing cycle. Payments are made through the methods listed on your invoice.
                </li>
                <li>
                  Late payments may pause work until the account is up to date, and delivery timelines will be adjusted accordingly.
                </li>
              </ul>
            </Section>

            <Section n={5} title="Monthly packages and cancellation">
              <p>
                Monthly packages continue month to month until cancelled. To cancel, please give at least 30 days’ written notice by email, unless your proposal states a different notice period or minimum term. Unused deliverables do not carry over to the next month unless agreed in writing.
              </p>
            </Section>

            <Section n={6} title="Revisions and approvals">
              <p>
                Each project includes the number of revision rounds stated in your proposal or package. Additional changes, or changes to an agreed scope, may be quoted separately. Work is treated as approved when you confirm it, or when it goes live at your request.
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
                Once your project is paid in full, ownership of the final deliverables created for you transfers to you, except for third party assets (such as fonts, stock media, plugins and software), which remain under their own licences. We may show completed work in our portfolio and on this website unless you ask us not to in writing.
              </p>
            </Section>

            <Section n={9} title="Refunds">
              <p>
                Because our services involve time and creative work that begins once a project starts, deposits are nonrefundable once work has commenced. If a project is cancelled, fees for work completed up to the date of cancellation remain payable. Payments for monthly packages already billed are nonrefundable for that billing period. Where a refund is agreed, it will be confirmed in writing and processed through the original payment method.
              </p>
            </Section>

            <Section n={10} title="Results">
              <p>
                We work hard to deliver quality and measurable outcomes, but results from marketing, advertising, SEO and sales activity depend on many factors outside our control. We do not guarantee specific rankings, traffic, leads, sales or revenue.
              </p>
            </Section>

            <Section n={11} title="Limitation of liability">
              <p>
                To the extent permitted by law, we are not liable for indirect or consequential losses, or for issues caused by third party platforms, hosting providers or services outside our control. Our total liability for any project is limited to the fees you paid for that project.
              </p>
            </Section>

            <Section n={12} title="Disclaimer of warranties">
              <p>
                Except as expressly agreed in writing, this website and our services are provided “as is” and “as available”. To the extent permitted by law, we disclaim all implied warranties, including warranties of merchantability, fitness for a particular purpose and non infringement.
              </p>
            </Section>

            <Section n={13} title="Indemnification">
              <p>
                You agree to indemnify and hold Devereux Digitals harmless from claims, losses and expenses (including reasonable legal fees) arising from material you supply to us, your use of the deliverables, or your breach of these terms.
              </p>
            </Section>

            <Section n={14} title="Using this website">
              <p>
                The content, design and images on this website belong to Devereux Digitals or are used with permission, and may not be copied or reused without our consent. Information on this website is provided for general guidance and may change without notice.
              </p>
            </Section>

            <Section n={15} title="Governing law and jurisdiction">
              <p>
                These terms are governed by the laws of the State of New York, United States, without regard to its conflict of law principles. Any disputes will first be addressed in good faith through direct discussion. If a dispute cannot be resolved this way, it will be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York.
              </p>
            </Section>

            <Section n={16} title="Severability and entire agreement">
              <p>
                If any part of these terms is found to be unenforceable, the remaining parts will continue in full effect. These terms, together with any written proposal or agreement for your project, form the entire agreement between you and Devereux Digitals for that project.
              </p>
            </Section>

            <Section n={17} title="Changes to these terms">
              <p>
                We may update these terms from time to time. The latest version will always be published on this page with its effective date. Changes do not affect projects already agreed in writing.
              </p>
            </Section>

            <Section n={18} title="Contact us">
              <p>
                <span className="text-ink">Devereux Digitals</span>
                <br />
                {site.contact.address}
                <br />
                Email: {mail}
                <br />
                Phone: <a href={`tel:${(site.contact.phone ?? "").replace(/\s+/g, "")}`} className="text-ink underline underline-offset-4">{site.contact.phone}</a>
              </p>
            </Section>

            <p className="t-caption border-t border-line pt-8">
              Last updated: {EFFECTIVE_DATE}
              <br />© 2026 Devereux Digitals. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
