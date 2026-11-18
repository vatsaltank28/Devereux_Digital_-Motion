import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Website terms of use for devereuxdigitals.com.",
  path: "/terms",
  noindex: true,
});

const Todo = ({ children }: { children: string }) => (
  <mark className="rounded bg-accent-deep px-1.5 py-0.5 text-accent-bright">[{children}]</mark>
);

/** DRAFT shell, PRD §6 lists Terms as "if required by client". Content must come from the client's legal adviser. */
export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms"
        description="Draft placeholder. Replace with the client’s approved website terms, or remove this page and its footer link if terms are not required."
        trail={[{ name: "Home", href: "/" }, { name: "Terms" }]}
      />
      <section className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <div className="max-w-[44rem] space-y-6 text-[1.0625rem] leading-relaxed text-muted">
            <p>
              <Todo>Website terms of use: acceptable use, intellectual property in site content, limitation of liability, governing law</Todo>
            </p>
            <p>
              Project work is governed by the written proposal agreed with each client, not by these website terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
