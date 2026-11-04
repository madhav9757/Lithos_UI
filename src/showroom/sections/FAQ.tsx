/**
 * @fileoverview Lithos UI accordion stack.
 * - Packs questions into a hard-edged vertical wall with explicit open/closed slabs.
 * - Uses the same zero-gap spacing language as the rest of the system.
 * - Keeps the reveal motion physical by changing fill weight, not layout flow.
 */

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Is Lithos UI production ready?',
    answer:
      'Yes. The library is structured for reliable composition, predictable spacing, and resilient visual contrast.',
  },
  {
    question: 'Does it work with Tailwind?',
    answer: 'Yes. Every component is written as a Tailwind-first React section with no dependency on custom config.',
  },
  {
    question: 'Can I mix these sections with my own UI?',
    answer:
      'Absolutely. The system is intentionally modular so individual blocks can be dropped into existing products.',
  },
  {
    question: 'Why no soft shadows or rounded defaults?',
    answer:
      'Because Lithos UI is built around neo-brutalist clarity: hard edges, high contrast, and explicit structure.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="bg-(--lithos-strata) py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Frequently Asked Questions
        </h2>

        {/* - 24px shell keeps the accordion aligned with the page rhythm. */}
        <div className="mt-20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className={
                  index === 0
                    ? 'border-2 border-(--lithos-border) bg-(--lithos-surface) transition-all duration-150 ease-out'
                    : 'mt-6 border-2 border-(--lithos-border) bg-(--lithos-surface) transition-all duration-150 ease-out'
                }
              >
                {/* - Open/closed states shift color and mass, not geometry. */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className={
                    isOpen
                      ? 'flex w-full items-center justify-between bg-(--lithos-accent) px-6 py-6 text-left transition-all duration-150 ease-out cursor-pointer'
                      : 'group flex w-full items-center justify-between bg-(--lithos-surface) hover:bg-(--lithos-accent) px-6 py-6 text-left shadow-[4px_4px_0px_0px_var(--lithos-shadow)] transition-all duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)] active:shadow-[2px_2px_0px_0px_var(--lithos-shadow)] cursor-pointer'
                  }
                >
                  <span
                    className={`pr-6 text-2xl font-black uppercase tracking-tighter leading-none md:text-3xl ${isOpen ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors'}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`text-5xl font-black uppercase tracking-tighter leading-none ${isOpen ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text) group-hover:text-(--lithos-accent-text) transition-colors'}`}
                    aria-hidden="true"
                  >
                    {isOpen ? '-' : '+'}
                  </span>
                </button>

                {/* - The answer is a separate slab with a hard top border to preserve the stack. */}
                {isOpen ? (
                  <div className="border-t-4 border-(--lithos-border) bg-(--lithos-accent) px-6 py-6">
                    <p className="text-lg font-bold uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { FAQ }
