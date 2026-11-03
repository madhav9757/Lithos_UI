/**
 * @fileoverview Lithos UI toast type definitions and interfaces.
 * - Defines intent variants, screen placement options, and auto-dismiss duration mappings.
 * - Specifies prop contracts for ToastProvider, individual ToastItem, and Context dispatchers.
 */
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import type { HexColor, LithosElementProps } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'
import type { IconProps } from '../icons/icons.types'

/** Visual intent or status variant for a toast notification. */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default' | 'accent'

/** Screen corner placement where toast notifications are positioned. */
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/** Internal execution status of an asynchronous toast action. */
export type ToastStatus = 'success' | 'error'

/** Supported entrance animation/transition variants. */
export type ToastTransition = 'slide-up' | 'slide-down' | 'fade' | 'scale' | 'none'

/** Optional options that can be passed when aborting/cancelling an action */
export interface ToastCancelOptions {
  intent?: ToastType
  message?: ReactNode
  title?: string
  duration?: number
}

/** Contextual controls provided to an asynchronous toast action. */
export interface ToastActionContext {
  /** Aborts or cancels the automatic success/error state transition triggered by the provider. */
  cancel: (options?: ToastCancelOptions) => void
}

/**
 * Flexible icon definition: can be a single React node, an icon component accepting `IconProps`,
 * or a state-mapped object for different toast lifecycle states.
 */
export type ToastIconConfig =
  | ReactNode
  | ((props: IconProps) => ReactNode)
  | {
      default?: ReactNode | ((props: IconProps) => ReactNode)
      success?: ReactNode | ((props: IconProps) => ReactNode)
      error?: ReactNode | ((props: IconProps) => ReactNode)
      loading?: ReactNode | ((props: IconProps) => ReactNode)
      warning?: ReactNode | ((props: IconProps) => ReactNode)
      info?: ReactNode | ((props: IconProps) => ReactNode)
      accent?: ReactNode | ((props: IconProps) => ReactNode)
    }

/**
 * Shared base configuration options between the Provider and individual Toasts,
 * allowing local overrides per notification.
 */
export interface ToastSharedOptions {
  /**
   * Visual style variant representing the status or intent.
   * @default 'default'
   */
  intent?: ToastType | undefined

  /** Global default icon configuration used by every toast. */
  icon?: ToastIconConfig

  /**
   * Enables a visual progress bar indicating the remaining lifetime of the toast.
   * @default false
   */
  showProgress?: boolean

  /**
   * Entrance animation transition style.
   * Defaults to 'slide-up' for bottom positions and 'slide-down' for top positions.
   */
  transition?: ToastTransition | undefined
}

/** Options for dispatching an individual toast notification. */
export interface ToastProps extends ToastSharedOptions {
  /** Optional header title text. */
  title?: string | undefined

  /** Primary message text/content displayed inside the toast. */
  message?: ReactNode

  /** Custom background or accent color override. */
  color?: HexColor | string | undefined

  /**
   * Accessible ARIA label for the close button.
   * @default 'Close notification'
   */
  label?: string

  /**
   * Display duration in milliseconds before auto-dismissing.
   * @default 5000
   */
  duration?: number | undefined

  /**
   * Message or content displayed while the asynchronous action is pending.
   * @default 'Processing...'
   */
  loading?: ReactNode

  /**
   * Message or content displayed when the asynchronous action resolves successfully.
   * @default 'Done!'
   */
  success?: ReactNode

  /**
   * Message or content displayed if the asynchronous action throws an error.
   * @default 'Failed'
   */
  error?: ReactNode

  /**
   * Asynchronous action function executed when the async toast runs.
   * Receives contextual controls (such as `cancel`) to manage the lifecycle execution.
   */
  action?: ((context: ToastActionContext) => Promise<unknown>) | undefined

  /**
   * When true, prevents the toast intent from changing to 'success' or 'error' automatically
   * when an asynchronous action finishes.
   * @default false
   */
  preserveIntent?: boolean
}

/** Represents an active toast instance currently stored in the provider queue. */
export type IdentifiedToastProps = ToastProps & {
  /** Unique identifier for the toast item. */
  id: string

  /** Optional runtime status tracking the completion result of an asynchronous action. */
  status?: ToastStatus | undefined
}

/** Custom renderer function for custom toast layouts while preserving core swipe/dismiss logic. */
export type ToastRender = (toast: IdentifiedToastProps, helpers: { onRemove: () => void }) => ReactNode

/** Props for the individual rendered Toast item component. */
export interface ToastItemProps {
  /** Toast configuration payload including its unique internal identifier. */
  toast: IdentifiedToastProps

  /** The Toast index. */
  index?: number

  /** Custom renderer function for custom toast layouts while preserving core swipe/dismiss logic. */
  renderToast?: ToastRender | undefined

  /** Custom CSS class names applied to the toast item element. */
  className?: LithosClass
}

/** Custom auto-dismiss duration configuration mapping specific toast intents to display times in milliseconds. */
export type DurationObjType = {
  success?: number
  error?: number
  warning?: number
  info?: number
  default?: number
  accent?: number
}

/** Props for the `ToastProvider` wrapper component. */
export interface ToastProviderProps extends ToastSharedOptions, LithosElementProps<'div'> {
  /** Application tree or elements wrapped by the toast context. */
  children: ReactNode

  /**
   * Default auto-dismiss duration in milliseconds.
   * Accepts a single number for all toasts or an object specifying per-intent durations.
   * @default 5000
   */
  duration?: DurationObjType | number

  /**
   * Screen position where toast notifications will appear.
   * @default 'bottom-right'
   */
  position?: ToastPosition

  /**
   * Enables card stacking layout for multiple active notifications.
   * @default false
   */
  stack?: boolean

  /**
   * Maximum number of visible stacked toast items.
   * @default 3
   */
  maxStack?: number

  /** Custom renderer function for custom toast layouts across the provider. */
  renderToast?: ToastRender

  /** Custom CSS class names applied to the floating toast container wrapper. */
  className?: LithosClass
}

/** Context payload contract for dispatching and removing toast notifications. */
export interface ToastContextType extends Omit<ToastProviderProps, 'className' | 'children' | 'icon'> {
  /** Dispatches a new toast notification and returns its unique generated ID. */
  addToast: (props: ToastProps) => string

  /** Manually dismisses an active toast notification by its unique ID. */
  removeToast: (id: string) => void

  /** Updates an existing active toast notification by its unique ID. */
  updateToast: (id: string, newProps: Partial<Omit<ToastProps, 'action'>>) => void

  /** Whether the notification stack is currently expanded via hover or tap. */
  isExpanded: boolean

  /** Toggles or sets the expanded state of the notification stack. */
  setIsExpanded: Dispatch<SetStateAction<boolean>>

  /** Array of the current toasts */
  toasts: IdentifiedToastProps[]
}
