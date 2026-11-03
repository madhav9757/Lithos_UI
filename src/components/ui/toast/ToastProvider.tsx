/**
 * @fileoverview Lithos UI toast provider and portal stack.
 * - Manages active toast notification queue state via React Context.
 * - Renders a fixed-position portal container to isolate alerts from page layout flow.
 * - Handles fallback and per-intent duration resolution for auto-dismiss timers.
 */
import { useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from './useToast'
import { cn } from '../../../utils/cn'
import type { ToastProps, ToastProviderProps, IdentifiedToastProps, ToastActionContext } from './toast.types'
import { DEFAULT_DURATION, ERROR_DURATION, positionStyles } from './toast.utils'
import { ToastItem } from './ToastItem'
import './toast.css'

/**
 * Context provider and floating portal container for managing toast notifications.
 * Wraps the application tree to supply `addToast` and `removeToast` functions,
 * rendering active toasts inside a fixed DOM portal.
 *
 * @param props - Configuration props for default duration, position, and children.
 * @returns Provider wrapper with portal rendering for active toast items.
 */
export const ToastProvider = ({
  children,
  duration,
  position = 'bottom-right',
  icon: defaultIcon,
  showProgress: globalShowProgress = false,
  transition: globalTransition,
  renderToast,
  className,
  ...props
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IdentifiedToastProps[]>([])

  const durationConfig =
    (typeof duration == 'object' &&
      Object.assign(
        {
          success: DEFAULT_DURATION,
          error: ERROR_DURATION,
          warning: DEFAULT_DURATION,
          info: DEFAULT_DURATION,
          default: DEFAULT_DURATION,
          accent: DEFAULT_DURATION,
        },
        duration
      )) ||
    null

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = useCallback((id: string, newProps: Partial<IdentifiedToastProps>) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, ...newProps } : toast)))
  }, [])

  const addToast = useCallback(
    ({
      message,
      intent = 'default',
      color,
      title,
      duration: customDuration,
      showProgress = globalShowProgress,
      transition = globalTransition,
      loading = 'Processing...',
      success = 'Done!',
      error = 'Failed',
      action,
      icon: customIcon,
      preserveIntent = false,
    }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      let toastDuration = customDuration
      let initialIntent = intent
      const initialMessage = message || (action ? loading : undefined)

      if (action) {
        initialIntent = intent || 'default'
        toastDuration = Infinity
      }

      if (!toastDuration && durationConfig) {
        toastDuration = durationConfig[initialIntent]
      }

      // consumer passes a single duration for all the toast types
      if (typeof duration === 'number') {
        toastDuration = duration
      }

      // fallback duration
      if (toastDuration === undefined) {
        toastDuration = DEFAULT_DURATION
      }

      setToasts((prev) => [
        ...prev,
        {
          id,
          message: initialMessage,
          intent: initialIntent,
          color,
          title,
          duration: toastDuration,
          showProgress,
          transition,
          loading,
          success,
          error,
          action,
          icon: customIcon || defaultIcon,
          preserveIntent,
        },
      ])

      let isCancelled = false

      const controls: ToastActionContext = {
        cancel: (options) => {
          if (isCancelled) return
          isCancelled = true

          const targetIntent = options?.intent || initialIntent

          const cancelDuration =
            options?.duration ||
            (typeof duration === 'number' && duration) ||
            (typeof durationConfig === 'object' && durationConfig?.[targetIntent]) ||
            DEFAULT_DURATION

          updateToast(id, {
            action: undefined,
            intent: targetIntent,
            message: options?.message,
            title: options?.title,
            duration: cancelDuration,
            status: targetIntent === 'success' || targetIntent === 'error' ? targetIntent : undefined,
          })
        },
      }

      if (!action) return id

      // duration priority:
      // 1º provider duration if passed as number.
      // 2º provider duration if passed as object; (success or error)
      // 3º success (5000) and error (8000) if not customDuration passed (via the addToast)
      // 4º the duration (customDuration) passed via the addToast
      action(controls)
        .then(() => {
          if (isCancelled) return

          let successDuration =
            (typeof duration === 'number' && duration) ||
            (typeof durationConfig === 'object' && durationConfig?.success) ||
            DEFAULT_DURATION

          if (typeof customDuration === 'number') {
            successDuration = customDuration
          }

          updateToast(id, {
            message: success,
            intent: preserveIntent ? initialIntent : 'success',
            duration: successDuration,
            action: undefined,
            status: 'success',
          })
        })
        .catch(() => {
          if (isCancelled) return

          let errorDuration =
            (typeof duration === 'number' && duration) ||
            (typeof durationConfig === 'object' && durationConfig?.error) ||
            ERROR_DURATION

          if (typeof customDuration === 'number') {
            errorDuration = customDuration
          }

          updateToast(id, {
            message: error,
            intent: preserveIntent ? initialIntent : 'error',
            duration: errorDuration,
            action: undefined,
            status: 'error',
          })
        })

      return id
    },
    [durationConfig, duration, updateToast, defaultIcon, globalShowProgress, globalTransition]
  )

  const contextValue = useMemo(
    () => ({
      addToast,
      removeToast,
      updateToast,
      position,
      duration: duration || DEFAULT_DURATION,
    }),
    [addToast, removeToast, updateToast, position, duration]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            role="region"
            aria-label="Notifications"
            className={cn(
              'fixed p-4 sm:p-6 md:p-8 z-50 pointer-events-none flex flex-col w-full max-w-sm',
              positionStyles[position],
              className
            )}
            {...props}
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} renderToast={renderToast} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}
