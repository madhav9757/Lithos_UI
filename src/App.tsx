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
