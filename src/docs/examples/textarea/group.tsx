import { useId, useRef, useState } from 'react'
import { Textarea } from '../../../components/ui/Textarea'
import { Button } from '../../../components/ui/Button'
import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { FiPaperclip, FiSmile } from 'react-icons/fi'

const MAX_LENGTH = 2000
const MAX_WORDS = 300

const countWords = (value: string) => value.match(/\S+/gu)?.length ?? 0

const limitMessage = (value: string) => {
  const text = value.slice(0, MAX_LENGTH)
  const firstExcessWord = [...text.matchAll(/\S+/gu)][MAX_WORDS]
  return firstExcessWord ? text.slice(0, firstExcessWord.index) : text
}

/** Local demo: consumers can replace the submit handler with their own API. */
export const TextareaGroupExample = () => {
  const id = useId()
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const textarea = useRef<HTMLTextAreaElement>(null)
  const wordCount = countWords(message)

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={(event) => {
        event.preventDefault()
        if (!message.trim()) return
        setSubmitted(message.trim())
        setMessage('')
        setAttachment(null)
        setShowEmoji(false)
        if (fileInput.current) fileInput.current.value = ''
      }}
    >
      <Field controlId={id}>
        <FieldLabel>Your message</FieldLabel>
        <div className="rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]">
          <Textarea
            ref={textarea}
            name="message"
            placeholder="Tell us what you have in mind..."
            maxLength={MAX_LENGTH}
            value={message}
            onChange={(event) => setMessage(limitMessage(event.target.value))}
            aria-describedby={`${id}-count`}
            autoSize
            required
            variant="plain"
            className="border-0 shadow-none hover:shadow-none focus:shadow-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--lithos-border)"
          />
          <div className="flex flex-wrap items-center justify-between px-3 pb-3 pt-2">
            <div className="mr-4 flex items-center space-x-2">
              <input
                ref={fileInput}
                type="file"
                className="hidden"
                aria-label="Choose attachment"
                onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
              />
              <Button
                variant="text"
                aria-label="Attach file"
                title="Attach file"
                onClick={() => fileInput.current?.click()}
              >
                <FiPaperclip size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
              <Button
                variant="text"
                aria-label="Insert emoji"
                title="Insert emoji"
                aria-expanded={showEmoji}
                aria-controls={`${id}-emoji`}
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <FiSmile size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
            <Button type="submit" disabled={!message.trim()}>
              Send message
            </Button>
          </div>
          {showEmoji && (
            <div id={`${id}-emoji`} role="group" aria-label="Choose emoji" className="flex flex-wrap px-3 pb-3">
              {['😀', '👍', '❤️', '🎉'].map((emoji) => (
                <Button
                  key={emoji}
                  variant="text"
                  aria-label={`Insert ${emoji}`}
                  className="mr-2"
                  onClick={() => {
                    const start = textarea.current?.selectionStart ?? message.length
                    const end = textarea.current?.selectionEnd ?? start
                    if (message.length - (end - start) + emoji.length > MAX_LENGTH) return
                    const nextMessage = message.slice(0, start) + emoji + message.slice(end)
                    if (countWords(nextMessage) > MAX_WORDS) return
                    setMessage(nextMessage)
                    setShowEmoji(false)
                    requestAnimationFrame(() => {
                      textarea.current?.focus()
                      textarea.current?.setSelectionRange(start + emoji.length, start + emoji.length)
                    })
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          )}
          {attachment && (
            <div className="flex items-center justify-between px-3 pb-3 text-sm">
              <span className="min-w-0 break-all">Attached locally: {attachment.name}</span>
              <Button
                variant="text"
                aria-label="Remove attachment"
                className="ml-2"
                onClick={() => {
                  setAttachment(null)
                  if (fileInput.current) fileInput.current.value = ''
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        <FieldDescription>
          Up to 2000 characters and 300 words. Enter adds a new line. Attachments stay on your device.
        </FieldDescription>
        <div id={`${id}-count`} className="mt-2 text-sm font-mono">
          <p>
            {message.length} / {MAX_LENGTH} characters · {MAX_LENGTH - message.length} left
          </p>
          <p>
            {wordCount} / {MAX_WORDS} words
          </p>
        </div>
      </Field>
      <p role="status" className="mt-2 break-words text-sm">
        {submitted && `Message captured locally: ${submitted}`}
      </p>
    </form>
  )
}
