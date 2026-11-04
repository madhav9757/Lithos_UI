/**
 * @fileoverview Lithos UI typography primitive component.
 * - Dynamically renders semantic text elements and headings with size, weight, and tracking variant tokens.
 * - Supports polymorphic rendering via the `as` prop or automatic semantic mapping from `variant`.
 * - Contrast integrity: custom hex colors automatically route background and contrast foreground text through the YIQ engine.
 */
import type { ComponentPropsWithRef, ReactNode, ElementType } from 'react'
import { cn, type LithosClass } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'
import { isHexColor, type HexColor } from '../../core/types'

const elementsMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  caption: 'span',
  code: 'code',
  mark: 'mark',
  small: 'small',
  label: 'label',
  span: 'span',
} as const

const variantStyles = {
  h1: 'text-(length:--lithos-h1-size) font-black leading-[0.9] tracking-tighter',
  h2: 'text-(length:--lithos-h2-size) font-extrabold leading-tight tracking-tight',
  h3: 'text-(length:--lithos-h3-size) font-bold leading-snug',
  h4: 'text-(length:--lithos-h4-size) font-bold leading-snug',
  h5: 'text-(length:--lithos-h5-size) font-semibold',
  h6: 'text-(length:--lithos-h6-size) font-semibold',
  p: 'text-(length:--lithos-body-size) font-medium leading-relaxed',
  caption: 'text-(length:--lithos-caption-size) font-bold uppercase tracking-widest text-(--lithos-text)/70',
  blockquote: 'text-(length:--lithos-blockquote-size) border-l-4 border-(--lithos-border) pl-4 italic font-medium',
  code: 'text-(length:--lithos-code-size) font-mono bg-(--lithos-text)/7.5 px-1.5 py-0.5 rounded-none font-bold',
  mark: 'text-(length:--lithos-mark-size) bg-(--lithos-accent) text-(--lithos-accent-text) px-1 py-0.5 font-bold -rotate-1 inline-block',
  small: 'text-(length:--lithos-small-size) font-semibold leading-normal',
  label: 'text-(length:--lithos-label-size) font-extrabold tracking-wide uppercase',
  span: 'inline-block',
} as const

/** Component tag keys supported by the typography mapper. */
export type TypographyComponent = keyof typeof elementsMap

/** Typographic style variant keys. */
export type TypographyVariants = keyof typeof variantStyles

/** Base custom property configuration interface for the `Typography` component. */
export interface TypographyOwnProps<T extends TypographyComponent = 'p'> {
  /** Polymorphic HTML element tag override to render. */
  as?: T

  /**
   * Typographic style variant token mapping.
   * @default 'p'
   */
  variant?: TypographyVariants

  /** Custom CSS classes applied to the typography element. */
  className?: LithosClass

  /** Text content or nested child elements. */
  children?: ReactNode

  /** Custom background hexadecimal color string with automatic YIQ contrast foreground text calculation. */
  color?: HexColor | string
}

/**
 * Props configuration interface for the polymorphic `Typography` component combining own props and native element attributes.
 */
export type TypographyProps<T extends TypographyComponent = 'p'> = TypographyOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof TypographyOwnProps<T>>

/**
 * Polymorphic typography primitive component rendering text elements with design system tokens and YIQ contrast integrity.
 *
 * @param props - Typography properties including polymorphic tags, variants, custom colors, and children.
 * @returns Rendered HTML typography element.
 */
export const Typography = <T extends TypographyComponent = 'p'>({
  as,
  variant = 'p',
  className = '',
  children,
  color,
  ...props
}: TypographyProps<T>) => {
  const Component = (as || elementsMap[variant as TypographyComponent] || 'p') as ElementType
  const baseClasses = variantStyles[variant] || variantStyles.p

  if (color && !isHexColor(color)) throw Error('[Typography]: color must be a valid HexColor')

  const resolvedColor = color ? getContrastText(color) : undefined

  return (
    <Component
      className={cn(baseClasses, className)}
      {...props}
      style={{ backgroundColor: color, color: resolvedColor }}
    >
      {children}
    </Component>
  )
}
