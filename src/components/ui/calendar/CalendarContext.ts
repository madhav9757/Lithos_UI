import { createContext } from 'react'

export interface CalendarContextValue {
  bordered?: boolean
}

export const CalendarContext = createContext<CalendarContextValue | null>(null)
