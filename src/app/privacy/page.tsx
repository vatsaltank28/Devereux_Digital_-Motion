import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Devereux Digitals collects, uses and protects the information you share with us.",
  path: "/privacy",
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

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="How Devereux Digitals collects, uses and protects the information you share with us when you visit this website or enquire about our services."
        trail={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />
      <div className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <p className="t-caption">
            Last updated: <Todo>Effective date</Todo>
          </p>
          <div className="mt-8 max-w-[46rem] space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <Section n={1} title="Who we are">
              <p>
                This website is operated by {site.legalName ?? site.name} (“Devereux Digitals”, “we”, “us”), a full-service digital agency offering web design and development, digital and sales marketing, paid advertising, e-commerce solutions, video and content, AI and business solutions, and branding and creative design.
              </p>
              <p>
                Registered business details: <Todo>Legal entity name, registration number and business address</Todo>
              </p>
              <p>For any privacy question or request, contact us at {mail}.</p>
            </Section>

            <Section n={2} title="Information we collect">
              <p>We only collect information you choose to give us. This may include:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Your name, email address and, if you provide them, your phone or WhatsApp number.</li>
                <li>Your company or brand name and your current website or social media links.</li>
                <li>Details about your project: the service you’re interested in, any package or add-ons you select, your budget range, timeline and project description.</li>
                <li>Your preferred contact method.</li>
                <li>Anything you send us directly by email, phone, WhatsApp, Discord, Facebook or TikTok.</li>
              </ul>
            </Section>

            <Section n={3} title="How the enquiry form works">
              <p>
                Our project enquiry form does not store your information on this website. When you press “Send enquiry”, the form opens your own email app with your details written into a message addressed to {mail}. Nothing is sent until you choose to send that email.
              </p>
            </Section>

            <Section n={4} title="How we use your information">
              <ul className="list-disc space-y-2 pl-5">
                <li>To reply to your enquiry and discuss your project.</li>
                <li>To prepare proposals, quotes and agreements.</li>
                <li>To deliver, support and manage the services you engage us for.</li>
                <li>To send important information about your project, such as updates, invoices and support messages.</li>
              </ul>
              <p>We do not sell, rent or trade your personal information, and we do not use it for unrelated marketing without your permission.</p>
            </Section>

            <Section n={5} title="Sharing your information">
              <p>
                We only share information when it is needed to deliver your project, for example with hosting, domain, payment, advertising or software platforms you ask us to set up or manage. These providers handle data under their own privacy policies. We may also disclose information where the law requires it.
              </p>
            </Section>

            <Section n={6} title="Cookies and analytics">
              <p>
                This website does not use advertising or tracking cookies. It stores one small preference in your browser, your light or dark theme choice, so the site looks the way you left it. You can clear this at any time through your browser settings.
              </p>
              <p>
                <Todo>Confirm whether any analytics tool (for example Google Analytics) will be added. If so, this section will be updated before it goes live.</Todo>
              </p>
            </Section>

            <Section n={7} title="Client reviews and work samples">
              <p>
                Reviews and chat screenshots shown on this website are shared with our clients’ permission. Names and personal details in chat screenshots are blurred to protect their privacy. Portfolio images are shown with client approval.
              </p>
            </Section>

            <Section n={8} title="How long we keep information">
              <p>
                We keep enquiry and project information only for as long as needed to respond to you, deliver our services and meet our legal and accounting obligations. <Todo>Retention period, for example 2 years after the last contact</Todo>
              </p>
            </Section>

            <Section n={9} title="How we protect your information">
              <p>
                We use reputable, secure platforms for email and file sharing, and limit access to the people working on your project. No method of transmission over the internet is completely secure, but we take reasonable steps to protect your information.
              </p>
            </Section>

            <Section n={10} title="Your rights">
              <p>
                You can ask us to tell you what information we hold about you, correct it, or delete it, and you can withdraw permission for us to contact you at any time. To make a request, email {mail} and we will respond within a reasonable time.
              </p>
              <p>
                <Todo>Country or region the business operates from, so any specific legal rights (for example GDPR or CCPA) can be listed</Todo>
              </p>
            </Section>

            <Section n={11} title="Third-party websites">
              <p>
                This website links to external platforms such as WhatsApp, Discord, Facebook, TikTok and Devereux Edits. Their own privacy policies apply when you use them.
              </p>
            </Section>

            <Section n={12} title="Changes to this policy">
              <p>We may update this policy from time to time. The latest version will always be published on this page with its effective date.</p>
            </Section>

            <Section n={13} title="Contact us">
              <p>
                Email: {mail}
                <br />
                Phone: {site.contact.phone}
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
