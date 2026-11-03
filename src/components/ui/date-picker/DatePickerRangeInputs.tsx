import { useState, useEffect, useRef, type ChangeEvent } from 'react'
import { useDatePickerContext } from './useDatePicker'
import { formatDateNumeric, formatDateInput, parseDateString } from './date-picker.utils'
import { cn } from '../../../utils/cn'
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

  return (
    <div className={cn('flex flex-row items-center w-full max-w-[500px] mb-3', className)}>
      <div className="flex-1 min-w-0 mr-3 sm:mr-4">
        <label className="block text-xs font-mono font-bold mb-1 opacity-80 text-(--lithos-text)">{fromLabel}</label>
        <input
          type="text"
          readOnly={!editable}
          maxLength={10}
          value={fromText}
          onChange={handleFromChange}
          onFocus={handleFromFocus}
          onBlur={handleFromBlur}
          placeholder="DD/MM/YYYY"
          aria-label={fromLabel}
          className="w-full font-mono text-xs md:text-sm font-bold border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) px-2 sm:px-3 py-1.5 outline-none shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] transition"
        />
      </div>

      <div className="flex-1 min-w-0">
        <label className="block text-xs font-mono font-bold mb-1 opacity-80 text-(--lithos-text)">{toLabel}</label>
        <input
          type="text"
          readOnly={!editable}
          maxLength={10}
          value={toText}
          onChange={handleToChange}
          onFocus={handleToFocus}
          onBlur={handleToBlur}
          placeholder="DD/MM/YYYY"
          aria-label={toLabel}
          className="w-full font-mono text-xs md:text-sm font-bold border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) px-2 sm:px-3 py-1.5 outline-none shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] transition"
        />
      </div>
    </div>
  )
}
