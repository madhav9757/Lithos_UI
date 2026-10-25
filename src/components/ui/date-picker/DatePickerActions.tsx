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
    <div
      className={cn(
        'flex items-center justify-between border-t-2 border-(--lithos-border) pt-3 mt-3 w-full',
        className
      )}
    >
      <span className="text-xs font-mono font-bold text-(--lithos-text) opacity-80">{summaryText}</span>

      <div className="flex items-center">
        <Button variant="outline" size="sm" type="button" onClick={handleCancel} className="mr-2 text-xs py-1 px-3">
          {cancelLabel}
        </Button>
        <Button variant="primary" size="sm" type="button" onClick={handleApply} className="text-xs py-1 px-3">
          {applyLabel}
        </Button>
      </div>
    </div>
  )
}
