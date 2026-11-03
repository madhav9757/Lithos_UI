/**
 * @fileoverview Lithos UI footer slab.
 * - Closes the page with a hard top border, a three-column balance, and a utility toggle.
 * - Uses explicit spacing to keep the exit block aligned with the zero-gap page rhythm.
 * - Couples the theme toggle with toast feedback so state changes are visible and immediate.
 */

import { IconHeart } from '../../components/ui/icons'
import { Button } from '../../components/ui/Button'
import { RouteLink } from '../../components/site/RouteLink'
import { LITHOS_UI_LINKS } from '../../core/lithos.utils'

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t-2 border-(--lithos-border) bg-(--lithos-accent) px-6 py-20 text-(--lithos-accent-text)">
      {/* - 8px top border makes the footer read as a closing slab, not a soft appendix. */}
      {/* - Three columns are balanced with width fractions, not gap, to preserve structural rhythm. */}
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* - Brand block carries the visual weight of the footer’s left side. */}
        <div className="mb-16 flex w-full flex-col justify-between lg:mb-0 lg:w-1/2">
          <div>
            <p className="text-4xl font-black tracking-tighter leading-none md:text-6xl text-(--lithos-accent-text)">
              Lithos UI
            </p>
            <p className="mt-4 mb-4 max-w-md text-lg font-bold uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
              Stop wrestling with fragile layouts. Drop in production-ready, zero-gap React blocks and ship your next
              product today.
            </p>
          </div>
          <p className="mt-12 lg:mt-0 text-sm font-bold tracking-tighter leading-none text-(--lithos-accent-text)">
            Copyright {new Date().getFullYear()} Lithos UI. All rights reserved.
          </p>
        </div>

        {/* - Navigation stays vertical so the exit path reads as a stack, not a menu bar. */}
        <div className="mt-12 flex w-full flex-col lg:mt-0 lg:w-1/4 space-y-4">
          {LITHOS_UI_LINKS.map((link) => (
            <RouteLink
              key={link.to}
              to={link.to}
              importRoute={link.importRoute}
              className="text-2xl space-y-4 font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
            >
              {link.label}
            </RouteLink>
          ))}
        </div>

        {/* - Sponsor CTA uses the same hard-surface language so the support action matches the system physics. */}
        <div className="mt-12 flex w-full flex-col lg:mt-0 lg:w-1/4 lg:items-end">
          <Button
            variant="secondary"
            onClick={() => window.open('https://opencollective.com/lithos-ui', '_blank')}
            className="group text-2xl hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) md:text-3xl py-4 px-6"
          >
            <span>Show Love</span>
            <IconHeart
              aria-hidden="true"
              className="h-8 w-8 ml-3 transition-transform duration-300 group-hover:scale-110"
            />
          </Button>
        </div>
      </div>
    </footer>
  )
}
