/**
 * @fileoverview Lithos UI top rail.
 * - Holds the brand, primary anchors, and mobile escape hatch in one fixed slab.
 * - Uses hard borders and a pinned edge to keep the header visually immovable.
 * - Preserves the page rhythm by reserving a predictable top strip for navigation.
 */

import { useState } from 'react'
import { RouteLink } from '../../components/site/RouteLink'
import { Button } from '../../components/ui/Button'
import { IconMenu, IconClose, IconMoon, IconSun, IconGithub } from '../../components/ui/icons'
import { useTheme } from '../../core/hooks/useTheme'
import { LITHOS_UI_LINKS } from '../../core/lithos.utils'
import { LithosLogo } from '../../components/ui/LithosLogo'

export const Navbar = () => {
  const { isDarkMode, toggleObsidian } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const ActionToggle = isMenuOpen ? IconClose : IconMenu

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full bg-(--lithos-strata)"
        style={{ paddingRight: 'var(--removed-scrollbar-width, 0px)' }}
      >
        {/* - Fixed rail: the 4px bottom border marks the top boundary of the app. */}
        {/* - 24px vertical padding gives the bar enough mass to read as a slab, not a strip. */}
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-1.5 md:py-2">
          {/* - Brand block flex-1 balances the center lane. */}
          <div className="flex items-center justify-start lg:flex-1">
            <RouteLink
              to="/"
              className="flex items-center"
              importRoute={() => import('../Index')}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <LithosLogo className="h-8 md:h-9" />
            </RouteLink>
          </div>

          {/* - Center lane is reserved for wayfinding and sized exactly to its content. */}
          <nav className="hidden items-center justify-center lg:flex lg:flex-none">
            {LITHOS_UI_LINKS.map((link) => (
              <RouteLink
                key={link.label}
                to={link.to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mx-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) transition-all duration-150 ease-out hover:text-(--lithos-accent) cursor-pointer"
                importRoute={link.importRoute}
              >
                {link.label}
              </RouteLink>
            ))}
          </nav>

          {/* - Action block balances the brand block and keeps the header geometry stable. */}
          <div className="hidden items-center justify-end lg:flex lg:flex-1">
            <div className="mr-4 flex items-center">
              <Button
                variant="secondary"
                onClick={toggleObsidian}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode (Obsidian)'}
                className="p-2 flex items-center justify-center"
              >
                {isDarkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="p-2 flex items-center justify-center"
            >
              <IconGithub size={18} />
            </Button>
          </div>

          {/* - Mobile Action Toggle (Hamburger / X) */}
          <div className="flex lg:hidden items-center">
            <Button
              variant="primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <ActionToggle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* - Full-Screen Mobile Overlay */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-40 pt-32 pb-6 px-6 bg-(--lithos-strata) overflow-y-auto flex flex-col justify-start lg:hidden">
          {LITHOS_UI_LINKS.map((link) => (
            <RouteLink
              key={link.label}
              to={link.to}
              onClick={() => {
                setIsMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block w-full text-left text-4xl sm:text-5xl font-black uppercase tracking-tighter text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-8 cursor-pointer transition-all duration-150"
              importRoute={link.importRoute}
            >
              {link.label}
            </RouteLink>
          ))}
          <div className="mt-auto flex items-center justify-between">
            <Button
              variant="primary"
              onClick={() => {
                setIsMenuOpen(false)
                window.open('https://github.com/lithosui/Lithos_UI', '_blank')
              }}
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="p-2 flex items-center justify-center"
            >
              <IconGithub size={18} />
            </Button>
            <div className="flex items-center">
              <Button
                variant="secondary"
                onClick={toggleObsidian}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode (Obsidian)'}
                className="p-2 flex items-center justify-center"
              >
                {isDarkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
              </Button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
