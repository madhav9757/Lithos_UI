import { useDatePicker, DatePickerContext } from './useDatePicker'
import { DatePickerInput } from './DatePickerInput'
import { DatePickerContent } from './DatePickerContent'
import { DatePickerPresets } from './DatePickerPresets'
import { Calendar } from '../calendar/Calendar'
import { cn } from '../../../utils/cn'
import type { DatePickerProps } from './date-picker.types'
import type { CalendarProps, CalendarValue } from '../calendar/calendar.types'

export const DatePicker = ({
  children,
  mode = 'single',
  value,
  defaultValue,
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  modal = false,
  closeOnSelect,
  locale,
  placeholder,
  disabled,
  invalid,
  size = 'default',
  clearable = false,
  showPresets = false,
  presets,
  portaled = true,
  minDate,
  maxDate,
  disabledDates,
  isDateDisabled,
  firstDayOfWeek = 0,
  month,
  defaultMonth,
  onMonthChange,
  yearRange,
  className,
}: DatePickerProps) => {
  const datePicker = useDatePicker({
    mode,
    defaultOpen,
    placement,
    modal,
    closeOnSelect,
    ...(value !== undefined && { value }),
    ...(defaultValue !== undefined && { defaultValue }),
    ...(onChange !== undefined && { onChange }),
    ...(open !== undefined && { open }),
    ...(onOpenChange !== undefined && { onOpenChange }),
    ...(locale !== undefined && { locale }),
  })

  const calendarProps: CalendarProps = {
    mode,
    value: datePicker.value as CalendarValue,
    onChange: (next) => datePicker.setValue(next as CalendarValue),
    ...(locale !== undefined && { locale }),
    ...(minDate !== undefined && { minDate }),
    ...(maxDate !== undefined && { maxDate }),
    ...(disabledDates !== undefined && { disabledDates }),
    ...(isDateDisabled !== undefined && { isDateDisabled }),
    ...(firstDayOfWeek !== undefined && { firstDayOfWeek }),
    ...(month !== undefined && { month }),
    ...(defaultMonth !== undefined && { defaultMonth }),
    ...(onMonthChange !== undefined && { onMonthChange }),
    ...(yearRange !== undefined && { yearRange }),
  }

  return (
    <DatePickerContext.Provider
      value={{
        ...datePicker,
        minDate,
        maxDate,
        disabled,
        invalid,
      }}
    >
      <div className={cn('relative inline-block w-full', className)}>
        {children ?? (
          <>
            <DatePickerInput
              size={size}
              clearable={clearable}
              {...(placeholder !== undefined && { placeholder })}
              {...(disabled !== undefined && { disabled })}
              {...(invalid !== undefined && { invalid })}
            />
            <DatePickerContent portaled={portaled}>
              {showPresets && <DatePickerPresets {...(presets !== undefined && { presets })} />}
              <Calendar {...calendarProps} />
            </DatePickerContent>
          </>
        )}
      </div>
    </DatePickerContext.Provider>
  )
}
