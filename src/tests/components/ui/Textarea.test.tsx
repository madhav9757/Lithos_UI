import { createRef, useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Textarea } from '../../../components/ui/Textarea'
import { TextareaGroupExample } from '../../../docs/examples/textarea/group'
import { AutoSizeTextareaExample } from '../../../docs/examples/textarea/autoSize'
import { Input } from '../../../components/ui/Input'
import { Field, FieldLabel, FieldDescription } from '../../../components/ui/Typography'
import { TextareaFormExample } from '../../../docs/examples/textarea/form'
import { colors } from '../../../utils/colors'
import { CharacterCountTextareaExample } from '../../../docs/examples/textarea/characterCount'
import { WordCountTextareaExample } from '../../../docs/examples/textarea/wordCount'

describe('Textarea', () => {
  it('forwards refs and native form attributes', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} aria-label="Message" name="message" rows={6} required maxLength={20} />)
    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Message' }))
    expect(ref.current).toHaveAttribute('rows', '6')
    expect(ref.current).toHaveAttribute('maxlength', '20')
    expect(ref.current).toBeRequired()
    expect(ref.current).toHaveAttribute('name', 'message')
  })

  it('supports uncontrolled multiline editing and native length limits', async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="Message" maxLength={5} defaultValue="A" />)
    const field = screen.getByRole('textbox')
    await user.type(field, '{Enter}BCDE')
    expect(field).toHaveValue('A\nBCD')
  })

  it('supports consumer-controlled values', async () => {
    const Controlled = () => {
      const [value, setValue] = useState('')
      return <Textarea aria-label="Message" value={value} onChange={(event) => setValue(event.target.value)} />
    }
    render(<Controlled />)
    await userEvent.setup().type(screen.getByRole('textbox'), 'Hello')
    expect(screen.getByRole('textbox')).toHaveValue('Hello')
  })

  it('prevents editing disabled and read-only fields', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Textarea aria-label="Disabled" disabled defaultValue="Fixed" />
        <Textarea aria-label="Read only" readOnly defaultValue="Fixed" />
      </>
    )
    await user.type(screen.getByLabelText('Disabled'), 'change')
    await user.type(screen.getByLabelText('Read only'), 'change')
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
    expect(screen.getByLabelText('Disabled')).toHaveValue('Fixed')
    expect(screen.getByLabelText('Read only')).toHaveValue('Fixed')
  })

  it('exposes validation while preserving consumer style overrides', () => {
    const { rerender } = render(<Textarea aria-label="Message" invalid />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('textbox')).toHaveStyle({ borderColor: colors.error })
    rerender(<Textarea aria-label="Message" invalid style={{ borderColor: 'blue' }} />)
    expect((screen.getByRole('textbox') as HTMLTextAreaElement).style.borderColor).toBe('blue')
    rerender(<Textarea aria-label="Message" aria-invalid="grammar" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'grammar')
    rerender(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('allows class overrides of sizing and resize behavior', () => {
    render(<Textarea aria-label="Message" size="lg" resize="none" className="px-8 rounded-none" />)
    expect(screen.getByRole('textbox')).toHaveClass('resize-none', 'text-lg', 'px-8', 'rounded-none')
    expect(screen.getByRole('textbox')).not.toHaveClass('px-4', 'resize-y')
  })

  it('has no accessibility violations with a label and validation description', async () => {
    const { container } = render(
      <>
        <label htmlFor="message">Message</label>
        <Textarea id="message" invalid aria-describedby="error" />
        <p id="error">A message is required.</p>
      </>
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it.each(['sm', 'default', 'md', 'lg'] as const)('shares Input padding and typography for %s', (size) => {
    render(
      <>
        <Input aria-label="Input" size={size} />
        <Textarea aria-label="Textarea" size={size} rows={1} />
      </>
    )
    const inputClasses = screen.getByLabelText('Input').className.split(' ')
    const sharedClasses = inputClasses.filter((name) => /^(text-(xs|sm|base|lg)|px-|py-)/.test(name))
    expect(screen.getByLabelText('Textarea')).toHaveClass(...sharedClasses)
  })

  it('starts the expandable example at one row and keeps native multiline editing', async () => {
    render(<AutoSizeTextareaExample />)
    const field = screen.getByRole('textbox', { name: 'Auto size' })
    expect(field).toHaveAttribute('rows', '1')
    expect(field).toHaveClass('field-sizing-content', 'resize-none')
    await userEvent.setup().type(field, 'First{Enter}Second')
    expect(field).toHaveValue('First\nSecond')
  })

  it('allows manual resizing alongside automatic content sizing', () => {
    render(<Textarea aria-label="Message" autoSize resize="vertical" />)
    expect(screen.getByRole('textbox')).toHaveClass('field-sizing-content', 'resize-y')
    expect(screen.getByRole('textbox')).not.toHaveClass('resize-none')
  })

  it.each(['plain', 'outlined', 'soft', 'solid'] as const)('keeps disabled and invalid states for %s', (variant) => {
    render(<Textarea aria-label="Message" variant={variant} invalid disabled required />)
    const field = screen.getByRole('textbox')
    expect(field).toHaveAttribute('aria-invalid', 'true')
    expect(field).toHaveStyle({ borderColor: colors.error })
    expect(field).toBeDisabled()
    expect(field).toBeRequired()
  })

  it('connects Typography field labels and descriptions, preserving extra descriptions', () => {
    const Example = ({ description = true }: { description?: boolean }) => (
      <>
        <Field controlId="message">
          <FieldLabel>Your message</FieldLabel>
          <Textarea aria-describedby="extra" required />
          {description && <FieldDescription>A message is required.</FieldDescription>}
        </Field>
        <p id="extra">Extra help.</p>
      </>
    )
    const { rerender } = render(<Example />)
    const field = screen.getByRole('textbox', { name: 'Your message' })
    expect(field).toHaveAttribute('id', 'message')
    expect(field).toHaveAccessibleDescription('A message is required. Extra help.')
    expect(field).toBeInvalid()
    expect(field).not.toHaveAttribute('aria-invalid')
    rerender(<Example description={false} />)
    expect(field).toHaveAccessibleDescription('Extra help.')
  })

  it('generates distinct control IDs for separate fields', () => {
    render(
      <>
        <Field>
          <FieldLabel>First</FieldLabel>
          <Textarea />
        </Field>
        <Field>
          <FieldLabel>Second</FieldLabel>
          <Textarea />
        </Field>
      </>
    )
    expect(screen.getByLabelText('First').id).not.toBe(screen.getByLabelText('Second').id)
  })

  it('pairs a required textarea with an external submit button', async () => {
    const user = userEvent.setup()
    render(<TextareaFormExample />)
    expect(screen.getByRole('textbox')).toBeRequired()
    await user.type(screen.getByRole('textbox'), 'A message')
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(screen.getByRole('status')).toHaveTextContent('Message captured locally.')
    expect(screen.getByRole('textbox')).toHaveValue('')
  })
})

describe('Textarea group example', () => {
  it('inserts emoji at the cursor and respects the native character limit', async () => {
    const user = userEvent.setup()
    render(<TextareaGroupExample />)
    const field = screen.getByRole('textbox') as HTMLTextAreaElement
    await user.type(field, 'Hello world')
    field.setSelectionRange(6, 6)
    await user.click(screen.getByRole('button', { name: 'Insert emoji' }))
    await user.click(screen.getByRole('button', { name: 'Insert 😀' }))
    expect(field).toHaveValue('Hello 😀world')
    await user.clear(field)
    await user.paste('x'.repeat(2000))
    await user.click(screen.getByRole('button', { name: 'Insert emoji' }))
    await user.click(screen.getByRole('button', { name: 'Insert 😀' }))
    expect(field).toHaveValue('x'.repeat(2000))
  })

  it('selects and removes a local attachment without submitting the form', async () => {
    const user = userEvent.setup()
    const { container } = render(<TextareaGroupExample />)
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement
    await user.upload(fileInput, new File(['hello'], 'notes.txt', { type: 'text/plain' }))
    expect(screen.getByText('Attached locally: notes.txt')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    await user.click(screen.getByRole('button', { name: 'Remove attachment' }))
    expect(screen.queryByText('Attached locally: notes.txt')).not.toBeInTheDocument()
    expect(fileInput.value).toBe('')
  })
  it('rejects whitespace and captures a multiline message locally', async () => {
    const user = userEvent.setup()
    render(<TextareaGroupExample />)
    const field = screen.getByRole('textbox')
    const send = screen.getByRole('button', { name: 'Send message' })
    expect(send).toBeDisabled()
    await user.type(field, '   ')
    expect(send).toBeDisabled()
    await user.clear(field)
    await user.type(field, 'Build{Enter}a dashboard')
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    await user.click(send)
    expect(screen.getByRole('status')).toHaveTextContent('Message captured locally: Build a dashboard')
    expect(field).toHaveValue('')
    expect(send).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<TextareaGroupExample />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Textarea count examples', () => {
  it('shows characters used and left, and enforces the character limit', async () => {
    const user = userEvent.setup()
    render(<CharacterCountTextareaExample />)
    const field = screen.getByRole('textbox')
    expect(screen.getByText('0 / 2000 characters · 2000 left')).toBeInTheDocument()
    await user.click(field)
    await user.paste('  One   two\nthree  ')
    expect(screen.getByText('19 / 2000 characters · 1981 left')).toBeInTheDocument()
    await user.clear(field)
    await user.type(field, 'word')
    expect(screen.getByText('4 / 2000 characters · 1996 left')).toBeInTheDocument()
    await user.clear(field)
    await user.paste('x'.repeat(2005))
    expect(field).toHaveValue('x'.repeat(2000))
    expect(screen.getByText('2000 / 2000 characters · 0 left')).toBeInTheDocument()
    await user.type(field, 'blocked')
    expect(field).toHaveValue('x'.repeat(2000))
  })

  it('shows words used and left across spaces and newlines independently of character count', async () => {
    const user = userEvent.setup()
    render(<WordCountTextareaExample />)
    const field = screen.getByRole('textbox')
    expect(screen.getByText('0 / 300 words · 300 left')).toBeInTheDocument()
    await user.click(field)
    await user.paste('  One   two\nthree  ')
    expect(screen.getByText('3 / 300 words · 297 left')).toBeInTheDocument()
    await user.clear(field)
    await user.paste('x'.repeat(2005))
    expect(field).toHaveValue('x'.repeat(2005))
    expect(screen.getByText('1 / 300 words · 299 left')).toBeInTheDocument()
  })

  it('blocks additional words from typing or paste while allowing edits within the limit', async () => {
    const user = userEvent.setup()
    render(<WordCountTextareaExample />)
    const field = screen.getByRole('textbox')
    const fullMessage = Array(300).fill('a').join(' ')
    await user.click(field)
    await user.paste(`${fullMessage} extra words`)
    expect(field).toHaveValue(`${fullMessage} `)
    expect(screen.getByText('300 / 300 words · 0 left')).toBeInTheDocument()
    await user.type(field, 'blocked')
    expect(field).toHaveValue(`${fullMessage} `)
    await user.type(field, '{Backspace}{Backspace}')
    await user.type(field, 'replacement')
    expect(field).toHaveValue(`${fullMessage.slice(0, -1)}replacement`)
    expect(screen.getByText('300 / 300 words · 0 left')).toBeInTheDocument()
  })

  it.each([CharacterCountTextareaExample, WordCountTextareaExample])(
    'has accessible labels and descriptions',
    async (Example) => {
      const { container } = render(<Example />)
      expect(screen.getByRole('textbox', { name: 'Your message' })).toHaveAccessibleDescription()
      expect(await axe(container)).toHaveNoViolations()
    }
  )
})
