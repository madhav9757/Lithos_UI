/**
 * @fileoverview Lithos UI blocks and templates showcase.
 * - Displays pre-composed section templates built strictly with Lithos primitives.
 * - Highlights Hero, Pricing, Feature Grids, and full Landing Page Templates.
 */
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { IconArrowRight } from '../../components/ui/icons'

const SHOWCASE_BLOCKS = [
  {
    title: 'Hero Slabs',
    badge: '2 VARIANTS',
    description: 'Zero-gap viewport openers with kinetic tracking grids and high-impact typography.',
    cli: 'npx lithos-ui add hero-1',
    link: '/blocks/hero',
  },
  {
    title: 'Pricing Matrix',
    badge: 'PRODUCTION READY',
    description: 'Brutalist tier comparisons with tactile badges and dynamic contrast CTA triggers.',
    cli: 'npx lithos-ui add pricing-1',
    link: '/blocks/pricing',
  },
  {
    title: 'Feature Grids',
    badge: 'ZERO-GAP',
    description: 'Rigid card fields with explicit margins, hard shadows, and physical hover lifts.',
    cli: 'npx lithos-ui add feature-grids-1',
    link: '/blocks/feature-grids',
  },
  {
    title: 'Landing Templates',
    badge: 'FULL PAGES',
    description: 'Complete multi-section pages combining Navbar, Hero, Features, Pricing, and Footer.',
    cli: 'npx lithos-ui add landing-1',
    link: '/templates',
  },
]

export const BlocksShowcase = () => {
  const navigate = useNavigate()

  return (
    <section id="blocks-showcase" className="border-b-2 border-(--lithos-border) py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-accent) mb-3">
            COMPOSITION OVER ISOLATION
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none text-(--lithos-text)">
            ASSEMBLE PAGES, NOT JUST ATOMS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-(--lithos-text) opacity-80 font-medium">
            Stop stitching together individual buttons and cards from scratch. Lithos Blocks are pre-composed,
            production-tested sections ready to drop straight into your app.
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="flex flex-wrap -m-3">
          {SHOWCASE_BLOCKS.map((block) => (
            <Card
              key={block.title}
              className="m-3 w-full md:w-[calc(50%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-surface) p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)] hover:shadow-[10px_10px_0px_0px_var(--lithos-shadow)] transition-all duration-150"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-4">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-(--lithos-text) min-w-0 truncate mr-3">
                    {block.title}
                  </h3>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-accent) text-(--lithos-accent-text)">
                    {block.badge}
                  </span>
                </div>

                <p className="text-sm text-(--lithos-text) opacity-80 mb-6 font-medium leading-relaxed">
                  {block.description}
                </p>

                {/* CLI Command pill */}
                <div className="flex items-center space-x-2 border-2 border-(--lithos-border) bg-(--lithos-bg) px-3 py-2 rounded-(--lithos-radius) font-mono text-xs mb-6">
                  <span className="text-(--lithos-accent) font-bold select-none">$</span>
                  <span className="text-(--lithos-text) font-bold truncate">{block.cli}</span>
                </div>
              </div>

              <div>
                <Button
                  variant="primary"
                  onClick={() => navigate(block.link)}
                  iconRight={<IconArrowRight size={14} />}
                  className="px-4 py-2 text-xs font-black uppercase tracking-wider"
                >
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Global Catalog CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/blocks"
            className="w-full sm:w-auto text-center border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) text-xs font-black uppercase tracking-wider px-6 py-3 rounded-(--lithos-radius) lithos-click transition-colors"
          >
            Explore All Blocks Catalog
          </Link>
          <Link
            to="/templates"
            className="w-full sm:w-auto text-center border-2 border-(--lithos-border) bg-(--lithos-surface) hover:bg-(--lithos-bg) text-(--lithos-text) text-xs font-black uppercase tracking-wider px-6 py-3 rounded-(--lithos-radius) lithos-click transition-colors"
          >
            Explore Full Templates
          </Link>
        </div>
      </div>
    </section>
  )
}
