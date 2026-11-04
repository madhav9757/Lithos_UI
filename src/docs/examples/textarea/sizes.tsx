import { Textarea, Field, FieldLabel } from '../../../components/ui/Textarea'

export const TextareaSizesExample = () => {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Field>
        <FieldLabel>Small</FieldLabel>
        <Textarea size="sm" rows={1} placeholder="Write something..." />
      </Field>
      <Field>
        <FieldLabel>Default</FieldLabel>
        <Textarea size="default" rows={1} placeholder="Write something..." />
      </Field>
      <Field>
        <FieldLabel>Medium</FieldLabel>
        <Textarea size="md" rows={1} placeholder="Write something..." />
      </Field>
      <Field>
        <FieldLabel>Large</FieldLabel>
        <Textarea size="lg" rows={1} placeholder="Write something..." />
      </Field>
    </div>
  )
}
