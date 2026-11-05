import { useState, useEffect, useRef, type ChangeEvent } from 'react'
import { useDatePickerContext } from './useDatePicker'
import { formatDateNumeric, formatDateInput, parseDateString, isDateInputInvalid } from './date-picker.utils'
import { cn } from '../../../utils/cn'
import { colors } from '../../../utils/colors'
import type { LithosClass } from '../../../utils/cn'
import type { DateRange } from '../calendar/calendar.types'

export interface DatePickerRangeInputsProps {
  fromLabel?: string | undefined
  toLabel?: string | undefined
  editable?: boolean | undefined
  className?: LithosClass | undefined
}

export const DatePickerRangeInputs = ({
  fromLabel = 'From',
  toLabel = 'To',
  editable = true,
  className,
}: DatePickerRangeInputsProps) => {
  const { value, setValue } = useDatePickerContext()
  const range = value && typeof value === 'object' && 'from' in value ? (value as DateRange) : { from: null, to: null }

  const [fromText, setFromText] = useState(() => formatDateNumeric(range.from))
  const [toText, setToText] = useState(() => formatDateNumeric(range.to))

  const fromFocusedRef = useRef(false)
  const toFocusedRef = useRef(false)

  useEffect(() => {
    if (!fromFocusedRef.current) {
      setFromText(formatDateNumeric(range.from))
    }
    if (!toFocusedRef.current) {
      setToText(formatDateNumeric(range.to))
    }
  }, [range.from, range.to])

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const formatted = formatDateInput(text, fromText)
    setFromText(formatted)
    if (formatted.trim() === '') {
      setValue({ from: null, to: range.to })
      return
    }
    const parsed = parseDateString(formatted)
    if (parsed) {
      setValue({ from: parsed, to: range.to })
    }
  }

  const handleFromFocus = () => {
    fromFocusedRef.current = true
  }

  const handleFromBlur = () => {
    fromFocusedRef.current = false
    if (fromText.trim() === '') {
      setFromText('')
      setValue({ from: null, to: range.to })
    } else {
      const parsed = parseDateString(fromText)
      if (parsed) {
        setValue({ from: parsed, to: range.to })
      } else if (range.from) {
        setFromText(formatDateNumeric(range.from))
      } else {
        setFromText('')
      }
    }
  }

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const formatted = formatDateInput(text, toText)
    setToText(formatted)
    if (formatted.trim() === '') {
      setValue({ from: range.from, to: null })
      return
    }
    const parsed = parseDateString(formatted)
    if (parsed) {
      setValue({ from: range.from, to: parsed })
    }
  }

  const handleToFocus = () => {
    toFocusedRef.current = true
  }

  const handleToBlur = () => {
    toFocusedRef.current = false
    if (toText.trim() === '') {
      setToText('')
      setValue({ from: range.from, to: null })
    } else {
      const parsed = parseDateString(toText)
      if (parsed) {
        setValue({ from: range.from, to: parsed })
      } else if (range.to) {
        setToText(formatDateNumeric(range.to))
      } else {
        setToText('')
      }
    }
  }

  const fromPlaceholder = 'DD/MM/YYYY'
  const toPlaceholder = 'DD/MM/YYYY'
  const fromYearInvalid = fromText ? isDateInputInvalid(fromText) : isDateInputInvalid(range.from)
  const toYearInvalid = toText ? isDateInputInvalid(toText) : isDateInputInvalid(range.to)
  const fromRemaining =
    fromText.length > 0 && fromText.length < fromPlaceholder.length ? fromPlaceholder.slice(fromText.length) : ''
  const toRemaining =
    toText.length > 0 && toText.length < toPlaceholder.length ? toPlaceholder.slice(toText.length) : ''

  return (
    <div className={cn('flex flex-row items-center w-full max-w-[500px] mb-3', className)}>
      <div className="flex-1 min-w-0 mr-3 sm:mr-4">
        <label
          style={fromYearInvalid ? { color: colors.error } : undefined}
          className={cn(
            'block text-xs font-mono font-bold mb-1 transition-colors',
            fromYearInvalid ? 'text-red-500' : 'opacity-80 text-(--lithos-text)'
          )}
        >
          {fromLabel}
        </label>
        <div
          style={fromYearInvalid ? { borderColor: colors.error } : undefined}
          className={cn(
            'relative flex items-center w-full rounded-(--lithos-radius) bg-(--lithos-surface) border-2 transition overflow-hidden',
            fromYearInvalid
              ? 'border-red-500 shadow-[2px_2px_0_0_#FF0000] focus-within:shadow-[4px_4px_0_0_#FF0000]'
              : 'border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]'
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center px-2 sm:px-3 py-1.5 font-mono text-xs md:text-sm font-bold select-none overflow-hidden"
          >
            <span className="invisible whitespace-pre">{fromText}</span>
            <span className="text-(--lithos-text)/40 whitespace-pre">{fromRemaining}</span>
          </div>
          <input
            type="text"
            readOnly={!editable}
            maxLength={10}
            value={fromText}
            onChange={handleFromChange}
            onFocus={handleFromFocus}
            onBlur={handleFromBlur}
            placeholder={fromText ? '' : fromPlaceholder}
            aria-label={fromLabel}
            aria-invalid={fromYearInvalid ? 'true' : 'false'}
            className="relative z-10 w-full bg-transparent font-mono text-xs md:text-sm font-bold text-(--lithos-text) placeholder:text-(--lithos-text)/40 px-2 sm:px-3 py-1.5 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <label
          style={toYearInvalid ? { color: colors.error } : undefined}
          className={cn(
            'block text-xs font-mono font-bold mb-1 transition-colors',
            toYearInvalid ? 'text-red-500' : 'opacity-80 text-(--lithos-text)'
          )}
        >
          {toLabel}
        </label>
        <div
          style={toYearInvalid ? { borderColor: colors.error } : undefined}
          className={cn(
            'relative flex items-center w-full rounded-(--lithos-radius) bg-(--lithos-surface) border-2 transition overflow-hidden',
            toYearInvalid
              ? 'border-red-500 shadow-[2px_2px_0_0_#FF0000] focus-within:shadow-[4px_4px_0_0_#FF0000]'
              : 'border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]'
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center px-2 sm:px-3 py-1.5 font-mono text-xs md:text-sm font-bold select-none overflow-hidden"
          >
            <span className="invisible whitespace-pre">{toText}</span>
            <span className="text-(--lithos-text)/40 whitespace-pre">{toRemaining}</span>
          </div>
          <input
            type="text"
            readOnly={!editable}
            maxLength={10}
            value={toText}
            onChange={handleToChange}
            onFocus={handleToFocus}
            onBlur={handleToBlur}
            placeholder={toText ? '' : toPlaceholder}
            aria-label={toLabel}
            aria-invalid={toYearInvalid ? 'true' : 'false'}
            className="relative z-10 w-full bg-transparent font-mono text-xs md:text-sm font-bold text-(--lithos-text) placeholder:text-(--lithos-text)/40 px-2 sm:px-3 py-1.5 outline-none"
          />
        </div>
      </div>
    </div>
  )
}
