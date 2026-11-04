import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { useDynamicStrata } from '../core/hooks/useDynamicStrata'

const faqs = [
  {
    question: 'Is Lithos UI really free forever?',
    answer:
      "Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.",
  },
  {
    question: 'Is this just a fork of shadcn/ui?',
    answer:
      'No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal specificity overrides. It is engineered from scratch for structural stability, not cloned.',
  },
  {
    question: 'What is the Zero-Gap rule?',
    answer:
      'The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability across all viewports without flex/grid wrapping failures.',
  },
  {
    question: 'How do I contribute?',
    answer:
      "Lithos UI is actively seeking contributors. You can check out our repository on GitHub, find 'good first issue' tags, and submit pull requests. We welcome everything from bug fixes to new structural blocks.",
  },
  {
    question: 'Is there a roadmap?',
    answer:
      "Yes. Our development trajectory, upcoming blocks, and planned template scaffolding are tracked publicly. Check out the project board on our GitHub repository to see what's being engineered next.",
  },
]

export const Faq = () => {
  const strataStyle = useDynamicStrata()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-(--lithos-strata) text-(--lithos-text)" style={strataStyle}>
        <section className="pt-32 pb-24">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16 text-(--lithos-text)">
              Frequently Asked
            </h1>

            <div className="space-y-12">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-4 border-(--lithos-accent) pl-6">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">{faq.question}</h3>
                  <p className="text-lg md:text-xl font-medium font-body leading-relaxed opacity-90">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t-4 border-(--lithos-border)">
              <a
                href="https://github.com/users/IncredibleStand/projects/4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-(--lithos-accent) text-(--lithos-accent-text) text-xl font-black uppercase tracking-tighter px-8 py-4 lithos-click"
              >
                View Roadmap
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
