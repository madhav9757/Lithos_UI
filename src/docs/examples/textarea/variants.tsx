import { Textarea, Field, FieldLabel } from '../../../components/ui/Textarea'

export const TextareaVariantsExample = () => (
  <div className="w-full max-w-lg space-y-6">
    <Field>
      <FieldLabel>Plain</FieldLabel>
      <Textarea variant="plain" rows={2} placeholder="Tell us what you have in mind..." />
    </Field>
    <Field>
      <FieldLabel>Outlined</FieldLabel>
      <Textarea variant="outlined" rows={2} placeholder="Tell us what you have in mind..." />
    </Field>
    <Field>
      <FieldLabel>Soft</FieldLabel>
      <Textarea variant="soft" rows={2} placeholder="Tell us what you have in mind..." />
    </Field>
    <Field>
      <FieldLabel>Solid</FieldLabel>
      <Textarea variant="solid" rows={2} placeholder="Tell us what you have in mind..." />
    </Field>
  </div>
)
