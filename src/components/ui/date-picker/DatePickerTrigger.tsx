import { cloneElement, isValidElement, type HTMLProps, type Ref } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useDatePickerContext } from './useDatePicker'
import { cn } from '../../../utils/cn'
import type { DatePickerTriggerProps } from './date-picker.types'

export const DatePickerTrigger = ({
  children,
  asChild = false,
  className,
  ref: propRef,
  ...props
}: DatePickerTriggerProps & { ref?: Ref<HTMLButtonElement> }) => {
  const { open, triggerRef, getReferenceProps, disabled } = useDatePickerContext()
  const ref = useMergeRefs([triggerRef, propRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>

    return cloneElement(
      children,
      getReferenceProps({
        ref,
        disabled,
        'data-state': open ? 'open' : 'closed',
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        ...props,
        ...childProps,
        className: cn(normalizedClass, childProps['className'] as string),
      } as HTMLProps<HTMLButtonElement> & { 'data-state'?: string })
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={normalizedClass}
      {...getReferenceProps(props)}
    >
      {children}
    </button>
  )
}
