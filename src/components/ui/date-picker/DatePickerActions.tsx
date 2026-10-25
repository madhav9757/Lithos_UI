import { useDatePickerContext } from './useDatePicker'
import { getDayDifference, formatDayCount } from './date-picker.utils'
import { Button } from '../Button'
import { cn } from '../../../utils/cn'
import type { LithosClass } from '../../../utils/cn'
import type { DateRange } from '../calendar/calendar.types'

export interface DatePickerActionsProps {
  onApply?: (() => void) | undefined
  onCancel?: (() => void) | undefined
  className?: LithosClass | undefined
  applyLabel?: string | undefined
  cancelLabel?: string | undefined
}

export const DatePickerActions = ({
  onApply,
  onCancel,
  className,
  applyLabel = 'Apply',
  cancelLabel = 'Cancel',
}: DatePickerActionsProps) => {
  const { value, setOpen } = useDatePickerContext()
  const range = value && typeof value === 'object' && 'from' in value ? (value as DateRange) : { from: null, to: null }
  const count = getDayDifference(range.from, range.to)
  const summaryText = formatDayCount(count)

  const handleApply = () => {
    onApply?.()
    setOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setOpen(false)
  }

  return (
    <div className={cn('flex flex-col w-full max-w-[500px] mt-2', className)}>
      <div className="text-center py-1 text-xs font-mono font-bold text-(--lithos-text) opacity-80">{summaryText}</div>

      <div className="flex items-center justify-end border-t-2 border-(--lithos-border) pt-3 mt-2 w-full">
        <Button variant="secondary" type="button" onClick={handleCancel} className="mr-2 text-xs py-1.5 px-3">
          {cancelLabel}
        </Button>
        <Button variant="primary" type="button" onClick={handleApply} className="text-xs py-1.5 px-3">
          {applyLabel}
        </Button>
      </div>
    </div>
  )
}
