import type { LithosElementProps } from '../../core/types'
import { useContext } from 'react'
import { FieldContext } from '../../core/FieldContext'
import { cn } from '../../utils/cn'
import { colors } from '../../utils/colors'

export interface TextareaProps extends LithosElementProps<'textarea'> {
  /** Visual treatment; validation is independent of the variant. */
  variant?: 'plain' | 'outlined' | 'soft' | 'solid'
  /** Applies the shared error border and exposes the invalid state to assistive technology. */
  invalid?: boolean
  /** Controls typography and padding; use native rows to control height. */
  size?: 'sm' | 'default' | 'md' | 'lg'
  /** Starts at one row and grows with content, up to the CSS max-height. */
  autoSize?: boolean
  /** Native resize affordance. */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

// Match Input's one-row heights: 32, 40, 44 and 48px, including borders.
const sizeClasses = {
  sm: 'min-h-8 leading-5 text-xs px-2 py-1',
  default: 'min-h-10 leading-5 text-sm px-3 py-2',
  md: 'min-h-11 leading-5 text-base px-3 py-2.5',
  lg: 'min-h-12 leading-5 text-lg px-4 py-3',
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

const variantClasses = {
  plain: 'border-transparent bg-transparent text-(--lithos-text) shadow-none',
  outlined:
    'border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[2px_2px_0_0_var(--lithos-shadow)]',
  soft: 'border-transparent bg-(--lithos-accent)/15 text-(--lithos-text) shadow-none',
  solid: 'border-(--lithos-text) bg-(--lithos-text) text-(--lithos-bg) shadow-[2px_2px_0_0_var(--lithos-shadow)]',
}

/**
 * Native multiline field with theme tokens and hard focus shadows.
 * Like Input, fields use focus shadows instead of click translation so typing
 * and selecting text never moves the field. No effects or layout measurement.
 */
export const Textarea = ({
  className,
  variant = 'outlined',
  invalid,
  size = 'default',
  autoSize = false,
  resize = autoSize ? 'none' : 'vertical',
  rows,
  style,
  'aria-invalid': ariaInvalid,
  id,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextareaProps) => {
  const field = useContext(FieldContext)
  const descriptionIds =
    [field?.hasDescription ? field.descriptionId : undefined, ariaDescribedBy].filter(Boolean).join(' ') || undefined
  return (
    <textarea
      {...props}
      id={id ?? field?.controlId}
      aria-describedby={descriptionIds}
      rows={rows ?? (autoSize ? 1 : 4)}
      aria-invalid={invalid || ariaInvalid}
      className={cn(
        'block w-full min-w-0 rounded-(--lithos-radius) border-2 font-mono font-bold outline-none focus:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
        variantClasses[variant],
        sizeClasses[size],
        autoSize && 'field-sizing-content max-h-64 overflow-y-auto',
        resizeClasses[resize],
        props.disabled
          ? 'cursor-not-allowed opacity-50'
          : 'transition-shadow motion-reduce:transition-none hover:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
        className
      )}
      style={invalid ? { borderColor: colors.error, ...style } : style}
    />
  )
}
