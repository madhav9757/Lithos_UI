import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
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

describe('DatePicker Component - Range, Clear & Presets', () => {
  const BASE_MONTH = new Date(2026, 7, 1)

  it('handles date range selection and auto-closes on completion', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker mode="range" defaultMonth={BASE_MONTH} locale="en-US" onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /Select date range/i })
    await user.click(trigger)

    const day10 = screen.getByRole('button', { name: /August 10, 2026/i })
    const day15 = screen.getByRole('button', { name: /August 15, 2026/i })

    await user.click(day10)
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ from: expect.any(Date), to: null }))

    await user.click(day15)
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ from: expect.any(Date), to: expect.any(Date) }))

    await waitFor(() => {
      expect(screen.queryByRole('grid')).not.toBeInTheDocument()
    })
  })

  it('clears selected date when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker value={new Date(2026, 7, 15)} clearable onChange={onChange} locale="en-US" />)

    const clearBtn = screen.getByRole('button', { name: /Clear date/i })
    await user.click(clearBtn)

    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('renders and applies quick presets', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker showPresets defaultMonth={BASE_MONTH} onChange={onChange} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    await user.click(trigger)

    const todayPreset = screen.getByRole('button', { name: 'Today' })
    expect(todayPreset).toBeInTheDocument()

    await user.click(todayPreset)
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
  })
})

describe('DatePicker Component - Accessibility & Keyboard Interaction', () => {
  const BASE_MONTH = new Date(2026, 7, 1)

  it('closes popover on Escape key press', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    await user.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('opens on Enter key on focused trigger', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    trigger.focus()
    expect(trigger).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has no accessibility violations in closed state', async () => {
    const { container } = render(<DatePicker placeholder="Accessible DatePicker" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations in open state', async () => {
    const user = userEvent.setup()
    const { container } = render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" portaled={false} />)

    const trigger = screen.getByRole('button', { name: /Select date/i })
    await user.click(trigger)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('DatePicker Component - Dual Month Range Variant', () => {
  it('renders dual variant with From and To inputs and action buttons', async () => {
    const user = userEvent.setup()
    const onApply = vi.fn()
    const onCancel = vi.fn()
    const fromDate = new Date(2026, 9, 25)

    render(
      <DatePicker
        variant="dual"
        value={{ from: fromDate, to: fromDate }}
        onApply={onApply}
        onCancel={onCancel}
        locale="en-US"
      />
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    expect(screen.getByLabelText('From')).toHaveValue('25/10/2026')
    expect(screen.getByLabelText('To')).toHaveValue('25/10/2026')
    expect(screen.getByText('1 day selected')).toBeInTheDocument()

    const applyBtn = screen.getByRole('button', { name: 'Apply' })
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
    expect(applyBtn).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()

    await user.click(applyBtn)
    expect(onApply).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
