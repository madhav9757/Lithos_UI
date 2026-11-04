import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { QuickstartCLI } from './sections/QuickstartCLI'
import { FeatureGrid } from './sections/FeatureGrid'
import { ComponentPlayground } from './sections/ComponentPlayground'
import { BlocksShowcase } from './sections/BlocksShowcase'
import { StatsStrip } from './sections/StatsStrip'
import { CallToAction } from './sections/CallToAction'
import { Footer } from './sections/Footer'
import { useDynamicStrata } from '../core/hooks/useDynamicStrata'

/**
 * Showroom Component - Landing Page UI Composition
 *
 * Neo-brutalist zero-gap architectural layout:
 * - Full-bleed Hero extends under fixed Navbar with seamless strata background.
 * - Slabs stack seamlessly with unified strata atmosphere and 2px hard dividers.
 */
export const Showroom = () => {
  const strataStyle = useDynamicStrata()

  return (
    <>
      <Navbar />

      <main className="relative bg-(--lithos-strata)" style={strataStyle}>
        {/* Viewport Hero Anchor */}
        <Hero />

        {/* Quickstart Terminal & Zero Lock-in CLI */}
        <QuickstartCLI />

        {/* Four Architectural Pillars */}
        <FeatureGrid />

        {/* Live Interactive Bento Component Playground */}
        <ComponentPlayground />

        {/* Pre-composed Blocks & Templates Gallery */}
        <BlocksShowcase />

        {/* Stats Strip & Free Forever Open Source Manifesto */}
        <StatsStrip />

        {/* Production Readiness Call to Action */}
        <CallToAction />
      </main>

      {/* Heavy Closing Slab */}
      <Footer />
    </>
  )
}
