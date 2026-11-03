/**
 * @fileoverview Route link component with intersection prefetching.
 * - Wraps react-router-dom Link with intersection observer prefetch logic.
 * - Automatically triggers route chunk prefetching when entering the viewport.
 */
import { Link, type LinkProps } from 'react-router-dom'
import { useIntersectionPrefetch, type IntersectionPrefetchProps } from '../../core/hooks/useIntersectionPrefetch'

interface RouteLinkProps extends LinkProps, IntersectionPrefetchProps {}

export const RouteLink = ({ to, importRoute, rootMargin, children, ...props }: RouteLinkProps) => {
  const linkRef = useIntersectionPrefetch<HTMLAnchorElement>({ importRoute, rootMargin })

  return (
    <Link ref={linkRef} to={to} {...props}>
      {children}
    </Link>
  )
}
