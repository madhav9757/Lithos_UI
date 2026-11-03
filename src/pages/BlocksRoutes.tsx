import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from '../showroom/sections/NotFound'

const BlocksIndex = lazy(() => import('./BlocksIndex').then((m) => ({ default: m.BlocksIndex })))
const BlockPreviewPage = lazy(() => import('./BlockPreviewPage').then((m) => ({ default: m.BlockPreviewPage })))
const BlockCategoryPage = lazy(() => import('./BlockCategoryPage').then((m) => ({ default: m.BlockCategoryPage })))

export const BlocksRoutes = () => {
  return (
    <Routes>
      <Route index element={<BlocksIndex />} />
      <Route path="preview/:slug" element={<BlockPreviewPage />} />
      <Route path=":categorySlug" element={<BlockCategoryPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
