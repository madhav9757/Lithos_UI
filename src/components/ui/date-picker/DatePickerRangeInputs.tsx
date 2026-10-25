import { useState, useEffect, type ChangeEvent } from 'react'
import { useDatePickerContext } from './useDatePicker'
import { formatDateNumeric, parseDateString } from './date-picker.utils'
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

  useEffect(() => {
    setFromText(formatDateNumeric(range.from))
    setToText(formatDateNumeric(range.to))
  }, [range.from, range.to])

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setFromText(text)
    const parsed = parseDateString(text)
    if (parsed) {
      setValue({ from: parsed, to: range.to })
    }
  }

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setToText(text)
    const parsed = parseDateString(text)
    if (parsed) {
      setValue({ from: range.from, to: parsed })
    }
  }

  return (
    <div className={cn('flex items-center w-full mb-3', className)}>
      <div className="flex-1 mr-3">
        <label className="block text-xs font-mono font-bold mb-1 opacity-80 uppercase tracking-wider text-(--lithos-text)">
          {fromLabel}
        </label>
        <input
          type="text"
          readOnly={!editable}
          value={fromText}
          onChange={handleFromChange}
          placeholder="DD/MM/YYYY"
          aria-label={fromLabel}
          className="w-full font-mono text-xs md:text-sm font-bold border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) px-3 py-1.5 outline-none shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] transition"
        />
      </div>

      <div className="flex-1">
        <label className="block text-xs font-mono font-bold mb-1 opacity-80 uppercase tracking-wider text-(--lithos-text)">
          {toLabel}
        </label>
        <input
          type="text"
          readOnly={!editable}
          value={toText}
          onChange={handleToChange}
          placeholder="DD/MM/YYYY"
          aria-label={toLabel}
          className="w-full font-mono text-xs md:text-sm font-bold border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) px-3 py-1.5 outline-none shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] transition"
        />
      </div>
    </div>
  )
}
