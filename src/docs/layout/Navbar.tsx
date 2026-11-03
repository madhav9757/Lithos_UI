import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { RouteLink } from '../../components/site/RouteLink'
import { getUnreleasedComponentInfo } from '../../core/unreleasedRegistry'
import { LITHOS_UI_LINKS, gettingStartedPages, componentPages } from '../../core/lithos.utils'
import { IconMenu, IconClose, IconMoon, IconSun, IconGithub } from '../../components/ui/icons'
import { useTheme } from '../../core/hooks/useTheme'
import { LithosLogo } from '../../components/ui/LithosLogo'

const groupedLinks = [
  { category: 'Getting Started', links: gettingStartedPages },
  { category: 'Components', links: componentPages },
]

export const DocsNavbar = () => {
  const { isDarkMode, toggleObsidian } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Components')

  const ActionToggle = isMenuOpen ? IconClose : IconMenu

  return (
    <header
      className="fixed top-0 z-50 w-full bg-(--lithos-strata)"
      style={{ paddingRight: 'var(--removed-scrollbar-width, 0px)' }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-1.5 md:py-2">
        <div className="flex items-center justify-start lg:w-1/3">
          <RouteLink to="/" importRoute={() => import('../../showroom/Index')} className="flex items-center">
            <LithosLogo className="h-8 md:h-9" />
          </RouteLink>
        </div>

        {/* - Center lane for main wayfinding */}
        <nav className="hidden items-center justify-center lg:flex lg:w-1/3">
          {LITHOS_UI_LINKS.map((link) => (
            <RouteLink
              key={link.label}
              to={link.to}
              importRoute={link.importRoute}
              className="mx-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) transition-colors duration-150 ease-out hover:text-(--lithos-accent) cursor-pointer"
            >
              {link.label}
            </RouteLink>
          ))}
        </nav>

        {/* - Desktop GitHub CTA (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-end lg:w-1/3">
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
            <ActionToggle className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* - Full-Screen Scrollable Mobile Accordion Overlay */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-[-1] pt-32 pb-12 px-6 bg-(--lithos-strata) overflow-y-auto flex flex-col justify-start lg:hidden">
          {/* Main Top-level Links */}
          <div className="mb-8 border-b-2 border-(--lithos-border) pb-4">
            {LITHOS_UI_LINKS.map((link) => (
              <RouteLink
                key={link.label}
                to={link.to}
                importRoute={link.importRoute}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left text-4xl sm:text-5xl font-black uppercase tracking-tighter text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-6 cursor-pointer transition-[opacity,color,translate] duration-150"
              >
                {link.label}
              </RouteLink>
            ))}
          </div>

          {/* Grouped Accordion Links */}
          <div className="flex-1">
            {groupedLinks.map((group) => (
              <div key={group.category} className="mb-8">
                <button
                  type="button"
                  onClick={() => setExpandedCategory(expandedCategory === group.category ? null : group.category)}
                  className="flex w-full items-center justify-between border-b-2 border-(--lithos-border) pb-2 mb-4 text-left text-3xl sm:text-4xl font-black uppercase tracking-tighter text-(--lithos-text) cursor-pointer"
                >
                  {group.category}
                  <span className="text-3xl text-(--lithos-accent)">
                    {expandedCategory === group.category ? '-' : '+'}
                  </span>
                </button>

                {/* Accordion Content */}
                {expandedCategory === group.category && (
                  <div className="pl-2 flex flex-col mt-4">
                    {group.links.map((page) => {
                      const unreleased = getUnreleasedComponentInfo(page.path)

                      return (
                        <RouteLink
                          key={page.label}
                          to={page.to}
                          importRoute={page.loader}
                          rootMargin="35px"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between w-full text-left text-xl sm:text-2xl font-bold uppercase tracking-tight text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-4 cursor-pointer transition-[opacity,color,translate] duration-150"
                        >
                          <span>{page.label}</span>
                          {unreleased && (
                            <Badge
                              intent="accent"
                              size="sm"
                              className="font-mono font-black text-[10px] tracking-wider py-0.5 px-1.5"
                            >
                              {unreleased.badgeLabel}
                            </Badge>
                          )}
                        </RouteLink>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu GitHub CTA */}
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
    </header>
  )
}
