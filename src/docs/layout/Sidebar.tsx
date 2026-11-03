import { useLocation } from 'react-router-dom'
import { RouteLink } from '../../components/site/RouteLink'
import { Badge } from '../../components/ui/Badge'
import { gettingStartedPages, componentPages } from '../../core/lithos.utils'
import { getUnreleasedComponentInfo } from '../../core/unreleasedRegistry'

export const Sidebar = () => {
  const location = useLocation()

  const getPillClass = (path: string) => {
    const isActive = location.pathname === path
    const baseClass =
      'inline-flex items-center w-fit px-3 py-1.5 text-xs font-bold transition-all duration-150 ease-out border-2 rounded-(--lithos-radius)'

    return isActive
      ? `${baseClass} border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0_0_var(--lithos-border)]`
      : `${baseClass} border-transparent text-(--lithos-text) group-hover/sidebar-item:bg-[color-mix(in_srgb,var(--lithos-text)_5%,transparent)] group-hover/sidebar-item:text-(--lithos-text)`
  }

  return (
    <aside className="py-8 pr-6">
      {/* Getting Started Category */}
      <div className="mb-8">
        <h3 className="text-xs font-display opacity-50 mb-3 px-4 uppercase">Getting Started</h3>
        <nav className="flex flex-col w-full pl-4 space-y-1">
          {gettingStartedPages.map((page) => {
            return (
              <RouteLink
                key={page.to}
                to={page.to}
                importRoute={page.loader}
                rootMargin="50px"
                className="group/sidebar-item flex items-center w-full"
              >
                <span className={getPillClass(page.to)}>{page.label}</span>
              </RouteLink>
            )
          })}
        </nav>
      </div>

      {/* Atomic Components Category */}
      <div>
        <h3 className="text-xs font-display opacity-50 mb-3 px-4 uppercase">Components ({componentPages.length})</h3>
        <nav className="flex flex-col w-full pl-4 space-y-1">
          {componentPages.map((page) => {
            const unreleasedInfo = getUnreleasedComponentInfo(page.path)
            const isActive = location.pathname === page.to

            return (
              <RouteLink
                key={page.to}
                to={page.to}
                importRoute={page.loader}
                rootMargin="35px"
                className="group/sidebar-item flex items-center w-full"
              >
                <span className={getPillClass(page.to)}>
                  <span>{page.label}</span>
                  {unreleasedInfo && (
                    <Badge
                      size="sm"
                      intent={isActive ? 'default' : 'accent'}
                      className="ml-2 py-0 px-1 text-[9px] font-mono font-black uppercase tracking-wider"
                    >
                      {unreleasedInfo.badgeLabel}
                    </Badge>
                  )}
                </span>
              </RouteLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
