import type { HTMLAttributes } from 'react'
import { useDynamicStrata, type DynamicStrataOptions } from '../../core/hooks/useDynamicStrata'

export interface StrataBackgroundProps extends HTMLAttributes<HTMLDivElement>, DynamicStrataOptions {
  className?: string
}

/**
 * Declarative background component that layers an atmospheric strata aura.
 * Place inside a `relative` container.
 */
export const StrataBackground = ({
  variant = 'full-page',
  intensityMultiplier = 1,
  className = '',
  style,
  ...rest
}: StrataBackgroundProps) => {
  const strataStyle = useDynamicStrata({ variant, intensityMultiplier })

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ ...strataStyle, ...style }}
      {...rest}
    />
  )
}
