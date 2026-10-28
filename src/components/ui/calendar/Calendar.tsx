/**
 * @fileoverview Lithos UI calendar primitive.
 * - Dual-mode state architecture: displayed month and selection are independently
 *   controlled/uncontrolled (mirrors Accordion's `open !== undefined ? open : local` pattern),
 *   so jumping year/month via the header selects never touches the selected value.
 * - Zero-Gap grid: weekday headers + all 42 day cells share ONE `grid-cols-7`, never `g a p-*`.
 *   Border-ownership technique — the grid owns its outer top/left edge once, every cell owns
 *   only its own right+bottom border, so no shared edge between adjacent cells is ever drawn twice.
 * - `.lithos-click` exceptions (documented, not accidental):
 *   1. Day cells are real <button> for a11y but skip `.lithos-click` — its hover-grow-shadow /
 *      active-press-translate physics is built for isolated spaced-out controls; at 42-cell grid
 *      density it would double up against the border-ownership scheme and visually break. Day
 *      cells get manual `cn()` background-state changes only (hover/selected/in-range/disabled).
 *   2. Month/year pickers are a hand-built `HeaderDropdown` listbox, not a native <select> — a
 *      native select renders OS chrome (system font/scrollbar) that breaks the brutalist frame,
 *      especially on a long year list. `HeaderDropdown` is a plain bordered trigger `Button` plus
 *      an absolutely-positioned bordered option panel, so it keeps `.lithos-click` physics on the
 *      trigger and full token/shadow styling on the panel — no positioning library needed since
 *      it only ever anchors directly under its own trigger.
 * - Prev/next nav buttons are NOT exceptions: they route through `Button variant='text'` exactly
 *   like Accordion's header toggle, with full `.lithos-click` physics.
 * - Multicolor selection (mode='multiple' only): `dateColors` lets a consumer assign distinct
 *   colors per group of selected dates (e.g. sick leave vs vacation). Custom colors are resolved to a readable
 *   foreground via the YIQ contrast engine (`src/utils/yiq.ts`), same as Badge's `color` prop.
 *   Range mode intentionally does NOT support per-date color — every day inside a selected range
 *   (endpoints and the days between) renders in one uniform accent color, since a range is a single
 *   contiguous selection, not a set of independently colorable dates.
 */
import { createContext, useContext, useMemo, useState } from 'react'
import { Button } from '../Button'
import { cn } from '../../../utils/cn'
import { IconChevronLeft } from '../icons/IconChevronLeft'
import {
  addMonths,
  formatMonthYear,
  getCalendarGridDays,
  getMonthLabels,
  getWeekdayLabels,
  isBeforeDay,
  isDateInRange,
  isDateOutOfBounds,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from '../../../utils/date'
import { inferSeedDate, getEmptyValue, asRange, asArray } from './calendar.utils'
import { useRainbowColors } from './useRainbowColors'
import { useCalendarKeyboardNav } from './useCalendarKeyboardNav'
import { CalendarGrid } from './CalendarGrid'
import { Select } from '../Select'

import type { DateRange, CalendarValue, CalendarProps } from './calendar.types'

export interface CalendarContextValue {
  bordered?: boolean
}

export const CalendarContext = createContext<CalendarContextValue | null>(null)

const NavIcon = ({ direction }: { direction: 'prev' | 'next' }) => (
  <div className="w-4 min-w-4">
    <IconChevronLeft className={cn('max-w-full h-auto', direction === 'next' && 'rotate-180')} />
  </div>
)

/**
 * Calendar date picker component supporting single, multiple, range, and rainbow modes,
 * keyboard navigation, custom color mapping, and accessible month/year grid selection.
 *
 * @param props - Calendar configuration props including mode, value, range limits, and callbacks.
 * @returns Calendar container element.
 */
export const Calendar = ({
  mode = 'single',
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  disabledDates,
  isDateDisabled,
  dateColors,
  firstDayOfWeek = 0,
  locale,
  yearRange,
  classes = {},
  className,
  bordered: propBordered,
  ...rest
}: CalendarProps) => {
  const calendarContext = useContext(CalendarContext)
  const bordered = propBordered ?? calendarContext?.bordered ?? true
  const isValueControlled = value !== undefined
  const [localValue, setLocalValue] = useState<CalendarValue>(() => defaultValue ?? getEmptyValue(mode))
  const currentValue = isValueControlled ? value! : localValue
  const currentArray = useMemo(() => asArray(currentValue), [currentValue])

  const isMonthControlled = month !== undefined
  const [localMonth, setLocalMonth] = useState<Date>(() =>
    startOfMonth(defaultMonth ?? inferSeedDate(mode, defaultValue ?? value) ?? new Date())
  )
  const displayedMonth = isMonthControlled ? startOfMonth(month!) : localMonth

  const rainbowColors = useRainbowColors(mode, currentArray)

  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const changeMonth = (next: Date) => {
    const normalized = startOfMonth(next)
    if (!isMonthControlled) setLocalMonth(normalized)
    onMonthChange?.(normalized)
  }

  const commitValue = (next: CalendarValue) => {
    if (!isValueControlled) setLocalValue(next)
    onChange?.(next)
  }

  const isDisabled = (date: Date): boolean => {
    if (isDateOutOfBounds(date, minDate, maxDate)) return true
    if (disabledDates?.some((d) => (typeof d === 'number' ? d === date.getDate() : isSameDay(d, date)))) return true
    if (isDateDisabled?.(date)) return true
    return false
  }

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return
    if (!isSameMonth(date, displayedMonth)) changeMonth(date)

    if (mode === 'single') {
      commitValue(date)
      return
    }

    if (mode === 'multiple' || mode === 'rainbow') {
      const arr = asArray(currentValue)
      const exists = arr.some((d) => isSameDay(d, date))
      commitValue(exists ? arr.filter((d) => !isSameDay(d, date)) : [...arr, date])
      return
    }

    const range = asRange(currentValue)
    if (!range.from || range.to) {
      commitValue({ from: date, to: null })
    } else {
      const from = isBeforeDay(date, range.from) ? date : range.from
      const to = isBeforeDay(date, range.from) ? range.from : date
      commitValue({ from, to })
    }
  }

  const { focusedDate, setFocusedDate, dayButtonRefs, handleGridKeyDown } = useCalendarKeyboardNav({
    initialFocusedDate: inferSeedDate(mode, defaultValue ?? value) ?? displayedMonth,
    displayedMonth,
    firstDayOfWeek,
    minDate,
    maxDate,
    changeMonth,
    onDaySelect: handleDayClick,
  })

  const previewRange: DateRange | null = useMemo(() => {
    if (mode !== 'range') return null
    const range = asRange(currentValue)
    if (range.from && !range.to && hoverDate) {
      return isBeforeDay(hoverDate, range.from)
        ? { from: hoverDate, to: range.from }
        : { from: range.from, to: hoverDate }
    }
    return range
  }, [mode, currentValue, hoverDate])

  /** True for the start, end, and every day between — the whole range renders as one uniform color. */
  const isRangeMember = (date: Date): boolean => {
    if (mode !== 'range') return false
    const range = previewRange ?? asRange(currentValue)
    if (!range.from) return false
    if (isSameDay(range.from, date)) return true
    if (range.to && isDateInRange(date, range)) return true
    return false
  }

  const gridDays = useMemo(() => getCalendarGridDays(displayedMonth, firstDayOfWeek), [displayedMonth, firstDayOfWeek])
  const weekdayLabels = useMemo(() => getWeekdayLabels(firstDayOfWeek, locale), [firstDayOfWeek, locale])
  const monthLabels = useMemo(() => getMonthLabels(locale), [locale])

  const currentYear = new Date().getFullYear()
  const [minYear, maxYear] = yearRange ?? [currentYear - 100, currentYear + 10]
  const yearOptions = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  )

  const isPrevDisabled = minDate ? displayedMonth.getTime() <= startOfMonth(minDate).getTime() : false
  const isNextDisabled = maxDate ? displayedMonth.getTime() >= startOfMonth(maxDate).getTime() : false

  const dateFormatter = useMemo(
    () => ({
      // avoids creating a formater everytime a grid cell is created
      gridLabel: new Intl.DateTimeFormat(locale, { dateStyle: 'full' }),
      month: new Intl.DateTimeFormat(locale, { month: 'long' }),
    }),
    [locale]
  )

  const selectedMonth = displayedMonth.getMonth()
  const monthLabel = dateFormatter.month.format(displayedMonth)
  const selectedYear = displayedMonth.getFullYear()

  return (
    <div
      className={cn(
        'inline-block w-full',
        bordered &&
          'border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] p-3 rounded-(--lithos-radius)',
        classes.container,
        className
      )}
      {...rest}
    >
      <div className={cn('flex items-center justify-between mb-3', classes.header)}>
        <Button
          variant="text"
          aria-label="Previous month"
          disabled={isPrevDisabled}
          onClick={() => changeMonth(addMonths(displayedMonth, -1))}
          className={cn('translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0 p-1', classes.nav)}
        >
          <NavIcon direction="prev" />
        </Button>

        <div className="flex items-center">
          <Select
            label="Month"
            value={String(selectedMonth)}
            options={monthLabels.map((label, index) => ({ value: String(index), label }))}
            onChange={(monthIndex) => changeMonth(new Date(displayedMonth.getFullYear(), +monthIndex, 1))}
            className={['mr-2 min-w-30 text-sm', classes.monthSelect]}
            placeholder={monthLabel}
          />

          <Select
            label="Year"
            value={String(selectedYear)}
            options={yearOptions.map((year) => ({ value: String(year), label: String(year) }))}
            onChange={(year) => changeMonth(new Date(+year, displayedMonth.getMonth(), 1))}
            className={['min-w-20 text-sm', classes.yearSelect]}
            placeholder={String(selectedYear)}
          />
        </div>

        <Button
          variant="text"
          aria-label="Next month"
          disabled={isNextDisabled}
          onClick={() => changeMonth(addMonths(displayedMonth, 1))}
          className={cn('translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0 p-1', classes.nav)}
        >
          <NavIcon direction="next" />
        </Button>
      </div>

      <span className="sr-only" aria-live="polite">
        {formatMonthYear(displayedMonth, locale)}
      </span>

      <CalendarGrid
        mode={mode}
        currentValue={currentValue}
        focusedDate={focusedDate}
        gridDays={gridDays}
        weekdayLabels={weekdayLabels}
        dateFormatter={dateFormatter.gridLabel}
        dateColors={dateColors}
        rainbowColors={rainbowColors}
        classes={classes}
        dayButtonRefs={dayButtonRefs}
        isDisabled={isDisabled}
        isRangeMember={isRangeMember}
        setHoverDate={setHoverDate}
        setFocusedDate={setFocusedDate}
        handleDayClick={handleDayClick}
        handleGridKeyDown={handleGridKeyDown}
      />
    </div>
  )
}
