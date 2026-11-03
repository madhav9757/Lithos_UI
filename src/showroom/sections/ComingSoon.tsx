/**
 * @fileoverview The Blueprint Coordinate - Coming Soon Page
 *
 * Neo-Brutalist construction page component themed as "Active Engineering".
 * Renders a viewport-locked layout with massive engineered typography,
 * architectural grid elements, and a hard-shadowed return button.
 *
 * ARCHITECTURAL NOTES:
 * - NO gap utilities (ZERO-GAP LAW)
 * - Spacing via explicit margins (mt-*, mb-*, mr-*)
 * - Button shadow fixed (no translate on interaction)
 */

import { KineticGrid } from '../../components/ui/KineticGrid'
import { Button } from '../../components/ui/Button'
import { RouteButton } from '../../components/site/RouteButton'

interface ComingSoonProps {
  eyebrow?: string
  title: string
  description: string
  primaryAction?: {
    label: string
    to: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export const ComingSoon = ({
  eyebrow = 'ACTIVE ENGINEERING ZONE',
  title,
  description,
  primaryAction = { label: 'Go to Docs', to: '/docs' },
  secondaryAction = { label: 'Contribute Code', href: 'https://github.com/lithosui/Lithos_UI/issues' },
}: ComingSoonProps) => {
  return (
    <KineticGrid baseOpacity="opacity-10" className="min-h-screen bg-(--lithos-bg) text-(--lithos-text) px-4">
      <div className="text-center max-w-5xl mx-auto w-full">
        {/* WIP code - Recalibrated for responsive wrapping without horizontal overflow */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black leading-none tracking-tighter mb-10 select-none text-(--lithos-accent) uppercase">
          {title}
        </h1>

        {/* Primary construction title */}
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-6">{eyebrow}</h2>

        {/* Secondary description - Rewritten for open source contribution */}
        <p className="text-base md:text-lg font-bold opacity-80 mb-12 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        {/* Vertical spacer for button positioning */}
        {/* Zero-Gap enforcement: stacking behavior controlled by explicit margins */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center">
          {/* Return button */}
          <RouteButton
            variant="primary"
            className="mb-4 sm:mb-0 sm:mr-4"
            to={primaryAction.to}
            importRoute={() => import('../Index')}
          >
            {primaryAction.label}
          </RouteButton>

          {/* Contribute button */}
          <Button variant="secondary" onClick={() => window.open(secondaryAction.href, '_blank')}>
            {secondaryAction.label}
          </Button>
        </div>
      </div>
    </KineticGrid>
  )
}
