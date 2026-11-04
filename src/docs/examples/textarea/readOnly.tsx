import { Textarea, Field, FieldLabel, FieldDescription } from '../../../components/ui/Textarea'

export const ReadOnlyTextareaExample = () => (
  <Field className="max-w-lg">
    <FieldLabel>Read only</FieldLabel>
    <Textarea readOnly defaultValue="You can select and copy this text." />
    <FieldDescription>Read-only fields remain focusable and are included in form submission.</FieldDescription>
  </Field>
)
