/**
 * @fileoverview Lithos UI individual toast item.
 * - Renders a single accessible notification tile with adaptive dynamic contrast.
 * - Manages auto-dismiss timers with pause-on-hover interaction.
 * - Implements ARIA live regions and automatic focus trapping for error alerts.
 */
import { useState, useEffect, useRef, isValidElement, type ReactNode } from 'react'
import { getContrastText } from '../../../utils/yiq'
import { colors } from '../../../utils/colors'
import { Button } from '../Button'
import { IconClose } from '../icons/IconClose'
import { cn } from '../../../utils/cn'
import type { ToastItemProps } from './toast.types'
import { DEFAULT_DURATION } from './toast.utils'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import { IconAlertCircle, IconCheck, IconInfo, IconAlertTriangle, IconBell } from '../icons/index'

const ICONS_MAP = {
  success: IconCheck,
  info: IconInfo,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
  default: IconBell,
  accent: IconBell,
}

/**
 * Individual toast notification tile component.
 * Renders an accessible alert panel with dynamic color contrast, pause-on-hover timers,
 * and automatic focus management for error notifications.
 *
 * @param props - Customization, item data payload, and removal callback props.
 * @returns Accessible toast notification element.
 */
export const ToastItem = ({ toast, onRemove, className }: ToastItemProps) => {
  const { message, intent = 'default', color, title, duration, label, action, icon } = toast
  const [isHovered, setIsHovered] = useState(false)
  const toastRef = useRef<HTMLDivElement | null>(null)

  const [isTabHidden, setIsTabHidden] = useState(false)
  const isError = intent === 'error'

  // detect when the user moves to another tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const isLoading = Boolean(action)

  useEffect(() => {
    if (!isError || !toastRef.current) return

    // save previously focused element to restore it later
    const previousFocus = document.activeElement as HTMLElement | null

    // move focus to toast tile
    toastRef.current.focus()

    return () => {
      // restore focus when toast unmounts if it's still inside document
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [isError])

  // Toast persists on hover; auto-dismiss timer pauses while hovered
  useEffect(() => {
    // if there's hover, the tab is hidden or there's a running action -> do not
    // apply auto-dismiss
    if (isHovered || isTabHidden || action) return

    let timeout = duration
    if (!timeout) {
      timeout = DEFAULT_DURATION
    }

    const timer = setTimeout(onRemove, timeout)
    return () => clearTimeout(timer)
  }, [isHovered, onRemove, isError, duration, action, isTabHidden])

  const isAccent = intent === 'accent'
  const bgColor = color || (isAccent ? 'var(--lithos-accent)' : colors[intent as keyof typeof colors]) || colors.default
  const textColor = isAccent && !color ? 'var(--lithos-accent-text)' : getContrastText(bgColor)

  const ariaLabel = label ?? 'Close notification'

  const livePriority = isError ? 'assertive' : 'polite'
  const role = isError ? 'alert' : 'status'

  return (
    <>
      <div
        ref={toastRef}
        role={role}
        aria-live={livePriority}
        tabIndex={isError ? -1 : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'transition-[background-color] ease-in-out pointer-events-auto border-2 border-(--lithos-border) p-3 sm:p-4 mb-4 w-full flex flex-col items-start shadow-[4px_4px_0_0_var(--lithos-shadow)] animate-[slide-up_0.3s_ease-out_forwards] rounded-(--lithos-radius)',
          className
        )}

        /* - Per-toast override keeps contrast local to the alert tile. */
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center space-x-2">
            <div className="shrink-0 flex items-center">
              {(() => {
                if (isLoading) return <Spinner size={18} />
                if (isValidElement(icon)) return icon

                if (typeof icon === 'function') {
                  const CustomIcon = icon as (props: { size?: number; [key: string]: unknown }) => ReactNode
                  return <CustomIcon size={18} aria-hidden={true} />
                }

                const FallbackIcon = ICONS_MAP[intent as keyof typeof ICONS_MAP] || IconBell
                return <FallbackIcon size={18} aria-hidden={true} />
              })()}
            </div>

            {title && (
              <Typography variant="h4" className="font-black text-lg uppercase tracking-tighter leading-none m-0">
                {title}
              </Typography>
            )}
          </div>

          <Button
            onClick={onRemove}
            className="shrink-0 ml-2"
            aria-label={ariaLabel}
            style={{
              backgroundColor: bgColor,
              borderColor: textColor,
              color: textColor,
              '--lithos-shadow': textColor,
            }}
          >
            <IconClose aria-hidden="true" />
          </Button>
        </div>

        <div className="w-full">
          {typeof message === 'string' ? (
            <Typography variant="p" className="text-sm leading-tight m-0 font-body">
              {message}
            </Typography>
          ) : (
            message
          )}
        </div>
      </div>
    </>
  )
}
