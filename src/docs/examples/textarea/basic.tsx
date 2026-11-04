import { Textarea, Field, FieldLabel } from '../../../components/ui/Textarea'

export const BasicTextareaExample = () => {
  return (
    <Field className="max-w-lg">
      <FieldLabel>Your message</FieldLabel>
      <Textarea name="message" placeholder="Tell us what you have in mind..." />
    </Field>
  )
}
