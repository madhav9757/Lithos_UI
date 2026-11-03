/**
 * @fileoverview Route button component with intersection prefetching.
 * - Wraps the UI Button component with declarative internal SPA navigation.
 * - Automatically triggers route chunk prefetching when entering the viewport.
 */
import { useNavigate } from 'react-router-dom'
import { Button, type ButtonProps } from '../ui/Button'
import { useIntersectionPrefetch, type IntersectionPrefetchProps } from '../../core/hooks/useIntersectionPrefetch'

interface RouteButtonProps extends Omit<ButtonProps, 'onClick'>, IntersectionPrefetchProps {
  to: string
}

export const RouteButton = ({ to, importRoute, rootMargin, children, ...props }: RouteButtonProps) => {
  const navigate = useNavigate()
  const buttonRef = useIntersectionPrefetch<HTMLButtonElement>({ importRoute, rootMargin })

  return (
    <Button ref={buttonRef} onClick={() => navigate(to)} {...props}>
      {children}
    </Button>
  )
}
