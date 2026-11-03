import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export interface FieldContextValue {
  controlId: string
  descriptionId: string
  hasDescription: boolean
  setHasDescription: Dispatch<SetStateAction<boolean>>
}

export const FieldContext = createContext<FieldContextValue | null>(null)
