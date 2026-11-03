import type { PropItem } from '../../components/ui/PropsTable'

export const textareaPropsData: PropItem[] = [
  {
    name: 'variant',
    type: '"plain" | "outlined" | "soft" | "solid"',
    defaultValue: '"outlined"',
    description: 'Visual treatment, independent of validation, disabled, or required states.',
  },
  {
    name: 'size',
    type: '"sm" | "default" | "md" | "lg"',
    defaultValue: '"default"',
    description: 'Shared Input typography and padding scale; one-row minimum heights are 32/40/44/48px.',
  },
  {
    name: 'resize',
    type: '"none" | "vertical" | "horizontal" | "both"',
    defaultValue: '"vertical"',
    description:
      'Controls the native resize handle. Defaults to none with autoSize, otherwise vertical. Explicit resize works with autoSize.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies the error border and aria-invalid. Inline styles take precedence.',
  },
  {
    name: 'autoSize',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Uses native CSS content sizing to grow from one row, capped at 16rem. className can override the cap. Can be combined with resize; unsupported browsers keep a native textarea.',
  },
  {
    name: 'rows',
    type: 'number',
    defaultValue: '4 (1 with autoSize)',
    description: 'Native visible line count. With content sizing, rows is a fallback for unsupported browsers.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevents editing and removes the field from keyboard focus and form submission.',
  },
  { name: 'className', type: 'LithosClass', description: 'Custom classes merged with the base styles.' },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Uses native constraint validation to block empty form submission. Does not automatically set invalid.',
  },
  { name: 'ref', type: 'Ref<HTMLTextAreaElement>', description: 'Ref to the native textarea.' },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"textarea">',
    description:
      'Native attributes including value, defaultValue, onChange, name, required, maxLength, disabled and readOnly.',
  },
]
