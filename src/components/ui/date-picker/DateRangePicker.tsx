import { DatePicker } from './DatePicker'
import type { DatePickerProps } from './date-picker.types'

export const DateRangePicker = (props: Omit<DatePickerProps, 'variant'>) => {
  return <DatePicker variant="dual" {...props} />
}
