import { useState } from 'react'
import { Textarea, Field, FieldLabel, FieldDescription } from '../../../components/ui/Textarea'
import { Button } from '../../../components/ui/Button'

export const TextareaFormExample = () => {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <form
      className="w-full max-w-lg"
      onSubmit={(event) => {
        event.preventDefault()
        if (!message.trim()) return
        setSubmitted(true)
        setMessage('')
      }}
    >
      <Field>
        <FieldLabel>Your message *</FieldLabel>
        <Textarea
          name="message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us what you have in mind..."
        />
        <FieldDescription>Write your message, then select Send message.</FieldDescription>
      </Field>
      <Button type="submit" className="mt-4" disabled={!message.trim()}>
        Send message
      </Button>
      <p role="status" className="mt-3 text-sm">
        {submitted && 'Message captured locally.'}
      </p>
    </form>
  )
}
