import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { Textarea } from '../../../components/ui/Textarea'

export const AutoSizeTextareaExample = () => {
  return (
    <div className="w-full max-w-lg">
      <Field>
        <FieldLabel>Auto size</FieldLabel>
        <Textarea name="message" autoSize placeholder="Tell us what you have in mind..." />
        <FieldDescription>The field grows as you type.</FieldDescription>
      </Field>
    </div>
  )
}
