import { useState } from 'react'
import { DatePicker } from '../../../components/ui/DatePicker'
import type { DatePickerValue } from '../../../components/ui/DatePicker'

export const ClearableDatePicker = () => {
  const [date, setDate] = useState<DatePickerValue>(new Date())

  return <DatePicker value={date} onChange={setDate} clearable placeholder="Clearable date selection" />
}
