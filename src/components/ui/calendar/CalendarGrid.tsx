/**
 * @fileoverview Main day-grid container for Calendar primitive.
 * - Renders zero-gap CSS grid layout with weekday header and 42 day slots.
 * - Delegates mouse interaction (click/hover) via event delegation on dataset attributes.
 */
import { useCallback, useRef, type MouseEvent, type KeyboardEvent, type RefObject } from 'react'
import { cn } from '../../../utils/cn'
import { toDateKey, isSameDay } from '../../../utils/date'
import { parseDateString, asArray, formatDate } from './calendar.utils'
import { CalendarDay } from './CalendarDay'
import type { CalendarProps, CalendarMode, CalendarValue } from './calendar.types'

interface CalendarGridProps {
  mode: CalendarMode
  currentValue: CalendarValue
  focusedDate: Date
  gridDays: Array<{ date: Date; isCurrentMonth: boolean }>
  weekdayLabels: string[]
  dateFormatter: Intl.DateTimeFormat
  dateColors?: CalendarProps['dateColors']
  rainbowColors: Map<string, string>
  classes?: CalendarProps['classes']
  dayButtonRefs: RefObject<Map<string, HTMLButtonElement>>
  isDisabled: (date: Date) => boolean
  isRangeMember: (date: Date) => boolean
  setHoverDate: (date: Date | null) => void
  setFocusedDate: (date: Date) => void
  handleDayClick: (date: Date) => void
  handleGridKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
}

export const CalendarGrid = ({
  mode,
  currentValue,
  focusedDate,
  gridDays,
  weekdayLabels,
  dateFormatter,
  dateColors,
  rainbowColors,
  classes = {},
  dayButtonRefs,
  isDisabled,
  isRangeMember,
  setHoverDate,
  setFocusedDate,
  handleDayClick,
  handleGridKeyDown,
}: CalendarGridProps) => {
  const lastHoveredDateRef = useRef<string | null>(null)

  const handleRegisterRef = useCallback(
    (key: string, el: HTMLButtonElement | null) => {
      if (!dayButtonRefs.current) return
      if (el) dayButtonRefs.current.set(key, el)
      else dayButtonRefs.current.delete(key)
    },
    [dayButtonRefs]
  )

  const handleGridClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null
    const button = target?.closest<HTMLElement>('[data-grid-button]')
    if (!button) return

    const selectedDate = parseDateString(button.dataset['date'])
    if (!selectedDate) return

    setFocusedDate(selectedDate)
    handleDayClick(selectedDate)
  }

  const handleGridHover = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null
    const button = target?.closest<HTMLElement>('[data-grid-button]')

    if (!button) {
      if (lastHoveredDateRef.current !== null) {
        lastHoveredDateRef.current = null
        setHoverDate(null)
      }
      return
    }

    const rawDate = button.dataset['date']
    if (!rawDate || rawDate === lastHoveredDateRef.current) return

    const selectedDate = parseDateString(rawDate)
    if (!selectedDate) return

    lastHoveredDateRef.current = rawDate
    setHoverDate(selectedDate)
  }

  const handleGridLeave = () => {
    lastHoveredDateRef.current = null
    setHoverDate(null)
  }

  return (
    <div
      role="grid"
      aria-label="Calendar"
      aria-multiselectable={mode === 'multiple' || mode === 'rainbow'}
      onMouseLeave={handleGridLeave}
      onMouseEnter={handleGridHover}
      onMouseMove={handleGridHover}
      onClick={handleGridClick}
      onKeyDown={handleGridKeyDown}
      className={cn('grid border-t-2 border-l-2 border-(--lithos-border) w-full', classes.grid)}
      style={{ gridTemplateColumns: 'repeat(7, minmax(28px, 1fr))' }}
    >
      <div role="row" className="contents">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            role="columnheader"
            className={cn(
              'border-r-2 border-b-2 border-(--lithos-border) h-6 sm:h-8 flex items-center justify-center font-mono font-bold text-xs',
              classes.weekdays
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {Array.from({ length: gridDays.length / 7 }).map((_, rowIndex) => (
        <div key={rowIndex} role="row" className="contents">
          {gridDays.slice(rowIndex * 7, (rowIndex + 1) * 7).map(({ date, isCurrentMonth }) => {
            const disabled = isDisabled(date)
            const selected =
              mode === 'single'
                ? isSameDay(currentValue as Date | null, date)
                : mode === 'multiple' || mode === 'rainbow'
                  ? asArray(currentValue).some((d) => isSameDay(d, date))
                  : isRangeMember(date)

            const customColor = (() => {
              if (mode !== 'rainbow' || !selected) {
                if (mode === 'multiple' && selected) {
                  return dateColors?.find((dc) =>
                    dc.dates.some((d) => (typeof d === 'number' ? d === date.getDate() : isSameDay(d, date)))
                  )?.color
                }
                return undefined
              }

              return rainbowColors.get(formatDate(date))
            })()

            return (
              <CalendarDay
                key={toDateKey(date)}
                date={date}
                isCurrentMonth={isCurrentMonth}
                focusedDate={focusedDate}
                currentValue={currentValue}
                mode={mode}
                disabled={disabled}
                selected={selected}
                customColor={customColor}
                classes={classes}
                dateFormatter={dateFormatter}
                onRegisterRef={handleRegisterRef}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
