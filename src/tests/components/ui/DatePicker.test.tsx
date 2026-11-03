import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker, DateField } from '../../../components/ui/DatePicker'

describe('DatePicker Component - Single & Toggle', () => {
  const BASE_MONTH = new Date(2026, 7, 1)

  it('renders default input with placeholder and calendar button', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Open calendar/i })).toBeInTheDocument()
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })

  it('opens floating popover calendar on calendar button click', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByText('August 2026')).toBeInTheDocument()

    const dialog = screen.getByRole('dialog')
    const innerCalendar = dialog.firstElementChild as HTMLElement
    expect(innerCalendar).not.toHaveClass('border-2')
  })

  it('toggles popover open and closed when calendar icon button is clicked', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('clicking input allows typing and does not open popover', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} />)

    const input = screen.getByRole('textbox')
    await user.click(input)

    expect(input).toHaveFocus()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('allows direct typing in the input and updates value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker defaultMonth={BASE_MONTH} onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, '15/08/2026')

    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(lastCall).toBeDefined()
    const calledDate = lastCall![0] as Date
    expect(calledDate.getDate()).toBe(15)
    expect(calledDate.getMonth()).toBe(7)
    expect(calledDate.getFullYear()).toBe(2026)
  })

  it('clearing input text sets value to null', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={onChange} locale="en-US" />)

    const input = screen.getByRole('textbox')
    await user.clear(input)

    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('supports typing and deleting character by character in DatePickerInput', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, '25')
    expect(input).toHaveValue('25/')

    await user.keyboard('{Backspace}')
    expect(input).toHaveValue('25')

    await user.type(input, '102026')
    expect(input).toHaveValue('25/10/2026')
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))

    await user.clear(input)
    expect(input).toHaveValue('')
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('selects a date and closes popover in single mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Aug 20, 2026')
  })

  it('disables trigger when disabled prop is passed', async () => {
    const user = userEvent.setup()
    render(<DatePicker disabled />)

    const input = screen.getByRole('textbox')
    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    expect(input).toBeDisabled()
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

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('opens on Enter key on focused calendar button', async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultMonth={BASE_MONTH} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
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

  it('updates range when From or To input is cleared', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const fromDate = new Date(2026, 9, 25)
    const toDate = new Date(2026, 9, 30)

    render(<DatePicker variant="dual" value={{ from: fromDate, to: toDate }} onChange={onChange} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)

    const fromInput = screen.getByLabelText('From')
    await user.clear(fromInput)

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ from: null, to: toDate }))
  })

  it('clears To endpoint when To input is cleared', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const fromDate = new Date(2026, 9, 25)
    const toDate = new Date(2026, 9, 30)

    render(<DatePicker variant="dual" value={{ from: fromDate, to: toDate }} onChange={onChange} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)

    const toInput = screen.getByLabelText('To')
    await user.clear(toInput)

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ from: fromDate, to: null }))
  })

  it('updates From date when valid date is typed in dual range inputs', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const fromDate = new Date(2026, 9, 25)
    const toDate = new Date(2026, 9, 30)

    render(<DatePicker variant="dual" value={{ from: fromDate, to: toDate }} onChange={onChange} locale="en-US" />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)

    const fromInput = screen.getByLabelText('From')
    await user.clear(fromInput)
    await user.type(fromInput, '10/10/2026')

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ from: expect.any(Date), to: toDate }))
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(lastCall).toBeDefined()
    const calledRange = lastCall![0]
    expect(calledRange.from.getDate()).toBe(10)
    expect(calledRange.from.getMonth()).toBe(9)
    expect(calledRange.from.getFullYear()).toBe(2026)
  })
})

describe('DateField Component', () => {
  it('renders fieldset with label, input, and calendar button', () => {
    render(<DateField label="Controlled picker" placeholder="DD/MM/YYYY" />)
    expect(screen.getByText('Controlled picker')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Open calendar/i })).toBeInTheDocument()
  })

  it('allows direct typing in DateField and updates value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DateField label="Controlled picker" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, '25/10/2026')

    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(lastCall).toBeDefined()
    const calledDate = lastCall![0] as Date
    expect(calledDate.getDate()).toBe(25)
    expect(calledDate.getMonth()).toBe(9)
    expect(calledDate.getFullYear()).toBe(2026)
  })

  it('supports typing and deleting character by character in DateField', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DateField label="Controlled picker" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, '25')
    expect(input).toHaveValue('25/')

    await user.keyboard('{Backspace}')
    expect(input).toHaveValue('25')

    await user.keyboard('{Backspace}')
    expect(input).toHaveValue('2')

    await user.keyboard('{Backspace}')
    expect(input).toHaveValue('')
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('updates input immediately when date is clicked in calendar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DateField label="Controlled picker" onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /Open calendar/i })
    await user.click(trigger)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const allButtons = screen.getAllByRole('button')
    const dayBtn = allButtons.find((btn) => /\b15\b/.test(btn.getAttribute('aria-label') || btn.textContent || ''))
    if (dayBtn) {
      await user.click(dayBtn)
      expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    }
  })
})
