import type { PropItem } from '../../components/ui/PropsTable'

export const calendarPropsData: PropItem[] = [
  {
    name: 'mode',
    type: '"single" | "multiple" | "range" | "rainbow"',
    defaultValue: '"single"',
    description: 'Selection mode for the calendar.',
  },
  {
    name: 'value',
    type: 'CalendarValue',
    description: 'Controlled selected date(s).',
  },
  {
    name: 'defaultValue',
    type: 'CalendarValue',
    description: 'Initial selected date(s).',
  },
  {
    name: 'onChange',
    type: '(value: CalendarValue) => void',
    description: 'Callback when selection changes.',
  },
  {
    name: 'month',
    type: 'Date',
    description: 'Controlled displayed month.',
  },
  {
    name: 'defaultMonth',
    type: 'Date',
    description: 'Initial displayed month.',
  },
  {
    name: 'onMonthChange',
    type: '(month: Date) => void',
    description: 'Callback when month changes.',
  },
  {
    name: 'minDate',
    type: 'Date',
    description: 'Minimum selectable date.',
  },
  {
    name: 'maxDate',
    type: 'Date',
    description: 'Maximum selectable date.',
  },
  {
    name: 'disabledDates',
    type: '(Date | number)[]',
    description: 'Specific dates that cannot be selected.',
  },
  {
    name: 'isDateDisabled',
    type: '(date: Date) => boolean',
    description: 'Callback to determine if a date should be disabled.',
  },
  {
    name: 'dateColors',
    type: '{ dates: (Date | number)[], color: HexColor | string }[]',
    description: 'Assigns distinct colors per group of selected dates (e.g. leave types).',
  },
  {
    name: 'firstDayOfWeek',
    type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '0',
    description: 'First day of the week (0 = Sunday, 1 = Monday, etc).',
  },
  {
    name: 'locale',
    type: 'string',
    description: 'Locale string for date formatting.',
  },
  {
    name: 'yearRange',
    type: '[number, number]',
    description: 'Min and max year range in the year dropdown.',
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether to show the outer brutalist border and shadow. Automatically false inside DatePickerContent.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes applied to the calendar container.',
  },
  {
    name: 'classes',
    type: '{ [key in "container" | "header" | "nav" | "monthSelect" | "yearSelect" | "weekdays" | "grid" | "cell" | "day"]?: LithosClass }',
    description: 'Custom class overrides for calendar internal elements.',
  },
]
