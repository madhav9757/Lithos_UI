import { useDatePicker, DatePickerContext } from './useDatePicker'
import { DatePickerInput } from './DatePickerInput'
import { DatePickerContent } from './DatePickerContent'
import { DatePickerPresets } from './DatePickerPresets'
import { Calendar } from '../calendar/Calendar'
import { cn } from '../../../utils/cn'
import type { DatePickerProps } from './date-picker.types'
import type { CalendarValue } from '../calendar/calendar.types'

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
    value,
    defaultValue,
    onChange,
    open,
    defaultOpen,
    onOpenChange,
    placement,
    modal,
    closeOnSelect,
    locale,
  })

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
              placeholder={placeholder}
              disabled={disabled}
              invalid={invalid}
              size={size}
              clearable={clearable}
            />
            <DatePickerContent>
              {showPresets && <DatePickerPresets presets={presets} />}
              <Calendar
                mode={mode}
                value={datePicker.value as CalendarValue}
                onChange={(next) => datePicker.setValue(next as CalendarValue)}
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                isDateDisabled={isDateDisabled}
                firstDayOfWeek={firstDayOfWeek}
                month={month}
                defaultMonth={defaultMonth}
                onMonthChange={onMonthChange}
                yearRange={yearRange}
              />
            </DatePickerContent>
          </>
        )}
      </div>
    </DatePickerContext.Provider>
  )
}
