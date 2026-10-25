import { useState, useMemo, useRef } from 'react'
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
  const range = useMemo(
    () => (value && typeof value === 'object' && 'from' in value ? (value as DateRange) : { from: null, to: null }),
    [value]
  )

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

  const handleGridKeyDown = () => {}

  const leftDays = useMemo(() => getCalendarGridDays(currentMonth, firstDayOfWeek), [currentMonth, firstDayOfWeek])
  const rightDays = useMemo(() => getCalendarGridDays(nextMonth, firstDayOfWeek), [nextMonth, firstDayOfWeek])
  const weekdayLabels = useMemo(
    () => getWeekdayLabels(firstDayOfWeek, locale).map((d) => d.slice(0, 2)),
    [firstDayOfWeek, locale]
  )

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: 'full' }), [locale])

  const isPrevDisabled = minDate ? currentMonth.getTime() <= startOfMonth(minDate).getTime() : false
  const isNextDisabled = maxDate ? nextMonth.getTime() >= startOfMonth(maxDate).getTime() : false

  return (
    <div className={cn('flex flex-col w-full max-w-[500px]', className)}>
      <div className="flex flex-row items-start w-full">
        <div className="flex-1 min-w-0 mr-3 sm:mr-4">
          <div className="flex items-center justify-between mb-2 h-8">
            <span className="font-mono font-bold text-xs sm:text-sm truncate text-(--lithos-text)">
              {formatMonthYear(currentMonth, locale)}
            </span>
          </div>

          <CalendarGrid
            mode="range"
            classes={{
              grid: 'w-full [grid-template-columns:repeat(7,minmax(24px,1fr))!important]',
            }}
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 h-8">
            <span className="font-mono font-bold text-xs sm:text-sm truncate text-(--lithos-text)">
              {formatMonthYear(nextMonth, locale)}
            </span>

            <div className="flex items-center">
              <Button
                variant="text"
                aria-label="Previous month"
                disabled={isPrevDisabled}
                onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
                className="p-1 mr-0.5 sm:mr-1"
              >
                <IconChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="text"
                aria-label="Next month"
                disabled={isNextDisabled}
                onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                className="p-1"
              >
                <IconChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
              </Button>
            </div>
          </div>

          <CalendarGrid
            mode="range"
            classes={{
              grid: 'w-full [grid-template-columns:repeat(7,minmax(24px,1fr))!important]',
            }}
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
