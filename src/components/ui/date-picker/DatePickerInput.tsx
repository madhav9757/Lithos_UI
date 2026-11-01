import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useDatePickerContext } from './useDatePicker'
import { parseDateString, parseDateRangeString, formatDate, formatDateRange, isValidDate } from './date-picker.utils'
import { IconCalendar } from '../icons/IconCalendar'
import { IconClose } from '../icons/IconClose'
import { colors } from '../../../utils/colors'
import { cn } from '../../../utils/cn'
import type { DatePickerInputProps } from './date-picker.types'
import type { DateRange } from '../calendar/calendar.types'

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
}: DatePickerInputProps & { ref?: Ref<HTMLInputElement> }) => {
  const {
    open,
    setOpen,
    value,
    setValue,
    mode,
    locale,
    triggerRef,
    disabled: contextDisabled,
    invalid: contextInvalid,
  } = useDatePickerContext()

  const isDisabled = propDisabled ?? contextDisabled
  const isInvalid = propInvalid ?? contextInvalid

  const internalInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useMergeRefs([internalInputRef, propRef])

  const hasValue = Boolean(
    value &&
    (value instanceof Date ||
      (Array.isArray(value) && value.length > 0) ||
      ('from' in value && Boolean((value as { from: Date | null }).from)))
  )

  const formattedDisplay = useMemo(() => {
    if (!value) return ''
    if (mode === 'single' && value instanceof Date && isValidDate(value)) {
      return formatDate(value, locale)
    }
    if (mode === 'range' && value && typeof value === 'object' && 'from' in value) {
      return formatDateRange(value as DateRange, locale)
    }
    if (mode === 'multiple' && Array.isArray(value)) {
      if (value.length === 0) return ''
      if (value.length === 1 && isValidDate(value[0])) return formatDate(value[0], locale)
      return `${value.length} dates selected`
    }
    return ''
  }, [value, mode, locale])

  const [inputValue, setInputValue] = useState(formattedDisplay)
  const isTypingRef = useRef(false)

  // Sync external value changes (from calendar click, preset click, etc.)
  useEffect(() => {
    if (!isTypingRef.current) {
      setInputValue(formattedDisplay)
    }
  }, [formattedDisplay])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)
    isTypingRef.current = true

    if (text.trim() === '') {
      setValue(null)
      return
    }

    if (mode === 'single') {
      const parsed = parseDateString(text)
      if (parsed) {
        setValue(parsed)
      }
    } else if (mode === 'range') {
      const parsedRange = parseDateRangeString(text)
      if (parsedRange) {
        setValue(parsedRange)
      }
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    isTypingRef.current = false
    if (value) {
      setInputValue(formattedDisplay)
    } else if (inputValue.trim() === '') {
      setInputValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (mode === 'single') {
        const parsed = parseDateString(inputValue)
        if (parsed) {
          setValue(parsed)
        }
      } else if (mode === 'range') {
        const parsedRange = parseDateRangeString(inputValue)
        if (parsedRange) {
          setValue(parsedRange)
        }
      }
    }
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!isDisabled) {
      isTypingRef.current = false
      setInputValue('')
      setValue(null)
      internalInputRef.current?.focus()
    }
  }

  const handleCalendarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!isDisabled) {
      setOpen(!open)
    }
  }

  const defaultPlaceholder = placeholder ?? (mode === 'range' ? 'Select date range' : 'Select date')

  return (
    <div
      ref={triggerRef}
      style={isInvalid ? { borderColor: colors.error } : undefined}
      className={cn(
        'relative flex w-full items-center justify-between border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) transition',
        inputSizeStyles[size],
        {
          'hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]':
            !isDisabled,
          'opacity-50 cursor-not-allowed': isDisabled,
        },
        className
      )}
    >
      <div className="flex items-center flex-1 min-w-0 mr-2">
        {startAdornment}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          disabled={isDisabled}
          placeholder={defaultPlaceholder}
          aria-label={ariaLabel ?? defaultPlaceholder}
          className="w-full bg-transparent outline-none font-mono font-bold text-(--lithos-text) placeholder:text-(--lithos-text)/50 select-text"
          {...props}
        />
      </div>

      <div className="flex items-center shrink-0">
        {clearable && hasValue && !isDisabled && (
          <button
            type="button"
            tabIndex={0}
            aria-label="Clear date"
            onClick={handleClear}
            className="p-1 hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer mr-1 text-(--lithos-text) shrink-0 flex items-center justify-center"
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="button"
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          aria-label="Open calendar"
          aria-haspopup="dialog"
          aria-expanded={open}
          data-state={open ? 'open' : 'closed'}
          onClick={handleCalendarClick}
          className={cn(
            'p-1 flex items-center justify-center hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer shrink-0 text-(--lithos-text) transition-colors',
            isDisabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <IconCalendar className="w-4 h-4 shrink-0" />
        </button>

        {endAdornment}
      </div>
    </div>
  )
}
