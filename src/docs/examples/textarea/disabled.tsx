import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { Textarea } from '../../../components/ui/Textarea'

export const DisabledTextareaExample = () => {
  return (
    <Field className="max-w-lg">
      <FieldLabel>Your message</FieldLabel>
      <Textarea disabled placeholder="Editing is unavailable." />
      <FieldDescription>Editing is unavailable. Disabled fields are excluded from form submission.</FieldDescription>
    </Field>
  )
}
