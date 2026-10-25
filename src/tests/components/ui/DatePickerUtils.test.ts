import { describe, it, expect } from 'vitest'
import {
  isValidDate,
  formatDate,
  formatDateRange,
  parseDateString,
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

    expect(parseDateString('')).toBeNull()
    expect(parseDateString('not-a-date')).toBeNull()
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
