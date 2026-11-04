import { useState } from 'react'
import { Textarea, Field, FieldLabel, FieldDescription } from '../../../components/ui/Textarea'

const MAX_LENGTH = 2000

export const CharacterCountTextareaExample = () => {
  const [message, setMessage] = useState('')
  return (
    <Field className="max-w-lg">
      <FieldLabel>Your message</FieldLabel>
      <Textarea
        name="message"
        placeholder="Tell us what you have in mind..."
        maxLength={MAX_LENGTH}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <FieldDescription>
        {message.length} / {MAX_LENGTH} characters · {MAX_LENGTH - message.length} left
      </FieldDescription>
    </Field>
  )
}
