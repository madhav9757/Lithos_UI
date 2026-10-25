import type { PropItem } from '../../components/ui/PropsTable'

export const datePickerPropsData: PropItem[] = [
  {
    name: 'mode',
    type: '"single" | "range" | "multiple"',
    defaultValue: '"single"',
    description: 'Selection mode for the date picker.',
  },
  {
    name: 'value',
    type: 'DatePickerValue',
    description: 'Controlled selected date, date range, or date array.',
  },
  {
    name: 'defaultValue',
    type: 'DatePickerValue',
    description: 'Initial selected value in uncontrolled mode.',
  },
  {
    name: 'onChange',
    type: '(value: DatePickerValue) => void',
    description: 'Callback fired when the selected value changes.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Select date"',
    description: 'Placeholder string shown when no date is selected.',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Controlled open visibility state of the floating popover.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Initial open state in uncontrolled mode.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback fired when popover open state changes.',
  },
  {
    name: 'placement',
    type: 'Placement',
    defaultValue: '"bottom-start"',
    description: 'Floating placement alignment relative to the trigger.',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows an inline clear button when a date is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables user interaction and dims the trigger.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies error intent border and styling.',
  },
  {
    name: 'size',
    type: '"sm" | "default" | "md" | "lg"',
    defaultValue: '"default"',
    description: 'Size variant controlling trigger height and padding.',
  },
  {
    name: 'showPresets',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Displays quick date shortcut buttons inside the calendar popup.',
  },
  {
    name: 'presets',
    type: 'DatePickerPreset[]',
    description: 'Custom preset buttons list override.',
  },
  {
    name: 'minDate',
    type: 'Date',
    description: 'Earliest selectable date boundary.',
  },
  {
    name: 'maxDate',
    type: 'Date',
    description: 'Latest selectable date boundary.',
  },
  {
    name: 'disabledDates',
    type: '(Date | number)[]',
    description: 'Specific dates or day numbers to disable.',
  },
  {
    name: 'locale',
    type: 'string',
    description: 'BCP 47 language tag for localized date formatting.',
  },
  {
    name: 'portaled',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether the floating popover renders in a React portal.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS class names applied to the container.',
  },
]
