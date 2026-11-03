import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { Textarea } from '../../../components/ui/Textarea'

export const RequiredTextareaExample = () => (
  <Field className="max-w-lg">
    <FieldLabel>Description *</FieldLabel>
    <Textarea name="description" required placeholder="Enter a description..." />
    <FieldDescription>A description is required.</FieldDescription>
  </Field>
)
