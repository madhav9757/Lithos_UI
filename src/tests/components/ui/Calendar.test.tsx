import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Calendar } from '../../../components/ui/Calendar'

describe('Calendar', () => {
  const BASE_MONTH = new Date(2026, 7, 1) // August 2026

  it('renders correctly', () => {
    render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByText('August 2026')).toBeInTheDocument()
  })

  describe('Selection Modes', () => {
    it('selects a date in single mode', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} onChange={onChange} />)

      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      await user.click(day15)

      expect(onChange).toHaveBeenCalledWith(expect.any(Date))
      expect(day15.parentElement).toHaveAttribute('aria-selected', 'true')
    })

    it('selects and deselects multiple dates in multiple mode', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Calendar locale="en-US" mode="multiple" defaultMonth={BASE_MONTH} onChange={onChange} />)

      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      const day16 = screen.getByRole('button', { name: /August 16, 2026/i })

      await user.click(day15)
      await user.click(day16)

      expect(day15.parentElement).toHaveAttribute('aria-selected', 'true')
      expect(day16.parentElement).toHaveAttribute('aria-selected', 'true')

      // deselect
      await user.click(day15)
      expect(day15.parentElement).toHaveAttribute('aria-selected', 'false')
    })

    it('handles range selection mode', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Calendar locale="en-US" mode="range" defaultMonth={BASE_MONTH} onChange={onChange} />)

      const day10 = screen.getByRole('button', { name: /August 10, 2026/i })
      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })

      await user.click(day10)
      expect(onChange).toHaveBeenLastCalledWith({ from: expect.any(Date), to: null })

      await user.click(day15)
      expect(onChange).toHaveBeenLastCalledWith({ from: expect.any(Date), to: expect.any(Date) })

      expect(day10.parentElement).toHaveAttribute('aria-selected', 'true')
      expect(day15.parentElement).toHaveAttribute('aria-selected', 'true')
      // intermediate days should be part of the range selection
      expect(screen.getByRole('button', { name: /August 12, 2026/i }).parentElement).toHaveAttribute(
        'aria-selected',
        'true'
      )
    })

    it('applies ROYGBIV colors sequentially in rainbow mode', async () => {
      const user = userEvent.setup()
      render(<Calendar locale="en-US" mode="rainbow" defaultMonth={BASE_MONTH} />)

      const day10 = screen.getByRole('button', { name: /August 10, 2026/i })
      const day11 = screen.getByRole('button', { name: /August 11, 2026/i })

      await user.click(day10)
      await user.click(day11)

      // first assigned color is RED (#fa5252)
      expect(day10).toHaveStyle({ backgroundColor: '#fa5252' })
      // second is ORANGE (#fd7e14)
      expect(day11).toHaveStyle({ backgroundColor: '#fd7e14' })
    })

    it('applies custom dateColors in multiple mode', () => {
      const targetDate = new Date(2026, 7, 15)
      render(
        <Calendar
          locale="en-US"
          mode="multiple"
          defaultMonth={BASE_MONTH}
          value={[targetDate]}
          dateColors={[{ dates: [targetDate], color: '#ff0000' }]}
        />
      )

      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      expect(day15).toHaveStyle({ backgroundColor: '#ff0000' })
    })
  })

  describe('Navigation & Disabled Dates', () => {
    it('navigates through months with header buttons', async () => {
      const user = userEvent.setup()
      const onMonthChange = vi.fn()
      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} onMonthChange={onMonthChange} />)

      const nextButton = screen.getByRole('button', { name: /next month/i })
      await user.click(nextButton)

      expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 8, 1)) // September 2026

      const prevButton = screen.getByRole('button', { name: /previous month/i })
      await user.click(prevButton)

      expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 7, 1))
    })

    it('disables dates outside minDate and maxDate bounds', () => {
      const minDate = new Date(2026, 7, 10)
      const maxDate = new Date(2026, 7, 20)

      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} minDate={minDate} maxDate={maxDate} />)

      const day5 = screen.getByRole('button', { name: /August 5, 2026/i })
      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      const day25 = screen.getByRole('button', { name: /August 25, 2026/i })

      expect(day5).toBeDisabled()
      expect(day15).not.toBeDisabled()
      expect(day25).toBeDisabled()
    })

    it('disables dates provided in disabledDates array', () => {
      render(
        <Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} disabledDates={[15, new Date(2026, 7, 20)]} />
      )

      expect(screen.getByRole('button', { name: /August 15, 2026/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /August 20, 2026/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /August 10, 2026/i })).not.toBeDisabled()
    })
  })

  describe('Keyboard Navigation (WAI-ARIA)', () => {
    it('navigates grid cells using arrow keys', async () => {
      const user = userEvent.setup()
      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} defaultValue={new Date(2026, 7, 15)} />)

      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      day15.focus()

      // ArrowRight -> 16
      await user.keyboard('{ArrowRight}')
      expect(screen.getByRole('button', { name: /August 16, 2026/i })).toHaveFocus()

      // ArrowLeft -> 15
      await user.keyboard('{ArrowLeft}')
      expect(day15).toHaveFocus()

      // ArrowDown -> 22 (+7 days)
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('button', { name: /August 22, 2026/i })).toHaveFocus()

      // ArrowUp -> 15 (-7 days)
      await user.keyboard('{ArrowUp}')
      expect(day15).toHaveFocus()
    })

    it('jumps to start and end of week row using Home and End', async () => {
      const user = userEvent.setup()
      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} defaultValue={new Date(2026, 7, 12)} />)

      const day12 = screen.getByRole('button', { name: /August 22, 2026/i })
      day12.focus()

      await user.keyboard('{Home}')
      expect(screen.getByRole('button', { name: /August 9, 2026/i })).toHaveFocus()

      await user.keyboard('{End}')
      expect(screen.getByRole('button', { name: /August 15, 2026/i })).toHaveFocus()
    })

    it('selects focused date when pressing Enter or Space', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} onChange={onChange} />)

      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })
      day15.focus()

      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenCalledTimes(1)

      await user.keyboard('{ }')
      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  describe('Controlled Component', () => {
    it('respects controlled value prop over user clicks', async () => {
      const user = userEvent.setup()
      const controlledDate = new Date(2026, 7, 10)
      const onChange = vi.fn()

      render(
        <Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} value={controlledDate} onChange={onChange} />
      )

      const day10 = screen.getByRole('button', { name: /August 10, 2026/i })
      const day15 = screen.getByRole('button', { name: /August 15, 2026/i })

      expect(day10.parentElement).toHaveAttribute('aria-selected', 'true')

      await user.click(day15)
      expect(onChange).toHaveBeenCalledWith(expect.any(Date))

      // permanence check (Value stays controlled until parent updates it)
      expect(day10.parentElement).toHaveAttribute('aria-selected', 'true')
      expect(day15.parentElement).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('Bordered styling', () => {
    it('renders with border and shadow by default', () => {
      const { container } = render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveClass('border-2')
      expect(root).toHaveClass('p-3')
    })

    it('renders borderless when bordered={false}', () => {
      const { container } = render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} bordered={false} />)
      const root = container.firstChild as HTMLElement
      expect(root).not.toHaveClass('border-2')
      expect(root).not.toHaveClass('p-3')
    })
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Calendar locale="en-US" mode="single" defaultMonth={BASE_MONTH} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
