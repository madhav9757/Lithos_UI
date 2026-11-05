import {
  useState,
  useEffect,
  useMemo,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from 'react'
import { useFloating, autoUpdate, offset, flip, shift, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { Calendar } from '../calendar/Calendar'
import { IconCalendar } from '../icons/IconCalendar'
import { IconClose } from '../icons/IconClose'
import { parseDateString, formatDateInput, isValidDate, isDateInputInvalid } from './date-picker.utils'
import { cn } from '../../../utils/cn'
import { colors } from '../../../utils/colors'
import type { LithosClass } from '../../../utils/cn'

export interface DateFieldProps {
  label?: string | undefined
  value?: Date | null | undefined
  defaultValue?: Date | null | undefined
  onChange?: ((value: Date | null) => void) | undefined
  placeholder?: string | undefined
  disabled?: boolean | undefined
  invalid?: boolean | undefined
  clearable?: boolean | undefined
  minDate?: Date | undefined
  maxDate?: Date | undefined
  locale?: string | undefined
  className?: LithosClass | undefined
  onBlur?: (() => void) | undefined
}

export const DateField = ({
  label = 'Controlled picker',
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = 'DD/MM/YYYY',
  disabled = false,
  invalid = false,
  clearable = false,
  minDate,
  maxDate,
  locale = 'en-US',
  className,
  onBlur,
  ref: propRef,
  ...props
}: DateFieldProps & { ref?: Ref<HTMLInputElement> }) => {
  const isControlled = controlledValue !== undefined
  const [localValue, setLocalValue] = useState<Date | null>(() => defaultValue)
  const selectedDate = isControlled ? controlledValue : localValue

  const [open, setOpen] = useState(false)

  const formattedDisplay = useMemo(() => {
    if (!selectedDate || !isValidDate(selectedDate)) return ''
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const year = selectedDate.getFullYear()
    return `${day}/${month}/${year}`
  }, [selectedDate])

  const [inputValue, setInputValue] = useState(formattedDisplay)
  const internalInputRef = useRef<HTMLInputElement>(null)
  const isFocusedRef = useRef(false)

  useEffect(() => {
    if (!isFocusedRef.current) {
      setInputValue(formattedDisplay)
    }
  }, [formattedDisplay, selectedDate])

  const floating = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ fallbackAxisSideDirection: 'end' }), shift({ padding: 8 })],
  })

  const handleDateSelect = (nextDate: unknown) => {
    const date = nextDate instanceof Date && isValidDate(nextDate) ? nextDate : null
    if (!isControlled) {
      setLocalValue(date)
    }
    onChange?.(date)
    setOpen(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const formatted = formatDateInput(text, inputValue)
    setInputValue(formatted)

    if (formatted.trim() === '') {
      if (!isControlled) {
        setLocalValue(null)
      }
      onChange?.(null)
      return
    }

    const parsed = parseDateString(formatted)
    if (parsed) {
      if (!isDateInputInvalid(parsed)) {
        if (!isControlled) {
          setLocalValue(parsed)
        }
        onChange?.(parsed)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseDateString(inputValue)
      if (parsed) {
        if (!isControlled) {
          setLocalValue(parsed)
        }
        onChange?.(parsed)
      }
    }
  }

  const handleInputFocus = () => {
    isFocusedRef.current = true
  }

  const handleInputBlur = () => {
    isFocusedRef.current = false
    if (inputValue.trim() === '') {
      setInputValue('')
      if (!isControlled) {
        setLocalValue(null)
      }
      onChange?.(null)
    } else {
      const parsed = parseDateString(inputValue)
      if (parsed) {
        if (!isControlled) {
          setLocalValue(parsed)
        }
        onChange?.(parsed)
      } else if (selectedDate) {
        setInputValue(formattedDisplay)
      } else {
        setInputValue('')
      }
    }
    onBlur?.()
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled) {
      setInputValue('')
      if (!isControlled) {
        setLocalValue(null)
      }
      onChange?.(null)
      internalInputRef.current?.focus()
    }
  }

  const handleCalendarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled) {
      setOpen((prev) => !prev)
    }
  }

  const hasValue = Boolean(selectedDate && isValidDate(selectedDate))
  const defaultPlaceholder = placeholder ?? 'DD/MM/YYYY'
  const isInputInvalid = isDateInputInvalid(inputValue)
  const isValueInvalid = isDateInputInvalid(selectedDate)
  const isInvalid = Boolean(invalid || (inputValue ? isInputInvalid : isValueInvalid))

  const remainingPlaceholder =
    inputValue.length > 0 && inputValue.length < defaultPlaceholder.length
      ? defaultPlaceholder.slice(inputValue.length)
      : ''

  return (
    <div ref={floating.refs.setReference} className={cn('relative inline-block w-full max-w-xs', className)}>
      <fieldset
        style={isInvalid ? { borderColor: colors.error } : undefined}
        className={cn(
          'border-2 rounded-(--lithos-radius) px-3 py-1 bg-(--lithos-surface) text-(--lithos-text) transition select-none',
          isInvalid
            ? 'border-red-500 shadow-[2px_2px_0_0_#FF0000] hover:shadow-[4px_4px_0_0_#FF0000] focus-within:shadow-[4px_4px_0_0_#FF0000]'
            : 'border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
          {
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
      >
        {label && (
          <legend
            style={isInvalid ? { color: colors.error } : undefined}
            className={cn(
              'px-1 text-xs font-mono font-bold transition-colors',
              isInvalid ? 'text-red-500' : 'text-(--lithos-text)'
            )}
          >
            {label}
          </legend>
        )}

        <div className="flex items-center justify-between pb-0.5">
          <div className="relative flex-1 min-w-0 flex items-center overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center font-mono font-bold text-sm select-none overflow-hidden"
            >
              <span className="invisible whitespace-pre">{inputValue}</span>
              <span className="text-(--lithos-text)/40 whitespace-pre">{remainingPlaceholder}</span>
            </div>
            <input
              ref={(node) => {
                internalInputRef.current = node
                if (typeof propRef === 'function') propRef(node)
                else if (propRef && 'current' in propRef)
                  (propRef as { current: HTMLInputElement | null }).current = node
              }}
              type="text"
              disabled={disabled}
              maxLength={10}
              value={inputValue}
              placeholder={inputValue ? '' : defaultPlaceholder}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              aria-label={label ?? defaultPlaceholder}
              aria-invalid={isInvalid ? 'true' : 'false'}
              className="relative z-10 w-full bg-transparent outline-none font-mono font-bold text-sm text-(--lithos-text) placeholder:text-(--lithos-text)/40 select-text"
              {...props}
            />
          </div>

          <div className="flex items-center shrink-0 ml-2">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                tabIndex={0}
                aria-label="Clear date"
                onClick={handleClear}
                className="p-0.5 hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer mr-1 text-(--lithos-text)"
              >
                <IconClose className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              disabled={disabled}
              aria-label="Open calendar"
              aria-haspopup="dialog"
              aria-expanded={open}
              data-state={open ? 'open' : 'closed'}
              onClick={handleCalendarClick}
              className={cn(
                'p-1 flex items-center justify-center hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer transition-colors text-(--lithos-text)',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <IconCalendar className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </fieldset>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={floating.context} modal={false}>
            <div
              ref={floating.refs.setFloating}
              style={floating.floatingStyles}
              role="dialog"
              aria-label="Calendar Popover"
              className="z-50 border-2 border-(--lithos-border) bg-(--lithos-surface) p-3 shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)"
            >
              <Calendar
                mode="single"
                value={selectedDate}
                onChange={handleDateSelect}
                bordered={false}
                locale={locale}
                {...(minDate !== undefined && { minDate })}
                {...(maxDate !== undefined && { maxDate })}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
}
