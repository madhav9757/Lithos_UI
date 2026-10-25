import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DatePickerContent, DatePickerPresets } from '../../../components/ui/DatePicker'
import { Calendar } from '../../../components/ui/Calendar'
import { Button } from '../../../components/ui/Button'
import { formatDate } from '../../../components/ui/DatePicker'
import type { DatePickerValue } from '../../../components/ui/DatePicker'
import type { CalendarValue } from '../../../components/ui/calendar/calendar.types'

export const CompoundDatePicker = () => {
  const [date, setDate] = useState<DatePickerValue>(new Date())

  return (
    <DatePicker value={date} onChange={setDate}>
      <DatePickerTrigger asChild>
        <Button variant="secondary">Custom Trigger: {date instanceof Date ? formatDate(date) : 'Choose date'}</Button>
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerPresets />
        <Calendar mode="single" value={date as CalendarValue} onChange={(next) => setDate(next as DatePickerValue)} />
      </DatePickerContent>
    </DatePicker>
  )
}
