import { useState } from 'react'
import { DateField } from '../../../components/ui/DatePicker'

export const ControlledDateFieldExample = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <div className="flex justify-center py-4 w-full">
      <DateField label="Controlled picker" placeholder="DD/MM/YYYY" value={date} onChange={setDate} clearable />
    </div>
  )
}
