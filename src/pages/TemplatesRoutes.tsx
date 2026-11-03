import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from '../showroom/sections/NotFound'

const TemplatesIndex = lazy(() => import('./TemplatesIndex').then((m) => ({ default: m.TemplatesIndex })))
const TemplatePreviewPage = lazy(() =>
  import('./TemplatePreviewPage').then((m) => ({ default: m.TemplatePreviewPage }))
)
const TemplateCategoryPage = lazy(() =>
  import('./TemplateCategoryPage').then((m) => ({ default: m.TemplateCategoryPage }))
)

export const TemplatesRoutes = () => {
  return (
    <Routes>
      <Route index element={<TemplatesIndex />} />
      <Route path="preview/:slug" element={<TemplatePreviewPage />} />
      <Route path=":categorySlug" element={<TemplateCategoryPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
