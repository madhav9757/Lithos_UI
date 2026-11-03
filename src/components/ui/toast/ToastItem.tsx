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
import type { ToastItemProps, ToastIconConfig } from './toast.types'
import { DEFAULT_DURATION, ICONS_MAP, TRANSITION_MAP } from './toast.utils'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import type { IconProps } from '../icons/icons.types'
import { isHexColor } from '../../../core/types'
import { useToast } from './useToast'
import { useSwipe } from '../../../core/hooks/useSwipe'

/**
 * Individual toast notification tile component.
 * Renders an accessible alert panel with dynamic color contrast, pause-on-hover timers,
 * progress indicator, and custom transition animations.
 *
 * @param props - Customization, item data payload, and removal callback props.
 * @returns Accessible toast notification element.
 */
export const ToastItem = ({ toast, renderToast, className }: ToastItemProps) => {
  const {
    message,
    intent = 'default',
    color,
    title,
    duration,
    label,
    action,
    icon,
    showProgress = false,
    transition,
  } = toast
  const { position, removeToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [animated, setAnimated] = useState(false)
  const toastRef = useRef<HTMLDivElement | null>(null)

  const resolvedDuration = duration ?? DEFAULT_DURATION

  const [isTabHidden, setIsTabHidden] = useState(false)
  const isError = intent === 'error'

  const onRemove = () => removeToast(toast.id)

  const swipePlacement = position?.includes('left') ? 'left' : 'right'
  const {
    handlers,
    style: swipeStyle,
    isDragging,
  } = useSwipe({
    placement: swipePlacement,
    open: true,
    onDismiss: onRemove,
    threshold: 70,
  })

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

  const remainingTimeRef = useRef(resolvedDuration)
  const timerIdRef = useRef<number | null>(null)
  const startTimeRef = useRef(Date.now())

  // Sync remaining time when resolvedDuration changes (e.g., when an async action finishes and updates its duration)
  useEffect(() => {
    remainingTimeRef.current = resolvedDuration
  }, [resolvedDuration])

  useEffect(() => {
    // If there's hover, the tab is hidden or there's a running action -> do not apply auto-dismiss
    if (isHovered || isTabHidden || action) {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current)
        timerIdRef.current = null

        const elapsed = Date.now() - startTimeRef.current
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
      }
      return
    }

    // Set start time for the current running slice
    startTimeRef.current = Date.now()
    const currentRemaining = remainingTimeRef.current || resolvedDuration

    timerIdRef.current = setTimeout(onRemove, currentRemaining)

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current)
        timerIdRef.current = null
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isError, resolvedDuration, action, isTabHidden])

  const isAccent = intent === 'accent'
  const bgColor = color || (isAccent ? 'var(--lithos-accent)' : colors[intent as keyof typeof colors]) || colors.default
  const textColor =
    isAccent && !color
      ? 'var(--lithos-accent-text)'
      : isHexColor(bgColor)
        ? getContrastText(bgColor)
        : 'var(--lithos-text)'

  const ariaLabel = label ?? 'Close notification'

  const livePriority = isError ? 'assertive' : 'polite'
  const role = isError ? 'alert' : 'status'

  // default value should follow the 'bottom-right' position... so we set false
  // if not found
  const isTopPosition = position?.includes('top') ?? false

  const defaultContent = (
    <>
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center space-x-2">
          <div className="shrink-0 flex items-center">
            {(() => {
              let currentState: keyof typeof ICONS_MAP = intent
              let isFinishedAction = false

              if (isLoading) {
                currentState = 'loading'
              } else if (!action) {
                if (toast.status === 'success') {
                  currentState = 'success'
                  isFinishedAction = true
                }
                if (toast.status === 'error') {
                  currentState = 'error'
                  isFinishedAction = true
                }
              }

              const isIconObject = icon && typeof icon === 'object' && !isValidElement(icon)
              let candidateIcon: ToastIconConfig

              if (isIconObject) {
                const iconMap = icon as Record<string, ToastIconConfig>
                const defaultIcon = iconMap['default']

                if (isLoading) {
                  candidateIcon = iconMap['loading'] || iconMap[intent] || defaultIcon
                } else if (isFinishedAction) {
                  candidateIcon = iconMap[toast.status!] || defaultIcon
                } else {
                  candidateIcon = iconMap[intent] || defaultIcon
                }
              } else {
                candidateIcon = icon
              }

              if (isValidElement(candidateIcon)) return candidateIcon

              if (typeof candidateIcon === 'function') {
                const CustomIcon = candidateIcon as (props: IconProps) => ReactNode
                return <CustomIcon size={18} aria-hidden={true} />
              }

              if (isLoading && !candidateIcon) {
                return <Spinner size={18} aria-hidden={true} />
              }

              const activeFallbackState = isLoading && !isIconObject ? 'loading' : currentState
              const FallbackIcon = ICONS_MAP[activeFallbackState] || ICONS_MAP[intent] || ICONS_MAP.default

              return <FallbackIcon size={18} aria-hidden={true} />
            })()}
          </div>

          {title && (
            <Typography variant="h4" className="font-black text-base uppercase tracking-tighter leading-none m-0">
              {title}
            </Typography>
          )}
        </div>

        <Button
          onClick={onRemove}
          className="shrink-0"
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
    </>
  )

  // Resolve transition animation style (default to slide-down for top positions, slide-up for bottom)
  const defaultTransition = isTopPosition ? 'slide-down' : 'slide-up'
  const activeTransition = transition ?? defaultTransition
  const transitionClass = TRANSITION_MAP[activeTransition] ?? TRANSITION_MAP[defaultTransition]

  return (
    <div
      ref={toastRef}
      role={role}
      aria-live={livePriority}
      tabIndex={isError ? -1 : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onAnimationEnd={() => setAnimated(true)}
      {...handlers}
      className={cn(
        'transition-[background-color,color,translate] ease-in-out pointer-events-auto touch-none select-none border-2 border-(--lithos-border) mb-4 p-3 sm:p-3.5 w-full max-w-xs relative flex flex-col items-start shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
        !animated && transitionClass,
        isDragging && 'cursor-grabbing',
        className
      )}

      /* - Per-toast override keeps contrast local to the alert tile. */
      style={{
        backgroundColor: bgColor,
        color: textColor,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        ...swipeStyle,
        transition: isDragging ? 'none' : 'transform 0.15s ease-in-out, opacity 0.15s ease-in-out',
      }}
    >
      {renderToast ? renderToast(toast, { onRemove }) : defaultContent}

      {showProgress && duration !== Infinity && (
        <div
          className="absolute bottom-0 left-0 h-1 w-full opacity-75 overflow-hidden"
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundColor: textColor,
              transformOrigin: 'left',
              animation: `shrink-progress ${duration}ms linear forwards`,
              animationPlayState: isHovered || isTabHidden ? 'paused' : 'running',
            }}
          />
        </div>
      )}
    </div>
  )
}
