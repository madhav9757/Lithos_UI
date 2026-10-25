/**
 * @fileoverview Zero-dependency date formatting, parsing, and preset utilities for DatePicker.
 * Relies strictly on native Date and Intl.DateTimeFormat to avoid external date libraries.
 */

import { isSameDay, normalizeToMidnight, addDays, startOfMonth, endOfMonth } from '../../../utils/date'
import type { DateRange } from '../calendar/calendar.types'
import type { DatePickerMode, DatePickerValue, DatePickerPreset } from './date-picker.types'

/**
 * Checks whether an unknown value is a valid, non-NaN Date instance.
 *
 * @param date - Value to inspect.
 * @returns True if valid Date object.
 */
export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Formats a Date instance into a human-readable localized string.
 *
 * @param date - Date to format.
 * @param locale - BCP 47 language tag (e.g., 'en-US').
 * @param options - Custom Intl.DateTimeFormatOptions.
 * @returns Formatted date string, or empty string if date is null/undefined/invalid.
 */
export const formatDate = (
  date: Date | null | undefined,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string => {
  if (!date || !isValidDate(date)) return ''
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Formats a date range into a localized label (e.g., "Oct 12, 2026 - Oct 19, 2026").
 *
 * @param range - DateRange containing from and to dates.
 * @param locale - BCP 47 language tag.
 * @returns Formatted range string.
 */
export const formatDateRange = (range: DateRange | null | undefined, locale?: string): string => {
  if (!range || !range.from) return ''
  const fromFormatted = formatDate(range.from, locale)
  if (!range.to) return fromFormatted
  if (isSameDay(range.from, range.to)) return fromFormatted
  const toFormatted = formatDate(range.to, locale)
  return `${fromFormatted} - ${toFormatted}`
}

/**
 * Parses user input strings into a valid Date object.
 * Supports ISO (YYYY-MM-DD), common slashes (MM/DD/YYYY or YYYY/MM/DD), and standard Date parseable strings.
 *
 * @param input - Raw date string entered by user.
 * @returns Parsed Date instance normalized to midnight, or null if unparseable/invalid.
 */
export const parseDateString = (input: string): Date | null => {
  const trimmed = input.trim()
  if (!trimmed) return null

  // ISO format check: YYYY-MM-DD
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

  // Common US format: MM/DD/YYYY
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

  // Fallback to native Date parser
  const timestamp = Date.parse(trimmed)
  if (!isNaN(timestamp)) {
    const parsed = new Date(timestamp)
    return normalizeToMidnight(parsed)
  }

  return null
}

/**
 * Returns formatted display text for the DatePicker trigger or input element.
 *
 * @param value - Selected Date, DateRange, or Date[].
 * @param mode - DatePickerMode ('single' | 'range' | 'multiple').
 * @param locale - BCP 47 locale.
 * @param placeholder - Custom fallback text when no date is selected.
 * @returns Display string.
 */
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

/**
 * Generates built-in quick date selection presets for single and range modes.
 *
 * @param mode - Active selection mode ('single' or 'range').
 * @returns Array of default date presets with labels and values.
 */
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
