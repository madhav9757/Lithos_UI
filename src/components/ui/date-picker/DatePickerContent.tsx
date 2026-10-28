import { type Ref } from 'react'
import { useMergeRefs, useTransitionStatus, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { useDatePickerContext } from './useDatePicker'
import { Calendar, CalendarContext } from '../calendar/Calendar'
import { cn } from '../../../utils/cn'
import type { DatePickerContentProps } from './date-picker.types'
import type { CalendarProps, CalendarValue } from '../calendar/calendar.types'

export const DatePickerContent = ({
  children,
  portaled = true,
  transitionDuration = 0,
  className,
  style,
  ref: propRef,
  ...props
}: DatePickerContentProps & { ref?: Ref<HTMLDivElement> | undefined }) => {
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

  const calendarProps: CalendarProps = {
    mode,
    value: value as CalendarValue,
    onChange: (next) => setValue(next as CalendarValue),
    bordered: false,
    className: 'w-full',
    ...(locale !== undefined && { locale }),
    ...(minDate !== undefined && { minDate }),
    ...(maxDate !== undefined && { maxDate }),
  }

  const content = (
    <FloatingFocusManager context={floatingContext} modal={modal}>
      <div
        ref={ref}
        style={{ ...floatingStyles, ...style }}
        data-status={status}
        aria-label="Choose date"
        className={cn(
          'z-(--lithos-z-popover) inline-block border-2 border-(--lithos-border) bg-(--lithos-surface) p-3 shadow-[4px_4px_0_0_var(--lithos-shadow)] text-(--lithos-text) outline-none rounded-(--lithos-radius) w-fit max-w-[calc(100vw-1rem)] overflow-x-auto',
          className
        )}
        {...getFloatingProps(props)}
      >
        <CalendarContext.Provider value={{ bordered: false }}>
          {children ?? <Calendar {...calendarProps} />}
        </CalendarContext.Provider>
      </div>
    </FloatingFocusManager>
  )

  if (!portaled) return content

  return <FloatingPortal>{content}</FloatingPortal>
}
