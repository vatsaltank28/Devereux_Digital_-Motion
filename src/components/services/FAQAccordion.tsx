"use client";

import { useId, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import type { Faq } from "@/data/types";
import { PlusIcon } from "@/components/ui/Icons";

/**
 * S09 — FAQ accordion (DESIGN.md §4.9). Native <button> triggers with aria-expanded/aria-controls;
 * answers stay in the DOM (collapsed panels are inert + aria-hidden, not removed), so text remains
 * searchable. Motion owns the height/opacity of each panel and the rotation of the plus icon.
 * One panel open at a time keeps the page short; every question is reachable by Tab.
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const base = useId();
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const duration = reduce ? 0 : 0.28;

  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        const buttonId = `${base}-btn-${faq.id}`;
        const panelId = `${base}-panel-${faq.id}`;
        return (
          <div key={faq.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : faq.id)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] font-medium leading-snug tracking-[-0.015em] transition-colors hover:text-accent-bright"
              >
                <span>{faq.question}</span>
                <m.span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration }}
                >
                  <PlusIcon size={16} />
                </m.span>
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              inert={!open}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p className="t-body max-w-[58ch] pb-7 pr-12">{faq.answer}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
