import type { ReactNode } from 'react'
import type { Placement, FloatingContext } from '@floating-ui/react'
import type { DateRange, CalendarProps } from '../calendar/calendar.types'
import type { LithosClass } from '../../../utils/cn'

export type DatePickerMode = 'single' | 'range' | 'multiple'

export type DatePickerValue = Date | DateRange | Date[] | null

export interface DatePickerPreset {
  label: string
  value: DatePickerValue
}

export interface UseDatePickerOptions {
  mode?: DatePickerMode | undefined
  value?: DatePickerValue | undefined
  defaultValue?: DatePickerValue | undefined
  onChange?: ((value: DatePickerValue) => void) | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  placement?: Placement | undefined
  modal?: boolean | undefined
  closeOnSelect?: boolean | undefined
  locale?: string | undefined
}

export interface DatePickerContextValue {
  mode: DatePickerMode
  value: DatePickerValue | undefined
  setValue: (value: DatePickerValue) => void
  open: boolean
  setOpen: (open: boolean) => void
  locale?: string | undefined
  closeOnSelect: boolean
  triggerRef: (node: HTMLElement | null) => void
  floatingRef: (node: HTMLElement | null) => void
  floatingStyles: React.CSSProperties
  floatingContext: FloatingContext
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>
  minDate?: Date | undefined
  maxDate?: Date | undefined
  disabled?: boolean | undefined
  invalid?: boolean | undefined
  modal: boolean
}

export interface DatePickerTriggerProps {
  children: ReactNode
  asChild?: boolean | undefined
  className?: LithosClass | undefined
}

export type DatePickerInputSizes = 'default' | 'sm' | 'md' | 'lg'

export interface DatePickerInputProps {
  placeholder?: string | undefined
  disabled?: boolean | undefined
  invalid?: boolean | undefined
  size?: DatePickerInputSizes | undefined
  clearable?: boolean | undefined
  startAdornment?: ReactNode | undefined
  endAdornment?: ReactNode | undefined
  className?: LithosClass | undefined
  'aria-label'?: string | undefined
}

export interface DatePickerContentProps {
  children?: ReactNode | undefined
  portaled?: boolean | undefined
  transitionDuration?: number | undefined
  className?: LithosClass | undefined
  style?: React.CSSProperties | undefined
}

export interface DatePickerPresetsProps {
  presets?: DatePickerPreset[] | undefined
  className?: LithosClass | undefined
  onSelectPreset?: ((preset: DatePickerPreset) => void) | undefined
}

export interface DatePickerProps
  extends
    UseDatePickerOptions,
    Omit<CalendarProps, 'value' | 'defaultValue' | 'onChange' | 'mode' | 'classes' | 'className' | 'locale'> {
  children?: ReactNode | undefined
  placeholder?: string | undefined
  disabled?: boolean | undefined
  invalid?: boolean | undefined
  size?: DatePickerInputSizes | undefined
  clearable?: boolean | undefined
  showPresets?: boolean | undefined
  presets?: DatePickerPreset[] | undefined
  portaled?: boolean | undefined
  className?: LithosClass | undefined
}
