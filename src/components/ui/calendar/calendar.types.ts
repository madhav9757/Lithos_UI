/**
 * @fileoverview Lithos UI calendar type definitions and interfaces.
 * - Defines selection modes, date range payloads, and configuration props for the Calendar primitive.
 */
import type { HexColor, LithosElementProps } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'

/**
 * Selection mode behavior for the calendar component.
 */
export type CalendarMode = 'single' | 'multiple' | 'range' | 'rainbow'

/**
 * Structured date range payload with optional start and end endpoints.
 */
export interface DateRange {
  /** Start date of the range. */
  from: Date | null

  /** End date of the range. */
  to: Date | null
}

/**
 * Value union representing the selected state across different calendar modes.
 */
export type CalendarValue = Date | null | Date[] | DateRange

/**
 * Props for the root `Calendar` component.
 */
export interface CalendarProps extends Omit<LithosElementProps<'div'>, 'defaultValue' | 'onChange'> {
  /**
   * Selection mode behavior.
   * @default 'single'
   */
  mode?: CalendarMode

  /**
   * Controlled selected date value.
   */
  value?: CalendarValue

  /**
   * Uncontrolled initial selected date value.
   */
  defaultValue?: CalendarValue

  /**
   * Callback function triggered when the selection value changes.
   */
  onChange?: (value: CalendarValue) => void

  /**
   * Controlled displayed month date.
   */
  month?: Date

  /**
   * Uncontrolled initial displayed month date.
   */
  defaultMonth?: Date

  /**
   * Callback function triggered when the displayed month changes.
   */
  onMonthChange?: (month: Date) => void

  /**
   * Minimum selectable date limit.
   */
  minDate?: Date

  /**
   * Maximum selectable date limit.
   */
  maxDate?: Date

  /**
   * Array of disabled specific dates or day numbers.
   */
  disabledDates?: (Date | number)[]

  /**
   * Custom validation function to determine if a specific date should be disabled.
   */
  isDateDisabled?: (date: Date) => boolean

  /**
   * Mode='multiple' only — assigns distinct colors per group of selected dates (e.g. leave types).
   */
  dateColors?: { dates: (Date | number)[]; color: HexColor | string }[]

  /**
   * Index of the first day of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6

  /**
   * Locale string for formatting month and weekday labels.
   */
  locale?: string

  /**
   * Minimum and maximum year range bounds for the year selector dropdown.
   */
  yearRange?: [number, number]
  /**
   * Whether to render the outer border, surface background, padding, and brutalist shadow around the calendar container.
   * @default true
   */
  bordered?: boolean

  /**
   * Granular custom CSS class overrides for internal calendar structural sub-elements.
   */
  classes?: {
    container?: LithosClass
    header?: LithosClass
    nav?: LithosClass
    monthSelect?: LithosClass
    yearSelect?: LithosClass
    weekdays?: LithosClass
    grid?: LithosClass
    cell?: LithosClass
    day?: LithosClass
  }
}
