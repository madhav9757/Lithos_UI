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
import { parseDateString, isValidDate } from './date-picker.utils'
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
  placeholder = 'MM/DD/YYYY',
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
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const year = selectedDate.getFullYear()
    return `${month}/${day}/${year}`
  }, [selectedDate])

  const [inputValue, setInputValue] = useState(formattedDisplay)
  const internalInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(formattedDisplay)
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
    setInputValue(text)

    if (text.trim() === '') {
      if (!isControlled) {
        setLocalValue(null)
      }
      onChange?.(null)
      return
    }

    const parsed = parseDateString(text)
    if (parsed) {
      if (!isControlled) {
        setLocalValue(parsed)
      }
      onChange?.(parsed)
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

  const handleInputBlur = () => {
    if (selectedDate) {
      setInputValue(formattedDisplay)
    } else if (inputValue.trim() === '') {
      setInputValue('')
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

  return (
    <div ref={floating.refs.setReference} className={cn('relative inline-block w-full max-w-xs', className)}>
      <fieldset
        style={invalid ? { borderColor: colors.error } : undefined}
        className={cn(
          'border-2 border-(--lithos-border) rounded-(--lithos-radius) px-3 py-1 bg-(--lithos-surface) text-(--lithos-text) shadow-[2px_2px_0_0_var(--lithos-shadow)] transition select-none',
          {
            'hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]':
              !disabled,
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
      >
        {label && <legend className="px-1 text-xs font-mono font-bold text-(--lithos-text)">{label}</legend>}

        <div className="flex items-center justify-between pb-0.5">
          <input
            ref={(node) => {
              internalInputRef.current = node
              if (typeof propRef === 'function') propRef(node)
              else if (propRef && 'current' in propRef) (propRef as { current: HTMLInputElement | null }).current = node
            }}
            type="text"
            disabled={disabled}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            aria-label={label ?? placeholder}
            className="w-full bg-transparent outline-none font-mono font-bold text-sm text-(--lithos-text) placeholder:text-(--lithos-text)/40 select-text"
            {...props}
          />

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
                'p-1 flex items-center justify-center hover:bg-(--lithos-border)/10 rounded-sm cursor-pointer text-(--lithos-text) transition-colors',
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
              aria-label="Choose date"
              className="z-(--lithos-z-popover) inline-block border-2 border-(--lithos-border) bg-(--lithos-surface) p-3 shadow-[4px_4px_0_0_var(--lithos-shadow)] text-(--lithos-text) outline-none rounded-(--lithos-radius) w-fit max-w-[calc(100vw-1rem)]"
            >
              <Calendar
                mode="single"
                value={selectedDate}
                onChange={handleDateSelect}
                bordered={false}
                locale={locale}
                {...(minDate !== undefined && { minDate })}
                {...(maxDate !== undefined && { maxDate })}
                className="w-full"
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
}
