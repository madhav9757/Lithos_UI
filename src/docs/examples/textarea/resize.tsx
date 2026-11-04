import { Textarea, Field, FieldLabel, FieldDescription } from '../../../components/ui/Textarea'

export const ResizeTextareaExample = () => (
  <Field className="max-w-lg">
    <FieldLabel>Your message</FieldLabel>
    <Textarea resize="vertical" rows={2} placeholder="Drag the resize handle..." />
    <FieldDescription>Drag the handle to resize the field vertically.</FieldDescription>
  </Field>
)
