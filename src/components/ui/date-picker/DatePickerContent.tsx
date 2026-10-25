import { type Ref } from 'react'
import { useMergeRefs, useTransitionStatus, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { useDatePickerContext } from './useDatePicker'
import { Calendar } from '../calendar/Calendar'
import { cn } from '../../../utils/cn'
import type { DatePickerContentProps } from './date-picker.types'
import type { CalendarValue } from '../calendar/calendar.types'

export const DatePickerContent = ({
  children,
  portaled = true,
  transitionDuration = 0,
  className,
  style,
  ref: propRef,
  ...props
}: DatePickerContentProps & { ref?: Ref<HTMLDivElement> }) => {
  const {
    floatingRef,
    floatingStyles,
    floatingContext,
    getFloatingProps,
    modal,
    mode,
    value,
    setValue,
    locale,
    minDate,
    maxDate,
  } = useDatePickerContext()

  const ref = useMergeRefs([floatingRef, propRef])

  const { isMounted, status } = useTransitionStatus(floatingContext, {
    duration: transitionDuration,
  })

  if (!isMounted) return null

  const content = (
    <FloatingFocusManager context={floatingContext} modal={modal}>
      <div
        ref={ref}
        style={{ ...floatingStyles, ...style }}
        data-status={status}
        aria-label="Choose date"
        className={cn(
          'z-(--lithos-z-popover) inline-block border-2 border-(--lithos-border) bg-(--lithos-surface) p-3 shadow-[4px_4px_0_0_var(--lithos-shadow)] text-(--lithos-text) outline-none rounded-(--lithos-radius)',
          className
        )}
        {...getFloatingProps(props)}
      >
        {children ?? (
          <Calendar
            mode={mode}
            value={value as CalendarValue}
            onChange={(next) => setValue(next as CalendarValue)}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
      </div>
    </FloatingFocusManager>
  )

  if (!portaled) return content

  return <FloatingPortal>{content}</FloatingPortal>
}
