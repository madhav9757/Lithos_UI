import { useState, useMemo, useCallback, createContext, useContext } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react'
import type { UseDatePickerOptions, DatePickerContextValue, DatePickerValue } from './date-picker.types'
import type { DateRange } from '../calendar/calendar.types'

export const DatePickerContext = createContext<DatePickerContextValue | null>(null)

export const useDatePickerContext = (): DatePickerContextValue => {
  const context = useContext(DatePickerContext)
  if (!context) {
    throw new Error('DatePicker compound components must be rendered within a <DatePicker /> container.')
  }
  return context
}

export const useDatePicker = ({
  mode = 'single',
  value: controlledValue,
  defaultValue,
  onChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  modal = false,
  closeOnSelect,
  locale,
}: UseDatePickerOptions = {}): DatePickerContextValue => {
  const isValueControlled = controlledValue !== undefined
  const [localValue, setLocalValue] = useState<DatePickerValue>(() => defaultValue ?? null)
  const value = isValueControlled ? controlledValue : localValue

  const shouldCloseOnSelect = closeOnSelect ?? (mode === 'single' || mode === 'range')

  const isOpenControlled = controlledOpen !== undefined
  const [localOpen, setLocalOpen] = useState<boolean>(defaultOpen)
  const open = isOpenControlled ? controlledOpen! : localOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setLocalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isOpenControlled, onOpenChange]
  )

  const setValue = useCallback(
    (nextValue: DatePickerValue) => {
      if (!isValueControlled) {
        setLocalValue(nextValue)
      }
      onChange?.(nextValue)

      if (shouldCloseOnSelect) {
        if (mode === 'single' && nextValue !== null) {
          setOpen(false)
        } else if (mode === 'range') {
          const range = nextValue as DateRange | null
          if (range?.from && range?.to) {
            setOpen(false)
          }
        }
      }
    },
    [isValueControlled, onChange, shouldCloseOnSelect, mode, setOpen]
  )

  const floating = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ fallbackAxisSideDirection: 'end' }), shift({ padding: 8 })],
  })

  const click = useClick(floating.context)
  const dismiss = useDismiss(floating.context)
  const role = useRole(floating.context, { role: 'dialog' })

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      mode,
      value,
      setValue,
      open,
      setOpen,
      locale,
      closeOnSelect: shouldCloseOnSelect,
      triggerRef: floating.refs.setReference,
      floatingRef: floating.refs.setFloating,
      floatingStyles: floating.floatingStyles,
      floatingContext: floating.context,
      getReferenceProps: interactions.getReferenceProps,
      getFloatingProps: interactions.getFloatingProps,
      modal,
    }),
    [
      mode,
      value,
      setValue,
      open,
      setOpen,
      locale,
      shouldCloseOnSelect,
      floating.refs.setReference,
      floating.refs.setFloating,
      floating.floatingStyles,
      floating.context,
      interactions.getReferenceProps,
      interactions.getFloatingProps,
      modal,
    ]
  )
}
