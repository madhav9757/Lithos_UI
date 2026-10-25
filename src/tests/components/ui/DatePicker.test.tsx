import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from '../../../components/ui/DatePicker'

describe('DatePicker Component - Single & Toggle', () => {
  const BASE_MONTH = new Date(2026, 7, 1)

  it('renders default input trigger with placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByRole('button', { name: /Pick a date/i })).toBeInTheDocument()
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })

  it('opens floating popover calendar on trigger click', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    await user.click(trigger)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByText('August 2026')).toBeInTheDocument()
  })

  it('selects a date and closes popover in single mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    await user.click(trigger)

    const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
    await user.click(day15)

    expect(onChange).toHaveBeenCalledWith(expect.any(Date))

    await waitFor(() => {
      expect(screen.queryByRole('grid')).not.toBeInTheDocument()
    })
  })

  it('respects controlled value prop over selection', () => {
    const selectedDate = new Date(2026, 7, 20)
    render(<DatePicker value={selectedDate} locale="en-US" />)

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent(/2026/)
    expect(trigger).toHaveTextContent(/20/)
  })

  it('disables trigger when disabled prop is passed', async () => {
    const user = userEvent.setup()
    render(<DatePicker disabled />)

    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()

    await user.click(trigger)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
