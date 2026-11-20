import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Devereux Digitals collects, uses, stores, shares and protects the information you share with us.",
  path: "/privacy",
  noindex: true,
});

const EFFECTIVE_DATE = "October 17, 2026";

const Section = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <section className="border-t border-line pt-8">
    <h2 className="t-h4 text-ink">
      <span className="mr-3 font-display text-sm tabular-nums text-accent-bright">{String(n).padStart(2, "0")}</span>
      {title}
    </h2>
    <div className="mt-4 space-y-4">{children}</div>
  </section>
);

const Sub = ({ children }: { children: ReactNode }) => <h3 className="pt-2 font-medium text-ink">{children}</h3>;

const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="list-disc space-y-2 pl-5">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const phone = (
  <a href={`tel:${(site.contact.phone ?? "").replace(/\s+/g, "")}`} className="text-ink underline underline-offset-4">
    {site.contact.phone}
  </a>
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
        description="How Devereux Digitals collects, uses, stores, shares and protects your information when you visit our website, contact us or use our digital services."
        trail={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />
      <div className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <p className="t-caption">Effective date: {EFFECTIVE_DATE}</p>
          <div className="mt-8 max-w-[46rem] space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <div className="space-y-4">
              <p>
                At Devereux Digitals, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, disclose and protect your information when you visit our website, contact us or use our digital services.
              </p>
              <p>By accessing our website or engaging with our services, you acknowledge the practices described in this Privacy Policy.</p>
            </div>

            <Section n={1} title="About Devereux Digitals">
              <p>
                Devereux Digitals (“Devereux Digitals”, “we”, “us” or “our”) is a digital services agency based in New York, United States, providing digital solutions to individuals, businesses, brands and organizations.
              </p>
              <p>
                Business name: Devereux Digitals
                <br />
                Address: {site.contact.address}
                <br />
                Email: {mail}
                <br />
                Phone: {phone}
              </p>
            </Section>

            <Section n={2} title="Information we collect">
              <p>We may collect different types of information depending on how you interact with our website and services.</p>
              <Sub>Personal information</Sub>
              <List
                items={[
                  "Full name.",
                  "Email address.",
                  "Phone number.",
                  "Business or company name.",
                  "Other contact information you voluntarily provide.",
                ]}
              />
              <Sub>Project and service information</Sub>
              <List
                items={[
                  "Project descriptions and requirements.",
                  "Business information and brand details.",
                  "Images, videos, documents and other uploaded files.",
                  "Website content and project assets.",
                  "Communication and feedback relating to your project.",
                ]}
              />
              <Sub>Technical information</Sub>
              <p>When you visit our website, certain technical information may be collected automatically, including:</p>
              <List
                items={[
                  "IP address.",
                  "Browser type and version.",
                  "Device and operating system information.",
                  "Pages visited and time spent on our website.",
                  "General website usage and interaction information.",
                ]}
              />
            </Section>

            <Section n={3} title="How we collect information">
              <List
                items={[
                  "Contact and enquiry forms submitted through our website.",
                  "Direct email communications.",
                  "Project applications and onboarding forms.",
                  "File uploads and project submissions.",
                  "Client communications and feedback.",
                  "Cookies and similar website technologies, where implemented.",
                ]}
              />
              <p>
                When you submit our project enquiry form, the details you enter are sent securely to our team by email through our email delivery provider, and are not stored in a database on this website. If online delivery is unavailable, your own email app opens instead with your details prepared in a message addressed to {mail}, and nothing is sent until you choose to send it. The form includes basic spam protection and does not use your details for any purpose other than replying to your enquiry.
              </p>
              <p>We may also receive information through third party platforms used to communicate with clients or deliver our services.</p>
            </Section>

            <Section n={4} title="How we use your information">
              <p>We use collected information for legitimate business and operational purposes, including:</p>
              <List
                items={[
                  "Responding to enquiries and service requests.",
                  "Understanding project requirements.",
                  "Preparing quotations and proposals.",
                  "Providing and managing our digital services.",
                  "Communicating project updates and important information.",
                  "Processing invoices and payments through applicable payment providers.",
                  "Improving our website, services and customer experience.",
                  "Maintaining business records.",
                  "Protecting against fraud, unauthorized access and misuse.",
                  "Complying with applicable legal obligations.",
                ]}
              />
              <p>
                We do not use personal information for purposes incompatible with those described in this policy without providing appropriate notice or obtaining consent where required.
              </p>
            </Section>

            <Section n={5} title="Cookies and website analytics">
              <p>
                Our website may use cookies and similar technologies to support essential functionality, understand website performance and improve user experience. These technologies may collect information about how visitors interact with our website. For example, we store your light or dark theme preference in your browser so the site displays the way you left it.
              </p>
              <p>
                If we implement third party analytics services, such as Google Analytics, those providers may process certain technical and usage information according to their own privacy policies. Where required by applicable law, we will provide appropriate notice and choices regarding nonessential cookies and tracking technologies.
              </p>
              <p>You can manage cookies through your browser settings. Disabling certain cookies may affect some website functionality.</p>
            </Section>

            <Section n={6} title="How we share information">
              <p>
                We do not disclose personal information indiscriminately. However, we may share relevant information with trusted third parties when reasonably necessary to operate our business and deliver our services. These may include:
              </p>
              <List
                items={[
                  "Payment processors and financial service providers.",
                  "Website hosting and infrastructure providers.",
                  "Cloud storage and file sharing platforms.",
                  "Email and communication services, including the provider that delivers website enquiries to us.",
                  "Project management and productivity tools.",
                  "Authorized developers, designers, editors and other contractors working on assigned projects.",
                  "Legal, regulatory or government authorities when disclosure is required by law.",
                ]}
              />
              <p>Third party service providers are expected to handle information appropriately and only for authorized purposes.</p>
              <p>We do not sell personal information for monetary consideration.</p>
            </Section>

            <Section n={7} title="Client reviews and work samples">
              <p>
                Reviews and chat screenshots shown on this website are shared with our clients’ permission, with names and personal details blurred to protect their privacy. Portfolio work is shown with client approval.
              </p>
            </Section>

            <Section n={8} title="Data storage and security">
              <p>
                We take reasonable administrative, technical and organizational measures to protect personal information against unauthorized access, disclosure, alteration, loss or misuse. These measures may include:
              </p>
              <List
                items={[
                  "Restricting access to information to authorized individuals.",
                  "Using reputable digital platforms and storage providers.",
                  "Maintaining appropriate account and access controls.",
                  "Limiting the collection of information to what is reasonably necessary.",
                  "Taking reasonable precautions when handling client files and project materials.",
                ]}
              />
              <p>
                Although we take reasonable steps to protect information, no method of electronic storage or internet transmission can be guaranteed to be completely secure.
              </p>
            </Section>

            <Section n={9} title="Data retention">
              <p>
                We retain personal information only for as long as reasonably necessary to fulfill the purposes for which it was collected, subject to applicable legal, accounting and business requirements. Our general retention periods are:
              </p>
              <List
                items={[
                  <><span className="text-ink">General enquiries:</span> up to 2 years after the last meaningful interaction.</>,
                  <><span className="text-ink">Client and project records:</span> generally up to 2 years after project completion.</>,
                  <><span className="text-ink">Financial and transaction records:</span> for the period required by applicable laws and regulations.</>,
                  <><span className="text-ink">Uploaded project files:</span> according to the agreed project arrangements and applicable retention requirements.</>,
                ]}
              />
              <p>
                Information may be retained for longer where necessary to resolve disputes, enforce agreements, meet legal obligations or protect our legitimate business interests. When information is no longer required, we will take reasonable steps to delete or securely dispose of it.
              </p>
            </Section>

            <Section n={10} title="Your privacy rights">
              <p>Depending on your location and the privacy laws that apply to you, you may have certain rights regarding your personal information. These may include:</p>
              <List
                items={[
                  "Requesting access to personal information we hold about you.",
                  "Requesting correction of inaccurate or incomplete information.",
                  "Requesting deletion of personal information, subject to applicable exceptions.",
                  "Requesting a copy of certain personal information.",
                  "Withdrawing consent where processing is based on consent.",
                  "Objecting to or restricting certain processing activities where applicable.",
                  "Opting out of certain targeted advertising or data sharing activities where required by law.",
                ]}
              />
              <p>
                Residents of New York, California and other states with applicable privacy laws may have additional rights. We will not discriminate against you for exercising any of these rights. In the event of a data breach affecting your personal information, we will notify you as required by applicable law, including the New York SHIELD Act.
              </p>
              <p>
                To exercise a privacy right, contact us at {mail}. We may need to verify your identity before processing certain requests, and we will respond to valid requests within the timeframes required by applicable law.
              </p>
            </Section>

            <Section n={11} title="Third party websites and services">
              <p>
                Our website and services may contain links to external websites, platforms or third party services, including social media platforms, payment services, portfolio platforms and other external tools. Devereux Digitals does not control the privacy practices or security policies of independent third party websites, and we encourage you to review the privacy policies of any external services you access.
              </p>
            </Section>

            <Section n={12} title="Children’s privacy">
              <p>
                Our website and services are not directed toward children under the age of 13. We do not knowingly collect personal information from children under 13 without legally required parental consent. If we become aware that personal information has been collected from a child in circumstances where it should not have been, we will take reasonable steps to address the situation.
              </p>
            </Section>

            <Section n={13} title="International data transfers">
              <p>
                Devereux Digitals may work with clients, contractors and service providers located in different countries. As a result, personal information may be processed or stored outside the country where it was originally collected. Where required by applicable privacy laws, we will take appropriate steps to ensure that international transfers of personal information receive the necessary protection.
              </p>
            </Section>

            <Section n={14} title="Changes to this Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our business operations, technologies, services or applicable legal requirements. When changes are made, the updated policy will be published on this page with a revised effective date. We encourage you to review this page periodically.
              </p>
            </Section>

            <Section n={15} title="Contact us">
              <p>If you have questions, concerns or requests regarding this Privacy Policy or the personal information we handle, please contact us:</p>
              <p>
                <span className="text-ink">Devereux Digitals</span>
                <br />
                {site.contact.address}
                <br />
                Email: {mail}
                <br />
                Phone: {phone}
              </p>
              <p>We will make reasonable efforts to review and respond to privacy related enquiries within the timeframes required by applicable law.</p>
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
