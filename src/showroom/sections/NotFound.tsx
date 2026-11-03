/**
 * @fileoverview The Void Coordinate - 404 Page
 *
 * Neo-Brutalist 404 page component themed as "Structural Failure".
 * Renders a viewport-locked layout with massive engineered typography,
 * broken architectural elements, and a hard-shadowed return button.
 *
 * ARCHITECTURAL NOTES:
 * - NO gap utilities (ZERO-GAP LAW)
 * - Spacing via explicit margins (mt-*, mb-*)
 * - Button shadow fixed (no translate on interaction)
 */

import { RouteLink } from '../../components/site/RouteLink'
import { KineticGrid } from '../../components/ui/KineticGrid'

export const NotFound = () => (
  <KineticGrid baseOpacity="opacity-5" className="min-h-screen bg-(--lithos-bg) text-(--lithos-text) px-4">
    <div className="text-center max-w-2xl">
      {/* Error code - massive and brutalist */}
      <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-10 select-none text-(--lithos-accent)">
        404
      </h1>

      {/* Primary error title */}
      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-4">Structural Failure</h2>

      {/* Secondary description */}
      <p className="text-base md:text-lg font-medium opacity-70 mb-12 leading-relaxed">
        The coordinate you seek exists beyond the boundaries of this realm.
      </p>

      {/* Vertical spacer for button positioning */}
      <div className="mt-8">
        {/* Return to Base button - hard brutalist styling */}
        <RouteLink
          to="/"
          className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click"
          importRoute={() => import('../Index')}
        >
          Return to Base
        </RouteLink>
      </div>
    </div>
  </KineticGrid>
)
