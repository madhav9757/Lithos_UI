/**
 * @fileoverview Lithos UI hero slab.
 * - Opens the page with a zero-gap vertical anchor and a heavy terminal-style showcase.
 * - Utilizes the KineticGrid to create an interactive tracking environment.
 * - Keeps the opening rhythm controlled by explicit spacing math and centered containment.
 */
import { KineticGrid } from '../../components/ui/KineticGrid'
import { Button } from '../../components/ui/Button'
import { RouteButton } from '../../components/site/RouteButton'
import { Typography } from '../../components/ui/Typography'
import type { HexColor } from '../../core/types'
import { useTheme } from '../../core/hooks/useTheme'
import { IconRadius, IconArrowRight } from '../../components/ui/icons'

const ARTISTIC_PALETTES = [
  { label: 'Lime', hex: '#00ff00' },
  { label: 'Orange', hex: '#ff5500' },
  { label: 'Violet', hex: '#7928ca' },
  { label: 'Yellow', hex: '#ffe600' },
  { label: 'Cyan', hex: '#00f0ff' },
  { label: 'Magenta', hex: '#ff007f' },
] as const

const RADII = [
  { label: 'None', value: 0, variant: 'none' },
  { label: 'Sm', value: 8, variant: 'sm' },
  { label: 'Md', value: 16, variant: 'md' },
  { label: 'Lg', value: 24, variant: 'lg' },
] as const

export const Hero = () => {
  const { accentColor, updateAccentColor, radius, updateRadius } = useTheme()

  return (
    <section id="top" className="border-b-2 border-(--lithos-border) bg-(--lithos-strata)">
      {/* Deploying the tracking engine to the main landing viewport */}
      <KineticGrid baseOpacity="opacity-10" className="pt-20 pb-12 md:pt-28 md:pb-24 w-full">
        <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Left Column: Copy & CTAs */}
          <div className="w-full lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
              MIT LICENSED · ZERO DEPENDENCIES ON GAP
            </p>

            <h1 className="text-4xl sm:text-5xl font-hero uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl">
              BUILD FRONTENDS THAT REFUSE TO BREAK
            </h1>

            <h2 className="mt-4 text-3xl sm:text-4xl font-docs md:text-5xl italic font-medium text-(--lithos-accent)">
              Free Forever
            </h2>

            <p className="mt-6 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) md:text-3xl font-body max-w-2xl mx-auto lg:mx-0">
              No layout shift. No unreadable text on a bad accent color. No CSS specificity fights. Four systems{' '}
              <Typography variant="mark">built into every component</Typography>, working automatically — so the UI you
              shipped is still standing next quarter.
            </p>

            <p className="mt-4 text-sm sm:text-base font-bold text-(--lithos-text) opacity-50">
              Zero-Gap · YIQ Contrast Engine · Specificity Overrides · Physics Tokens
            </p>

            <div className="mt-10 flex flex-col items-center lg:items-start sm:flex-row flex-wrap">
              <RouteButton
                to="/docs"
                className="mb-4 sm:mb-0 sm:mr-6 px-4 py-2"
                variant="primary"
                importRoute={() => import('../../docs/pages/Introduction')}
              >
                Documentation
              </RouteButton>
              <Button
                variant="secondary"
                onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}
                className="mb-4 sm:mb-0 px-4 py-2"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Bauhaus / Swiss Blueprint Live Theme Engine */}
          <div className="w-full lg:w-[42%] mt-12 lg:mt-24 flex justify-center lg:justify-end">
            <div className="relative border-4 border-(--lithos-border) bg-(--lithos-surface) p-5 sm:p-6 w-full max-w-md shadow-[8px_8px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius) select-none">
              {/* Blueprint Header */}
              <div className="flex justify-between items-center mb-5 border-b-2 border-(--lithos-border) pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-(--lithos-accent) border border-(--lithos-border) rounded-(--lithos-radius) inline-block animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-(--lithos-text)">Theme Engine</h3>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-xs font-bold bg-(--lithos-bg) px-2 py-1 border-2 border-(--lithos-border) rounded-(--lithos-radius) text-(--lithos-text) shadow-[2px_2px_0px_0px_var(--lithos-shadow)]">
                  <span
                    className="w-2.5 h-2.5 border border-(--lithos-border) rounded-(--lithos-radius) shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{accentColor.toUpperCase()}</span>
                </div>
              </div>

              {/* Palette Chips + Custom Trigger */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  <span>Palette</span>
                  <span className="font-mono text-[9px]">CLICK TO APPLY</span>
                </div>

                <div className="flex w-full space-x-1.5">
                  {ARTISTIC_PALETTES.map((palette) => {
                    return (
                      <button
                        key={palette.hex}
                        type="button"
                        onClick={() => updateAccentColor(palette.hex as HexColor)}
                        title={palette.label}
                        aria-label={`Select ${palette.label}`}
                        className="flex-1 h-9 rounded-(--lithos-radius) lithos-click relative"
                        style={{ backgroundColor: palette.hex }}
                      />
                    )
                  })}

                  {/* Custom color picker trigger button */}
                  <div
                    className="flex-1 h-9 rounded-(--lithos-radius) bg-(--lithos-bg) lithos-click relative flex items-center justify-center cursor-pointer"
                    title="Custom Color Picker"
                  >
                    <span className="text-xs font-black text-(--lithos-text)">+</span>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => updateAccentColor(e.target.value as HexColor)}
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                      aria-label="Choose custom theme color"
                    />
                  </div>
                </div>
              </div>

              {/* Radius Control Row */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  <span>Radius</span>
                  <span className="font-mono text-[9px]">{radius}PX</span>
                </div>

                <div className="flex w-full border-2 border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden shadow-[2px_2px_0px_0px_var(--lithos-shadow)]">
                  {RADII.map((r, idx) => {
                    const isSelected = radius === r.value
                    return (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => updateRadius(r.value)}
                        aria-label={`Set border radius to ${r.label}`}
                        title={`${r.label} (${r.value}px)`}
                        className={`flex-1 h-8 flex items-center justify-center text-xs font-bold font-mono transition-colors cursor-pointer ${
                          idx !== 0 ? 'border-l-2 border-(--lithos-border)' : ''
                        } ${
                          isSelected
                            ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                            : 'bg-(--lithos-bg) text-(--lithos-text) hover:bg-(--lithos-surface)'
                        }`}
                      >
                        <IconRadius variant={r.variant} size={14} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Navigate to Full Theme Builder */}
              <RouteButton
                to="/theme"
                fullWidth
                className="py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center"
                iconRight={<IconArrowRight size={14} />}
                variant="primary"
                importRoute={() => import('../../pages/ThemeBuilder')}
                rootMargin="50px"
              >
                Open Full Theme Builder
              </RouteButton>
            </div>
          </div>
        </div>
      </KineticGrid>
    </section>
  )
}
