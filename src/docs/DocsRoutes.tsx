import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'
import { DOC_PAGES } from '../core/lithos.utils'
import { NotFound } from '../showroom/sections/NotFound'

export const DocsRoutes = () => {
  return (
    <DocsLayout>
      <Suspense fallback={null}>
        <Routes>
          {DOC_PAGES.map(({ path, loader }) => {
            const LazyComponent = lazy(loader)

            return <Route key={path || 'index'} path={`${path ? `/${path}` : ''}`} element={<LazyComponent />} />
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </DocsLayout>
  )
}
