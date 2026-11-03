import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { Textarea } from '../../../components/ui/Textarea'

export const InvalidTextareaExample = () => {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Field>
        <FieldLabel>Invalid description</FieldLabel>
        <Textarea invalid defaultValue="Too short" />
        <FieldDescription>Please enter a more detailed description.</FieldDescription>
      </Field>
    </div>
  )
}
