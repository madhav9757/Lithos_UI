import type { ReactNode } from 'react'
import type { Placement } from '@floating-ui/react'
import type { DateRange, CalendarProps } from '../calendar/calendar.types'
import type { LithosClass } from '../../../utils/cn'

export type DatePickerMode = 'single' | 'range' | 'multiple'

export type DatePickerValue = Date | DateRange | Date[] | null

export interface DatePickerPreset {
  label: string
  value: DatePickerValue
}

export interface UseDatePickerOptions {
  mode?: DatePickerMode
  value?: DatePickerValue
  defaultValue?: DatePickerValue
  onChange?: (value: DatePickerValue) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  modal?: boolean
  closeOnSelect?: boolean
  locale?: string
}

export interface DatePickerContextValue {
  mode: DatePickerMode
  value: DatePickerValue | undefined
  setValue: (value: DatePickerValue) => void
  open: boolean
  setOpen: (open: boolean) => void
  locale?: string
  closeOnSelect: boolean
  triggerRef: (node: HTMLElement | null) => void
  floatingRef: (node: HTMLElement | null) => void
  floatingStyles: React.CSSProperties
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  invalid?: boolean
  modal: boolean
}

export interface DatePickerTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: LithosClass
}

export type DatePickerInputSizes = 'default' | 'sm' | 'md' | 'lg'

export interface DatePickerInputProps {
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: DatePickerInputSizes
  clearable?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  className?: LithosClass
  'aria-label'?: string
}

export interface DatePickerContentProps {
  children?: ReactNode
  portaled?: boolean
  transitionDuration?: number
  className?: LithosClass
}

export interface DatePickerPresetsProps {
  presets?: DatePickerPreset[]
  className?: LithosClass
  onSelectPreset?: (preset: DatePickerPreset) => void
}

export interface DatePickerProps
  extends
    UseDatePickerOptions,
    Omit<CalendarProps, 'value' | 'defaultValue' | 'onChange' | 'mode' | 'classes' | 'className'> {
  children?: ReactNode
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: DatePickerInputSizes
  clearable?: boolean
  showPresets?: boolean
  presets?: DatePickerPreset[]
  className?: LithosClass
}
