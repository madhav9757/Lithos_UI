/**
 * @fileoverview Lithos UI calendar type definitions and interfaces.
 * - Defines selection modes, date range payloads, and configuration props for the Calendar primitive.
 */
import type { HexColor, LithosElementProps } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'

export type CalendarMode = 'single' | 'multiple' | 'range' | 'rainbow'

export interface DateRange {
  from: Date | null
  to: Date | null
}

export type CalendarValue = Date | null | Date[] | DateRange

export interface CalendarProps extends Omit<LithosElementProps<'div'>, 'defaultValue' | 'onChange'> {
  mode?: CalendarMode
  value?: CalendarValue
  defaultValue?: CalendarValue
  onChange?: (value: CalendarValue) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: (Date | number)[]
  isDateDisabled?: (date: Date) => boolean
  dateColors?: { dates: (Date | number)[]; color: HexColor | string }[]
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  yearRange?: [number, number]
  bordered?: boolean
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
