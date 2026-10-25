import { useState, useMemo, useRef, type KeyboardEvent } from 'react'
import { useDatePickerContext } from './useDatePicker'
import { CalendarGrid } from '../calendar/CalendarGrid'
import { Button } from '../Button'
import { IconChevronLeft } from '../icons/IconChevronLeft'
import {
  addMonths,
  formatMonthYear,
  getCalendarGridDays,
  getWeekdayLabels,
  isBeforeDay,
  isDateInRange,
  isDateOutOfBounds,
  isSameDay,
  startOfMonth,
} from '../../../utils/date'
import { asRange } from '../calendar/calendar.utils'
import { cn } from '../../../utils/cn'
import type { LithosClass } from '../../../utils/cn'
import type { DateRange } from '../calendar/calendar.types'

export interface DatePickerDualCalendarProps {
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  disabledDates?: (Date | number)[] | undefined
  isDateDisabled?: ((date: Date) => boolean) | undefined
  className?: LithosClass | undefined
}

export const DatePickerDualCalendar = ({
  firstDayOfWeek = 0,
  disabledDates,
  isDateDisabled,
  className,
}: DatePickerDualCalendarProps) => {
  const { value, setValue, minDate, maxDate, locale } = useDatePickerContext()
  const range = value && typeof value === 'object' && 'from' in value ? (value as DateRange) : { from: null, to: null }

  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(range.from ?? new Date()))
  const nextMonth = useMemo(() => addMonths(currentMonth, 1), [currentMonth])

  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [focusedDate, setFocusedDate] = useState<Date>(() => currentMonth)

  const leftButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const rightButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const emptyRainbowMap = useMemo(() => new Map<string, string>(), [])

  const previewRange: DateRange | null = useMemo(() => {
    if (range.from && !range.to && hoverDate) {
      return isBeforeDay(hoverDate, range.from)
        ? { from: hoverDate, to: range.from }
        : { from: range.from, to: hoverDate }
    }
    return range
  }, [range, hoverDate])

  const isRangeMember = (date: Date): boolean => {
    const activeRange = previewRange ?? range
    if (!activeRange.from) return false
    if (isSameDay(activeRange.from, date)) return true
    if (activeRange.to && isDateInRange(date, activeRange)) return true
    return false
  }

  const isDisabled = (date: Date): boolean => {
    if (isDateOutOfBounds(date, minDate, maxDate)) return true
    if (disabledDates?.some((d) => (typeof d === 'number' ? d === date.getDate() : isSameDay(d, date)))) return true
    if (isDateDisabled?.(date)) return true
    return false
  }

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return

    if (!range.from || range.to) {
      setValue({ from: date, to: null })
    } else {
      const from = isBeforeDay(date, range.from) ? date : range.from
      const to = isBeforeDay(date, range.from) ? range.from : date
      setValue({ from, to })
    }
  }

  const handleGridKeyDown = (_event: KeyboardEvent<HTMLDivElement>) => {}

  const leftDays = useMemo(() => getCalendarGridDays(currentMonth, firstDayOfWeek), [currentMonth, firstDayOfWeek])
  const rightDays = useMemo(() => getCalendarGridDays(nextMonth, firstDayOfWeek), [nextMonth, firstDayOfWeek])
  const weekdayLabels = useMemo(() => getWeekdayLabels(firstDayOfWeek, locale), [firstDayOfWeek, locale])

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'full' }), [locale])

  const isPrevDisabled = minDate ? currentMonth.getTime() <= startOfMonth(minDate).getTime() : false
  const isNextDisabled = maxDate ? nextMonth.getTime() >= startOfMonth(maxDate).getTime() : false

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between mb-3 w-full">
        <div className="flex items-center justify-between flex-1 mr-6">
          <span className="font-mono font-bold text-sm text-(--lithos-text)">
            {formatMonthYear(currentMonth, locale)}
          </span>
        </div>

        <div className="flex items-center justify-between flex-1">
          <span className="font-mono font-bold text-sm text-(--lithos-text)">{formatMonthYear(nextMonth, locale)}</span>

          <div className="flex items-center ml-2">
            <Button
              variant="text"
              aria-label="Previous month"
              disabled={isPrevDisabled}
              onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
              className="p-1 mr-1"
            >
              <IconChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="text"
              aria-label="Next month"
              disabled={isNextDisabled}
              onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
              className="p-1"
            >
              <IconChevronLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        <div className="mr-0 md:mr-6 mb-4 md:mb-0">
          <CalendarGrid
            mode="range"
            currentValue={asRange(range)}
            focusedDate={focusedDate}
            gridDays={leftDays}
            weekdayLabels={weekdayLabels}
            dateFormatter={dateFormatter}
            rainbowColors={emptyRainbowMap}
            dayButtonRefs={leftButtonRefs}
            isDisabled={isDisabled}
            isRangeMember={isRangeMember}
            setHoverDate={setHoverDate}
            setFocusedDate={setFocusedDate}
            handleDayClick={handleDayClick}
            handleGridKeyDown={handleGridKeyDown}
          />
        </div>

        <div>
          <CalendarGrid
            mode="range"
            currentValue={asRange(range)}
            focusedDate={focusedDate}
            gridDays={rightDays}
            weekdayLabels={weekdayLabels}
            dateFormatter={dateFormatter}
            rainbowColors={emptyRainbowMap}
            dayButtonRefs={rightButtonRefs}
            isDisabled={isDisabled}
            isRangeMember={isRangeMember}
            setHoverDate={setHoverDate}
            setFocusedDate={setFocusedDate}
            handleDayClick={handleDayClick}
            handleGridKeyDown={handleGridKeyDown}
          />
        </div>
      </div>
    </div>
  )
}
