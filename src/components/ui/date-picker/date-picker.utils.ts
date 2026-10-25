import { isSameDay, normalizeToMidnight, addDays, startOfMonth, endOfMonth } from '../../../utils/date'
import type { DateRange } from '../calendar/calendar.types'
import type { DatePickerMode, DatePickerValue, DatePickerPreset } from './date-picker.types'

export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

export const formatDate = (
  date: Date | null | undefined,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string => {
  if (!date || !isValidDate(date)) return ''
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const formatDateNumeric = (date: Date | null | undefined): string => {
  if (!date || !isValidDate(date)) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const getDayDifference = (from: Date | null, to: Date | null): number => {
  if (!from) return 0
  if (!to) return 1
  const fromTime = normalizeToMidnight(from).getTime()
  const toTime = normalizeToMidnight(to).getTime()
  const diffTime = Math.abs(toTime - fromTime)
  return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1
}

export const formatDayCount = (count: number): string => {
  if (count <= 0) return 'No dates selected'
  if (count === 1) return '1 day selected'
  return `${count} days selected`
}

export const formatDateRange = (range: DateRange | null | undefined, locale?: string): string => {
  if (!range || !range.from) return ''
  const fromFormatted = formatDate(range.from, locale)
  if (!range.to) return fromFormatted
  if (isSameDay(range.from, range.to)) return fromFormatted
  const toFormatted = formatDate(range.to, locale)
  return `${fromFormatted} - ${toFormatted}`
}

export const parseDateString = (input: string): Date | null => {
  const trimmed = input.trim()
  if (!trimmed) return null

  const isoMatch = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(trimmed)
  if (isoMatch && isoMatch[1] && isoMatch[2] && isoMatch[3]) {
    const year = Number(isoMatch[1])
    const month = Number(isoMatch[2]) - 1
    const day = Number(isoMatch[3])
    const candidate = new Date(year, month, day)
    if (candidate.getFullYear() === year && candidate.getMonth() === month && candidate.getDate() === day) {
      return normalizeToMidnight(candidate)
    }
  }

  const usMatch = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(trimmed)
  if (usMatch && usMatch[1] && usMatch[2] && usMatch[3]) {
    const month = Number(usMatch[1]) - 1
    const day = Number(usMatch[2])
    const year = Number(usMatch[3])
    const candidate = new Date(year, month, day)
    if (candidate.getFullYear() === year && candidate.getMonth() === month && candidate.getDate() === day) {
      return normalizeToMidnight(candidate)
    }
  }

  const timestamp = Date.parse(trimmed)
  if (!isNaN(timestamp)) {
    const parsed = new Date(timestamp)
    return normalizeToMidnight(parsed)
  }

  return null
}

export const getDisplayValue = (
  value: DatePickerValue | undefined,
  mode: DatePickerMode,
  locale?: string,
  placeholder?: string
): string => {
  if (!value) return placeholder ?? (mode === 'range' ? 'Select date range' : 'Select date')

  if (mode === 'single') {
    if (value instanceof Date && isValidDate(value)) {
      return formatDate(value, locale)
    }
    return placeholder ?? 'Select date'
  }

  if (mode === 'range') {
    const range = value as DateRange
    const formatted = formatDateRange(range, locale)
    return formatted || (placeholder ?? 'Select date range')
  }

  if (mode === 'multiple') {
    const dates = (Array.isArray(value) ? value : []) as Date[]
    if (dates.length === 0) return placeholder ?? 'Select dates'
    if (dates.length === 1 && dates[0]) return formatDate(dates[0], locale)
    return `${dates.length} dates selected`
  }

  return placeholder ?? 'Select date'
}

export const getDefaultPresets = (mode: DatePickerMode = 'single'): DatePickerPreset[] => {
  const today = normalizeToMidnight(new Date())

  if (mode === 'range') {
    const thisMonthStart = startOfMonth(today)
    const thisMonthEnd = endOfMonth(today)
    const lastMonthDate = addDays(thisMonthStart, -1)
    const lastMonthStart = startOfMonth(lastMonthDate)
    const lastMonthEnd = endOfMonth(lastMonthDate)

    return [
      { label: 'Today', value: { from: today, to: today } },
      { label: 'Yesterday', value: { from: addDays(today, -1), to: addDays(today, -1) } },
      { label: 'Last 7 Days', value: { from: addDays(today, -6), to: today } },
      { label: 'Last 30 Days', value: { from: addDays(today, -29), to: today } },
      { label: 'This Month', value: { from: thisMonthStart, to: thisMonthEnd } },
      { label: 'Last Month', value: { from: lastMonthStart, to: lastMonthEnd } },
    ]
  }

  return [
    { label: 'Today', value: today },
    { label: 'Tomorrow', value: addDays(today, 1) },
    { label: 'In 3 Days', value: addDays(today, 3) },
    { label: 'In 1 Week', value: addDays(today, 7) },
    { label: 'In 2 Weeks', value: addDays(today, 14) },
  ]
}
