"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-forge-accent/5 blur-[140px] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <p className="font-display text-forge-accent text-xs tracking-[0.2em] uppercase mb-4">
            Frequently Asked
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forge-text">
            ATS resume optimizer, demystified.
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className="bg-forge-surface border border-forge-border rounded-xl overflow-hidden transition-colors hover:border-forge-border-bright"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-forge-text font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`text-forge-accent text-xl transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-forge-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
