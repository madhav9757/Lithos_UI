import { useState } from 'react'
import { Textarea, Field, FieldLabel, FieldDescription } from '../../../components/ui/Textarea'

const MAX_WORDS = 300

export const WordCountTextareaExample = () => {
  const [message, setMessage] = useState('')
  const wordCount = message.match(/\S+/gu)?.length ?? 0
  return (
    <Field className="max-w-lg">
      <FieldLabel>Your message</FieldLabel>
      <Textarea
        name="message"
        placeholder="Tell us what you have in mind..."
        value={message}
        onChange={(event) => {
          const value = event.target.value
          const firstExcessWord = [...value.matchAll(/\S+/gu)][MAX_WORDS]
          setMessage(firstExcessWord ? value.slice(0, firstExcessWord.index) : value)
        }}
      />
      <FieldDescription>
        {wordCount} / {MAX_WORDS} words · {MAX_WORDS - wordCount} left
      </FieldDescription>
    </Field>
  )
}
