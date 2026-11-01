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
  return `${month}/${day}/${year}`
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
    if (year >= 1000 && year <= 9999) {
      const candidate = new Date(year, month, day)
      if (candidate.getFullYear() === year && candidate.getMonth() === month && candidate.getDate() === day) {
        return normalizeToMidnight(candidate)
      }
    }
  }

  const partsMatch = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(trimmed)
  if (partsMatch && partsMatch[1] && partsMatch[2] && partsMatch[3]) {
    const first = Number(partsMatch[1])
    const second = Number(partsMatch[2])
    const year = Number(partsMatch[3])

    if (year >= 1000 && year <= 9999) {
      if (first >= 1 && first <= 12 && second >= 1 && second <= 31) {
        const candidateMDY = new Date(year, first - 1, second)
        if (
          candidateMDY.getFullYear() === year &&
          candidateMDY.getMonth() === first - 1 &&
          candidateMDY.getDate() === second
        ) {
          return normalizeToMidnight(candidateMDY)
        }
      }

      if (second >= 1 && second <= 12 && first >= 1 && first <= 31) {
        const candidateDMY = new Date(year, second - 1, first)
        if (
          candidateDMY.getFullYear() === year &&
          candidateDMY.getMonth() === second - 1 &&
          candidateDMY.getDate() === first
        ) {
          return normalizeToMidnight(candidateDMY)
        }
      }
    }
  }

  const rawDigits = /^(\d{2})(\d{2})(\d{4})$/.exec(trimmed)
  if (rawDigits && rawDigits[1] && rawDigits[2] && rawDigits[3]) {
    const first = Number(rawDigits[1])
    const second = Number(rawDigits[2])
    const year = Number(rawDigits[3])

    if (year >= 1000 && year <= 9999) {
      if (first >= 1 && first <= 12 && second >= 1 && second <= 31) {
        const candidateMDY = new Date(year, first - 1, second)
        if (
          candidateMDY.getFullYear() === year &&
          candidateMDY.getMonth() === first - 1 &&
          candidateMDY.getDate() === second
        ) {
          return normalizeToMidnight(candidateMDY)
        }
      }

      if (second >= 1 && second <= 12 && first >= 1 && first <= 31) {
        const candidateDMY = new Date(year, second - 1, first)
        if (
          candidateDMY.getFullYear() === year &&
          candidateDMY.getMonth() === second - 1 &&
          candidateDMY.getDate() === first
        ) {
          return normalizeToMidnight(candidateDMY)
        }
      }
    }
  }

  const textMatch = /^[a-zA-Z]+\s+\d{1,2},?\s+(\d{4})$/.exec(trimmed)
  if (textMatch && textMatch[1]) {
    const timestamp = Date.parse(trimmed)
    if (!isNaN(timestamp)) {
      const parsed = new Date(timestamp)
      if (parsed.getFullYear() >= 1000 && parsed.getFullYear() <= 9999) {
        return normalizeToMidnight(parsed)
      }
    }
  }

  return null
}

export const formatDateInput = (input: string, prevInput?: string): string => {
  if (!input) return ''
  const isDeleting = Boolean(prevInput && input.length < prevInput.length)
  if (isDeleting) {
    if (prevInput && prevInput.endsWith('/') && input === prevInput.slice(0, -1)) {
      return input.slice(0, -1)
    }
    return input.replace(/[^\d/]/g, '').slice(0, 10)
  }

  const endsWithSlash = input.endsWith('/')
  const digits = input.replace(/\D/g, '').slice(0, 8)
  if (!digits) return ''

  if (digits.length <= 2) {
    if (digits.length === 1 && endsWithSlash) {
      return `0${digits}/`
    }
    if (digits.length === 2) {
      return `${digits}/`
    }
    return digits
  }

  if (digits.length <= 4) {
    const month = digits.slice(0, 2)
    const day = digits.slice(2)
    if (day.length === 1 && endsWithSlash) {
      return `${month}/0${day}/`
    }
    if (digits.length === 4) {
      return `${month}/${day}/`
    }
    return `${month}/${day}`
  }

  const month = digits.slice(0, 2)
  const day = digits.slice(2, 4)
  const year = digits.slice(4, 8)
  return `${month}/${day}/${year}`
}

export const formatDateRangeInput = (input: string, prevInput?: string): string => {
  if (!input) return ''
  const isDeleting = Boolean(prevInput && input.length < prevInput.length)
  if (isDeleting) {
    if (prevInput && prevInput.endsWith(' - ') && input === prevInput.slice(0, -3)) {
      return input
    }
    return input.slice(0, 23)
  }

  if (input.includes(' - ')) {
    const [fromPart = '', toPart = ''] = input.split(' - ')
    const formattedFrom = formatDateInput(fromPart, prevInput?.split(' - ')[0])
    const formattedTo = formatDateInput(toPart, prevInput?.split(' - ')[1])
    return formattedTo ? `${formattedFrom} - ${formattedTo}` : `${formattedFrom} - `
  }

  const digits = input.replace(/\D/g, '')
  if (digits.length > 8) {
    const fromDigits = digits.slice(0, 8)
    const toDigits = digits.slice(8, 16)
    const formattedFrom = formatDateInput(fromDigits)
    const formattedTo = formatDateInput(toDigits)
    return formattedTo ? `${formattedFrom} - ${formattedTo}` : `${formattedFrom} - `
  }

  const formatted = formatDateInput(input, prevInput)
  if (digits.length === 8 && input.length > (prevInput?.length ?? 0)) {
    return `${formatted} - `
  }
  return formatted
}

export const parseDateRangeString = (input: string): DateRange | null => {
  const trimmed = input.trim()
  if (!trimmed) return null
  const parts = trimmed.split(/\s*-\s*|\s+to\s+/i)
  if (parts.length === 2 && parts[0] && parts[1]) {
    const from = parseDateString(parts[0])
    const to = parseDateString(parts[1])
    if (from && to) {
      return { from, to }
    }
    if (from) {
      return { from, to: null }
    }
  } else if (parts.length === 1 && parts[0]) {
    const from = parseDateString(parts[0])
    if (from) {
      return { from, to: null }
    }
  }
  return null
}

export const getDisplayValue = (
  value: DatePickerValue | undefined,
  mode: DatePickerMode,
  locale?: string,
  placeholder?: string
): string => {
  if (!value) return placeholder ?? (mode === 'range' ? 'Select date range' : 'MM/DD/YYYY')

  if (mode === 'single') {
    if (value instanceof Date && isValidDate(value)) {
      return formatDate(value, locale)
    }
    return placeholder ?? 'MM/DD/YYYY'
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

  return placeholder ?? 'MM/DD/YYYY'
}

export const getDefaultPresets = (mode: DatePickerMode = 'single'): DatePickerPreset[] => {
  const today = normalizeToMidnight(new Date())

  if (mode === 'range') {
    const thisMonthStart = startOfMonth(today)
    const thisMonthEnd = endOfMonth(today)

    return [
      {
        label: 'Today',
        value: { from: today, to: today },
      },
      {
        label: 'Last 7 Days',
        value: { from: addDays(today, -6), to: today },
      },
      {
        label: 'Last 30 Days',
        value: { from: addDays(today, -29), to: today },
      },
      {
        label: 'This Month',
        value: { from: thisMonthStart, to: thisMonthEnd },
      },
    ]
  }

  return [
    {
      label: 'Today',
      value: today,
    },
    {
      label: 'Tomorrow',
      value: addDays(today, 1),
    },
    {
      label: 'Next Week',
      value: addDays(today, 7),
    },
  ]
}
