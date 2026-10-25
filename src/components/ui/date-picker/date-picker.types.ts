/**
 * @fileoverview Type definitions and prop interfaces for the Lithos UI DatePicker primitive.
 */

import type { ReactNode } from 'react'
import type { Placement } from '@floating-ui/react'
import type { DateRange, CalendarProps } from '../calendar/calendar.types'
import type { LithosClass } from '../../../utils/cn'

/** Supported selection modes for the DatePicker. */
export type DatePickerMode = 'single' | 'range' | 'multiple'

/** Value types accepted and emitted by the DatePicker depending on mode. */
export type DatePickerValue = Date | DateRange | Date[] | null

/** Quick selection preset option definition. */
export interface DatePickerPreset {
  /** Human-readable button label (e.g., 'Today', 'Last 7 Days'). */
  label: string
  /** The value applied when this preset is clicked. */
  value: DatePickerValue
}

/** Configuration options for the internal useDatePicker hook. */
export interface UseDatePickerOptions {
  /** Selection mode: 'single' (default), 'range', or 'multiple'. */
  mode?: DatePickerMode
  /** Controlled value. */
  value?: DatePickerValue
  /** Uncontrolled default value. */
  defaultValue?: DatePickerValue
  /** Callback fired when the selected value changes. */
  onChange?: (value: DatePickerValue) => void
  /** Controlled open state of the floating popover. */
  open?: boolean
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Floating UI popover placement relative to the trigger. */
  placement?: Placement
  /** Whether the popover behaves as a modal dialog trapping focus. */
  modal?: boolean
  /** Whether to close popover automatically upon completing a valid date selection. */
  closeOnSelect?: boolean
  /** BCP 47 language tag for date formatting. */
  locale?: string
}

/** Return shape of the useDatePicker hook provided via Context. */
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
}

/** Props for the DatePickerTrigger component. */
export interface DatePickerTriggerProps {
  /** Child elements, or a single element when `asChild` is true. */
  children: ReactNode
  /** When true, clones the child element and merges trigger props onto it. */
  asChild?: boolean
  /** Additional CSS classes. */
  className?: LithosClass
}

/** Sizing variants for DatePickerInput. */
export type DatePickerInputSizes = 'default' | 'sm' | 'md' | 'lg'

/** Props for the DatePickerInput component. */
export interface DatePickerInputProps {
  /** Placeholder text shown when no date is selected. */
  placeholder?: string
  /** Whether the field is disabled. */
  disabled?: boolean
  /** Applies invalid styling and error border. */
  invalid?: boolean
  /** Input height and padding sizing scale. */
  size?: DatePickerInputSizes
  /** Whether to display a clear button when a value is selected. */
  clearable?: boolean
  /** Custom leading adornment (defaults to IconCalendar). */
  startAdornment?: ReactNode
  /** Custom trailing adornment. */
  endAdornment?: ReactNode
  /** Additional CSS classes. */
  className?: LithosClass
  /** Accessible label. */
  'aria-label'?: string
}

/** Props for the DatePickerContent floating popover surface. */
export interface DatePickerContentProps {
  /** Custom child content. If omitted, renders default Calendar & Presets. */
  children?: ReactNode
  /** Whether to render inside a React Portal (defaults to true). */
  portaled?: boolean
  /** Duration of transition animation in ms. */
  transitionDuration?: number
  /** Additional CSS classes. */
  className?: LithosClass
}

/** Props for the DatePickerPresets component. */
export interface DatePickerPresetsProps {
  /** Custom list of presets. If omitted, built-in presets for current mode are used. */
  presets?: DatePickerPreset[]
  /** Additional CSS classes for the container. */
  className?: LithosClass
  /** Callback fired when a preset is chosen. */
  onSelectPreset?: (preset: DatePickerPreset) => void
}

/** Props for the high-level / compound DatePicker component. */
export interface DatePickerProps
  extends
    UseDatePickerOptions,
    Omit<CalendarProps, 'value' | 'defaultValue' | 'onChange' | 'mode' | 'classes' | 'className'> {
  /** Children for compound composition. If omitted, turnkey input and calendar are rendered. */
  children?: ReactNode
  /** Placeholder text for turnkey trigger input. */
  placeholder?: string
  /** Whether the turnkey input is disabled. */
  disabled?: boolean
  /** Whether the turnkey input displays invalid styling. */
  invalid?: boolean
  /** Turnkey input sizing variant. */
  size?: DatePickerInputSizes
  /** Whether the turnkey input has a clear button. */
  clearable?: boolean
  /** Whether to show quick preset buttons inside the calendar popup. */
  showPresets?: boolean
  /** Custom preset list. */
  presets?: DatePickerPreset[]
  /** Custom classes for root container. */
  className?: LithosClass
}
