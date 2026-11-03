import { describe, it, expect } from 'vitest'
import {
  isValidDate,
  formatDate,
  formatDateNumeric,
  formatDateRange,
  formatDateInput,
  formatDateRangeInput,
  parseDateString,
  parseDateRangeString,
  getDisplayValue,
  getDefaultPresets,
} from '../../../components/ui/date-picker/date-picker.utils'

describe('DatePicker date-picker.utils', () => {
  it('identifies valid dates correctly', () => {
    expect(isValidDate(new Date(2026, 9, 25))).toBe(true)
    expect(isValidDate(new Date('invalid'))).toBe(false)
    expect(isValidDate(null)).toBe(false)
    expect(isValidDate(undefined)).toBe(false)
    expect(isValidDate('2026-10-25')).toBe(false)
  })

  it('formats dates consistently', () => {
    const date = new Date(2026, 9, 25)
    const formatted = formatDate(date, 'en-US')
    expect(formatted).toContain('2026')
    expect(formatted).toContain('25')

    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
    expect(formatDate(new Date('invalid'))).toBe('')
  })

  it('formats date ranges correctly', () => {
    const from = new Date(2026, 9, 10)
    const to = new Date(2026, 9, 15)

    expect(formatDateRange(null)).toBe('')
    expect(formatDateRange({ from, to: null }, 'en-US')).toBe(formatDate(from, 'en-US'))
    expect(formatDateRange({ from, to: from }, 'en-US')).toBe(formatDate(from, 'en-US'))

    const rangeFormatted = formatDateRange({ from, to }, 'en-US')
    expect(rangeFormatted).toContain(' - ')
    expect(rangeFormatted).toContain('2026')
  })

  it('parses valid date strings and rejects invalid inputs', () => {
    const iso = parseDateString('2026-10-25')
    expect(iso).not.toBeNull()
    expect(iso?.getFullYear()).toBe(2026)
    expect(iso?.getMonth()).toBe(9)
    expect(iso?.getDate()).toBe(25)

    const us = parseDateString('10/25/2026')
    expect(us).not.toBeNull()
    expect(us?.getFullYear()).toBe(2026)
    expect(us?.getMonth()).toBe(9)
    expect(us?.getDate()).toBe(25)

    const text = parseDateString('Aug 15, 2026')
    expect(text).not.toBeNull()
    expect(text?.getFullYear()).toBe(2026)
    expect(text?.getMonth()).toBe(7)
    expect(text?.getDate()).toBe(15)

    expect(parseDateString('')).toBeNull()
    expect(parseDateString('not-a-date')).toBeNull()
  })

  it('parses DD/MM/YYYY format with various delimiters', () => {
    const slashes = parseDateString('25/10/2026')
    expect(slashes).not.toBeNull()
    expect(slashes?.getDate()).toBe(25)
    expect(slashes?.getMonth()).toBe(9)
    expect(slashes?.getFullYear()).toBe(2026)

    const dashes = parseDateString('31-12-2026')
    expect(dashes).not.toBeNull()
    expect(dashes?.getDate()).toBe(31)
    expect(dashes?.getMonth()).toBe(11)
    expect(dashes?.getFullYear()).toBe(2026)

    const dots = parseDateString('15.04.2026')
    expect(dots).not.toBeNull()
    expect(dots?.getDate()).toBe(15)
    expect(dots?.getMonth()).toBe(3)
    expect(dots?.getFullYear()).toBe(2026)
  })

  it('formats date input with auto-slashes, limits length, and supports backspacing', () => {
    expect(formatDateInput('1')).toBe('1')
    expect(formatDateInput('12')).toBe('12/')
    expect(formatDateInput('120')).toBe('12/0')
    expect(formatDateInput('1205')).toBe('12/05/')
    expect(formatDateInput('12052026')).toBe('12/05/2026')
    expect(formatDateInput('1111111111111111111111111111111')).toBe('11/11/1111')

    expect(formatDateInput('12', '12/')).toBe('1')
    expect(formatDateInput('12/05', '12/05/')).toBe('12/0')
    expect(formatDateInput('12/05/202', '12/05/2026')).toBe('12/05/202')
    expect(formatDateInput('12/05/20', '12/05/202')).toBe('12/05/20')
  })

  it('formats date range input with auto-slashes and range separator', () => {
    expect(formatDateRangeInput('01012020')).toBe('01/01/2020 - ')
    expect(formatDateRangeInput('0101202005102026')).toBe('01/01/2020 - 05/10/2026')
    expect(formatDateRangeInput('01/01/2020 - 05/10/202', '01/01/2020 - 05/10/2026')).toBe('01/01/2020 - 05/10/202')
  })

  it('handles empty strings and whitespace properly', () => {
    expect(parseDateString('')).toBeNull()
    expect(parseDateString('   ')).toBeNull()
    expect(parseDateRangeString('')).toBeNull()
    expect(parseDateRangeString('   ')).toBeNull()
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
    expect(formatDateNumeric(null)).toBe('')
    expect(formatDateNumeric(undefined)).toBe('')
    expect(formatDateRange(null)).toBe('')
  })

  it('parses date range strings properly', () => {
    const range = parseDateRangeString('10/10/2026 - 15/10/2026')
    expect(range).not.toBeNull()
    expect(range?.from?.getDate()).toBe(10)
    expect(range?.to?.getDate()).toBe(15)

    const singleRange = parseDateRangeString('10/10/2026')
    expect(singleRange).not.toBeNull()
    expect(singleRange?.from?.getDate()).toBe(10)
    expect(singleRange?.to).toBeNull()

    expect(parseDateRangeString('')).toBeNull()
  })

  it('determines display values across modes', () => {
    expect(getDisplayValue(undefined, 'single', 'en-US', 'Custom Placeholder')).toBe('Custom Placeholder')
    expect(getDisplayValue(undefined, 'range', 'en-US')).toBe('Select date range')

    const date = new Date(2026, 9, 25)
    expect(getDisplayValue(date, 'single', 'en-US')).toContain('2026')

    const from = new Date(2026, 9, 10)
    const to = new Date(2026, 9, 20)
    expect(getDisplayValue({ from, to }, 'range', 'en-US')).toContain(' - ')

    expect(getDisplayValue([], 'multiple', 'en-US')).toBe('Select dates')
    expect(getDisplayValue([date], 'multiple', 'en-US')).toContain('2026')
    expect(getDisplayValue([from, to], 'multiple', 'en-US')).toBe('2 dates selected')
  })

  it('returns default presets for single and range modes', () => {
    const singlePresets = getDefaultPresets('single')
    expect(singlePresets.length).toBeGreaterThan(0)
    expect(singlePresets.some((p) => p.label === 'Today')).toBe(true)

    const rangePresets = getDefaultPresets('range')
    expect(rangePresets.length).toBeGreaterThan(0)
    expect(rangePresets.some((p) => p.label === 'Last 7 Days')).toBe(true)
    expect(rangePresets.some((p) => p.label === 'This Month')).toBe(true)
  })
})
