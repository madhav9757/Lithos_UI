/**
 * @fileoverview Lithos UI - Root Application Shell
 *
 * Minimal architectural shell responsible for:
 * - Dynamic theming class application
 * - Routing configuration via React Router
 * - Component composition (Showroom, NotFound routes)
 */
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ButtonDoc } from './docs/pages/Button'
import { CalendarDoc } from './docs/pages/Calendar'
import { DatePickerDoc } from './docs/pages/DatePicker'
import { CardDoc } from './docs/pages/Card'
import { CarouselDoc } from './docs/pages/Carousel'
import { CheckboxDoc } from './docs/pages/Checkbox'
import { CommandDoc } from './docs/pages/Command'
import { ComingSoon } from './showroom/sections/ComingSoon'
import { ComponentsIndex } from './pages/ComponentsIndex'
import { DialogDoc } from './docs/pages/Dialog'
import { DropdownDoc } from './docs/pages/Dropdown'
import { DrawerDoc } from './docs/pages/Drawer'
import { DocsLayout } from './docs/DocsLayout'
import { Faq } from './pages/Faq'
import { InputDoc } from './docs/pages/Input'
import { IconsDoc } from './docs/pages/Icons'
import { Installation } from './docs/pages/Installation'
import { Introduction } from './docs/pages/Introduction'
import { KbdDoc } from './docs/pages/Kbd'
import { MarqueeDoc } from './docs/pages/Marquee'
import { PopoverPage } from './docs/pages/Popover'
import { NotFound } from './showroom/sections/NotFound'
import { SelectDoc } from './docs/pages/Select'
import { SkeletonDoc } from './docs/pages/Skeleton'
import { SliderDoc } from './docs/pages/Slider'
import { SpinnerDoc } from './docs/pages/Spinner'
import { Showroom } from './showroom/Index'
import { ToastDoc } from './docs/pages/Toast'
import { ToggleDoc } from './docs/pages/Toggle'
import { TabsDoc } from './docs/pages/Tabs'
import { TableDoc } from './docs/pages/Table'
import { PaginationDoc } from './docs/pages/Pagination'
import { TypographyDoc } from './docs/pages/Typography'
import { SidebarDoc } from './docs/pages/Sidebar'
import { ThemeBuilder } from './pages/ThemeBuilder'
import { TooltipDoc } from './docs/pages/Tooltip'
import { MiniThemeEngine } from './components/ui/MiniThemeEngine'
import { NotFound } from './showroom/sections/NotFound'
import { LithosLogo } from './components/ui/LithosLogo'

const Showroom = lazy(() => import('./showroom/Index').then(({ Showroom }) => ({ default: Showroom })))
const ComingSoon = lazy(() =>
  import('./showroom/sections/ComingSoon').then(({ ComingSoon }) => ({ default: ComingSoon }))
)
const ComponentsIndex = lazy(() =>
  import('./pages/ComponentsIndex').then(({ ComponentsIndex }) => ({ default: ComponentsIndex }))
)
const Faq = lazy(() => import('./pages/Faq').then(({ Faq }) => ({ default: Faq })))
const ThemeBuilder = lazy(() => import('./pages/ThemeBuilder').then(({ ThemeBuilder }) => ({ default: ThemeBuilder })))

const DocsSection = lazy(() => import('./docs/DocsRoutes').then(({ DocsRoutes }) => ({ default: DocsRoutes })))
const BlocksSection = lazy(() => import('./pages/BlocksRoutes').then(({ BlocksRoutes }) => ({ default: BlocksRoutes })))
const TemplatesSection = lazy(() =>
  import('./pages/TemplatesRoutes').then(({ TemplatesRoutes }) => ({ default: TemplatesRoutes }))
)

const RouteLoading = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-(--lithos-bg) absolute inset-0 z-100"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <LithosLogo
      collapsed
      className="text-(--lithos-bg) h-25 w-25 animate-[lithos-route-loading_1.75s_ease-in-out_infinite] motion-reduce:animate-none"
    />
    <span className="sr-only text-(--lithos-bg)">Loading</span>
  </div>
)

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

const renderDocRoutes = () => {
  const docPages = [
    { path: '', component: Introduction },
    { path: 'alert', component: AlertDoc },
    { path: 'avatar', component: AvatarDoc },
    { path: 'accordion', component: AccordionDoc },
    { path: 'badge', component: BadgeDoc },
    { path: 'breadcrumb', component: BreadcrumbDoc },
    { path: 'button', component: ButtonDoc },
    { path: 'calendar', component: CalendarDoc },
    { path: 'date-picker', component: DatePickerDoc },
    { path: 'card', component: CardDoc },
    { path: 'carousel', component: CarouselDoc },
    { path: 'icons', component: IconsDoc },
    { path: 'input', component: InputDoc },
    { path: 'checkbox', component: CheckboxDoc },
    { path: 'command', component: CommandDoc },
    { path: 'dialog', component: DialogDoc },
    { path: 'dropdown', component: DropdownDoc },
    { path: 'drawer', component: DrawerDoc },
    { path: 'installation', component: Installation },
    { path: 'kbd', component: KbdDoc },
    { path: 'marquee', component: MarqueeDoc },
    { path: 'popover', component: PopoverPage },
    { path: 'select', component: SelectDoc },
    { path: 'sidebar', component: SidebarDoc },
    { path: 'skeleton', component: SkeletonDoc },
    { path: 'slider', component: SliderDoc },
    { path: 'spinner', component: SpinnerDoc },
    { path: 'toast', component: ToastDoc },
    { path: 'toggle', component: ToggleDoc },
    { path: 'tabs', component: TabsDoc },
    { path: 'table', component: TableDoc },
    { path: 'pagination', component: PaginationDoc },
    { path: 'typography', component: TypographyDoc },
    { path: 'tooltip', component: TooltipDoc },
  ]

  return docPages.map(({ path, component: Component }) => (
    <Route
      key={path || 'index'}
      path={`/docs${path ? `/${path}` : ''}`}
      element={
        <DocsLayout>
          <Component />
        </DocsLayout>
      }
    />
  ))
}

/**
 * App Component - Orchestrates theme state, routing, and renders application UI.
 *
 * Routing structure:
 * - "/" → Showroom (main landing page)
 * - "*" → NotFound (catch-all for undefined routes)
 */
export const App = () => {
  return (
    <div className="min-h-screen bg-(--lithos-bg) text-(--lithos-text) relative">
      {/* Theme hook is mounted at the app root so accent persistence applies on every route. */}
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Showroom />} />

            {/* Section-level code splitting chunks */}
            <Route path="/blocks/*" element={<BlocksSection />} />
            <Route path="/docs/*" element={<DocsSection />} />
            <Route path="/templates/*" element={<TemplatesSection />} />

            <Route
              path="/coming-soon"
              element={
                <ComingSoon
                  eyebrow="ACTIVE ENGINEERING ZONE"
                  title="Work In Progress"
                  description="Lithos UI is an open-source architecture, and developers are actively encouraged to contribute code to engineer this structural block."
                  primaryAction={{ label: 'Go to Docs', to: '/docs' }}
                  secondaryAction={{ label: 'Contribute Code', href: 'https://github.com/lithosui/Lithos_UI/issues' }}
                />
              }
            />
            <Route path="/components" element={<ComponentsIndex />} />

            <Route path="/faq" element={<Faq />} />
            <Route path="/theme" element={<ThemeBuilder />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <MiniThemeEngine />
      </BrowserRouter>
    </div>
  )
}
