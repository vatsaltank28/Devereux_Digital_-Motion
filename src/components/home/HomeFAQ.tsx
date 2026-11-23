import { homeFaqs } from "@/data/faqs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQAccordion } from "@/components/services/FAQAccordion";

export function HomeFAQ() {
  return (
    <section id="faq" aria-labelledby="home-faq-title" className="section-tight scroll-mt-[var(--header-h)] border-t border-line">
      <div className="wrap-wide grid gap-7 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="home-faq-title" className="t-h2 mt-4">Questions, answered.</h2>
        </div>
        <div className="lg:col-span-8"><FAQAccordion faqs={homeFaqs} /></div>
      </div>
    </section>
  );
}
