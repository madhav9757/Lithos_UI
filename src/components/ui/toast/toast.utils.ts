/**
 * @fileoverview Lithos UI toast helper utilities and constants.
 * - Defines default timeout thresholds and screen corner positioning classes.
 */
import { IconAlertCircle, IconCheck, IconInfo, IconAlertTriangle, IconBell } from '../icons/index'
import { FiLoader } from 'react-icons/fi'
import type { ToastTransition } from './toast.types'

/** Default Toast duration */
export const DEFAULT_DURATION = 5000

/** Default Error Toast duration */
export const ERROR_DURATION = 8000

/** Toast position style classes */
export const positionStyles = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
}

/** Default Toast icons */
export const ICONS_MAP = {
  success: IconCheck,
  info: IconInfo,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
  default: IconBell,
  accent: IconBell,
  loading: FiLoader,
}

/** Toast transition style classes */
export const TRANSITION_MAP: Record<ToastTransition, string> = {
  'slide-up': 'animate-[slide-up_0.3s_ease-out]',
  'slide-down': 'animate-[slide-down_0.3s_ease-out]',
  fade: 'animate-[fade-in_0.3s_ease-out]',
  scale: 'animate-[scale-in_0.2s_ease-out]',
  none: '',
}
