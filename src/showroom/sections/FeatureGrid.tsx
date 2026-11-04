/**
 * @fileoverview Lithos UI feature matrix.
 * - Presents the system as a rigid card field with explicit margins and hard edges.
 * - Uses scale-on-hover and shadow steps to imply physical lift without layout drift.
 * - Keeps the grid readable by controlling wrap math instead of relying on soft spacing.
 */
import { Card, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'

interface FeatureItem {
  title: string
  icon: string
  description: string
}

const features: FeatureItem[] = [
  {
    title: 'Zero-Gap Layout System',
    icon: '■',
    description:
      'Strict avoidance of CSS gap utilities. Perfect geometric stacking via explicit mathematically proportional margins.',
  },
  {
    title: 'Automated YIQ Contrast Engine',
    icon: '◐',
    description:
      'Real-time foreground color recalculation guarantees AA+ accessibility against any dynamic background token.',
  },
  {
    title: 'Universal Specificity Overrides',
    icon: '▲',
    description:
      'Engineered with a flat selector hierarchy, eliminating !important wrestling and enabling instant global theming.',
  },
  {
    title: 'Global Physics Tokens',
    icon: '⬣',
    description:
      'Standardized hard-shadow offsets, staggered spring curves, and hover lifts baked natively into the core.',
  },
]

const FeatureGrid = () => {
  return (
    <section id="features" className="border-b-2 border-(--lithos-border) py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-center text-(--lithos-text) md:text-5xl">
          Four Architectural Pillars
        </h2>

        <div className="mt-20 -m-4 flex flex-wrap justify-center">
          {features.map((feature) => (
            <Card key={feature.title} variant="accent" interactive className="group m-4 w-full sm:w-[calc(50%-2rem)]">
              <CardContent className="flex flex-col h-full">
                <div
                  className="flex h-14 w-14 items-center justify-center border-2 border-(--lithos-border) bg-(--lithos-accent) text-3xl text-(--lithos-accent-text) group-hover:bg-(--lithos-text) group-hover:text-(--lithos-surface) transition-colors duration-300"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <CardTitle className="mt-6 text-2xl mb-4">{feature.title}</CardTitle>
                <CardDescription className="text-base font-medium">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/docs"
            className="font-black uppercase tracking-tighter text-(--lithos-text) transition-colors hover:text-(--lithos-accent) cursor-pointer"
          >
            Explore the full library →
          </a>
        </div>
      </div>
    </section>
  )
}

export { FeatureGrid }
