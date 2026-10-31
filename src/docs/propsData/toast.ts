import type { PropItem } from '../../components/ui/PropsTable'

export const toastProviderPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The React node tree wrapped with the toast context.',
  },
  {
    name: 'duration',
    type: 'number | DurationObjType',
    defaultValue: '5000',
    description: 'Global duration in ms. Accepts a single number or an object with per-type values.',
  },
  {
    name: 'position',
    type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
    defaultValue: "'bottom-right'",
    description: 'Corner position on the viewport where toasts will stack.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the stack container.',
  },
]

export const toastPropsData: PropItem[] = [
  {
    name: 'message',
    type: 'ReactNode',
    description: 'Primary message text/content displayed inside the toast.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional headline text rendered at the top of the toast.',
  },
  {
    name: 'intent',
    type: '"default" | "success" | "error" | "warning" | "info" | "accent"',
    defaultValue: '"default"',
    description: 'Defines the structural intent and default styling variant.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: "'Close notification'",
    description: 'Accessible ARIA label applied to the toast close button.',
  },
  {
    name: 'color',
    type: 'HexColor | string',
    description: 'Custom inline CSS background or accent color variable.',
  },
  {
    name: 'duration',
    type: 'number',
    defaultValue: '5000',
    description: 'Custom lifetime in milliseconds for this specific toast, overriding the provider setting.',
  },
  {
    name: 'loading',
    type: 'ReactNode',
    defaultValue: 'Processing...',
    description: 'Message or content displayed while the asynchronous action is pending.',
  },
  {
    name: 'success',
    type: 'ReactNode',
    defaultValue: 'Done!',
    description: 'Message or content displayed when the asynchronous action resolves successfully.',
  },
  {
    name: 'error',
    type: 'ReactNode',
    defaultValue: 'Failed!',
    description: 'Message or content displayed if the asynchronous action throws an error.',
  },
  {
    name: 'action',
    type: '() => Promise<unknown>',
    description: 'Asynchronous action function executed when the async toast runs.',
  },
  {
    name: 'icon',
    type: 'ComponentType<unknown> | ReactNode',
    description: 'Custom icon component reference or rendered React element override.',
  },
]
