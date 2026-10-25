import { type MouseEvent, type Ref } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useDatePickerContext } from './useDatePicker'
import { getDisplayValue } from './date-picker.utils'
import { IconCalendar } from '../icons/IconCalendar'
import { IconClose } from '../icons/IconClose'
import { colors } from '../../../utils/colors'
import { cn } from '../../../utils/cn'
import type { DatePickerInputProps } from './date-picker.types'

const inputSizeStyles = {
  sm: 'text-xs h-8 px-2 py-1',
  default: 'text-sm h-10 px-3 py-2',
  md: 'text-base h-11 px-3 py-2.5',
  lg: 'text-lg h-12 px-4 py-3',
} as const

export const DatePickerInput = ({
  placeholder,
  disabled: propDisabled,
  invalid: propInvalid,
  size = 'default',
  clearable = false,
  startAdornment,
  endAdornment,
  className,
  'aria-label': ariaLabel,
  ref: propRef,
  ...props
}: DatePickerInputProps & { ref?: Ref<HTMLButtonElement> }) => {
  const {
    open,
    value,
    setValue,
    mode,
    locale,
    triggerRef,
    getReferenceProps,
    disabled: contextDisabled,
    invalid: contextInvalid,
  } = useDatePickerContext()

  const isDisabled = propDisabled ?? contextDisabled
  const isInvalid = propInvalid ?? contextInvalid
  const ref = useMergeRefs([triggerRef, propRef])

  const displayText = getDisplayValue(value, mode, locale, placeholder)
  const hasValue = Boolean(
    value &&
    (value instanceof Date ||
      (Array.isArray(value) && value.length > 0) ||
      ('from' in value && Boolean((value as { from: Date | null }).from)))
  )

  const handleClear = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!isDisabled) {
      setValue(null)
    }
  }

  const defaultStart =
    startAdornment === undefined ? <IconCalendar className="w-4 h-4 shrink-0 mr-2" /> : startAdornment

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      data-state={open ? 'open' : 'closed'}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={ariaLabel ?? displayText}
      style={isInvalid ? { borderColor: colors.error } : undefined}
      className={cn(
        'w-full flex items-center justify-between text-left font-mono font-bold select-none outline-none border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) transition',
        inputSizeStyles[size],
        {
          'hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:translate-x-0.5 active:translate-y-0.5':
            !isDisabled,
          'opacity-50 cursor-not-allowed': isDisabled,
        },
        className
      )}
      {...getReferenceProps(props)}
    >
      <span className="flex items-center min-w-0 flex-1 overflow-hidden">
        {defaultStart}
        <span
          className={cn('truncate', {
            'text-(--lithos-text) opacity-60': !hasValue,
          })}
        >
          {displayText}
        </span>
      </span>

      <span className="flex items-center shrink-0 ml-2">
        {clearable && hasValue && !isDisabled && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date"
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation()
                e.preventDefault()
                setValue(null)
              }
            }}
            className="p-0.5 hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer mr-1"
          >
            <IconClose className="w-3.5 h-3.5" />
          </span>
        )}
        {endAdornment}
      </span>
    </button>
  )
}
