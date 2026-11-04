/**
 * @fileoverview Lithos UI Dynamic Strata Atmospheric Glow System.
 *
 * Generates procedural, perimeter- and corner-anchored radial gradients
 * blended with var(--lithos-accent) to give surfaces atmospheric depth.
 * Ensures zero center hotspots and zero layout shifts.
 */
import { useMemo, type CSSProperties } from 'react'

export interface DynamicStrataOptions {
  /**
   * 'full-page': 4 corners + alternating lateral flanks (for long-scrolling pages).
   * 'compact': corners tailored for fixed viewport tools like Theme Studio or modals.
   */
  variant?: 'full-page' | 'compact'
  /** Optional intensity scale factor (defaults to 1) */
  intensityMultiplier?: number
}

interface AnchorZone {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  radMin: number
  radMax: number
  intMin: number
  intMax: number
}

const FULL_PAGE_ANCHORS: AnchorZone[] = [
  // Top-Right Corner (specimen / preview illumination)
  { xMin: 92, xMax: 104, yMin: -3, yMax: 6, radMin: 1000, radMax: 1400, intMin: 22, intMax: 28 },
  // Top-Left Corner
  { xMin: -4, xMax: 6, yMin: -3, yMax: 5, radMin: 900, radMax: 1250, intMin: 18, intMax: 24 },
  // Upper-Right Flank
  { xMin: 94, xMax: 105, yMin: 22, yMax: 32, radMin: 950, radMax: 1300, intMin: 18, intMax: 24 },
  // Mid-Left Flank
  { xMin: -5, xMax: 6, yMin: 45, yMax: 58, radMin: 1000, radMax: 1350, intMin: 20, intMax: 26 },
  // Lower-Right Flank
  { xMin: 94, xMax: 105, yMin: 68, yMax: 78, radMin: 950, radMax: 1300, intMin: 18, intMax: 24 },
  // Bottom-Left Corner
  { xMin: -4, xMax: 6, yMin: 90, yMax: 102, radMin: 950, radMax: 1350, intMin: 18, intMax: 24 },
  // Bottom-Right Corner
  { xMin: 92, xMax: 104, yMin: 90, yMax: 102, radMin: 1050, radMax: 1450, intMin: 22, intMax: 28 },
]

const COMPACT_ANCHORS: AnchorZone[] = [
  // Anchored comfortably below the navbar (y: 16% to 24%) so the glow emanates smoothly
  // without being abruptly sliced by the bottom edge of the fixed 56px navbar
  { xMin: 90, xMax: 104, yMin: 16, yMax: 24, radMin: 700, radMax: 950, intMin: 18, intMax: 24 },
  { xMin: -6, xMax: 8, yMin: 16, yMax: 24, radMin: 650, radMax: 900, intMin: 16, intMax: 22 },
  { xMin: -6, xMax: 8, yMin: 85, yMax: 102, radMin: 650, radMax: 900, intMin: 16, intMax: 22 },
  { xMin: 90, xMax: 104, yMin: 85, yMax: 102, radMin: 700, radMax: 950, intMin: 18, intMax: 24 },
]

/**
 * Calculates a procedural radial gradient string based on perimeter anchor zones.
 */
export const generateDynamicStrataGradient = (
  variant: 'full-page' | 'compact' = 'full-page',
  multiplier: number = 1
): string => {
  const anchors = variant === 'compact' ? COMPACT_ANCHORS : FULL_PAGE_ANCHORS

  return anchors
    .map((anchor) => {
      const x = Math.round(anchor.xMin + Math.random() * (anchor.xMax - anchor.xMin))
      const y = Math.round(anchor.yMin + Math.random() * (anchor.yMax - anchor.yMin))
      const radius = Math.round(anchor.radMin + Math.random() * (anchor.radMax - anchor.radMin))
      const rawIntensity = Math.round(anchor.intMin + Math.random() * (anchor.intMax - anchor.intMin))
      const intensity = Math.min(100, Math.max(1, Math.round(rawIntensity * multiplier)))

      return `radial-gradient(circle ${radius}px at ${x}% ${y}%, color-mix(in srgb, var(--lithos-accent) ${intensity}%, transparent) 0%, transparent 70%)`
    })
    .join(', ')
}

/**
 * Hook that returns a memoized CSSProperties object containing procedural
 * corner- and perimeter-focused strata background gradients.
 */
export const useDynamicStrata = (options: DynamicStrataOptions = {}): CSSProperties => {
  const { variant = 'full-page', intensityMultiplier = 1 } = options

  return useMemo(() => {
    return {
      backgroundImage: generateDynamicStrataGradient(variant, intensityMultiplier),
    }
  }, [variant, intensityMultiplier])
}
