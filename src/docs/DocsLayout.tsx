/**
 * @fileoverview Lithos UI documentation shell.
 * - Fixed-pane architecture: sidebars lock, main stage scrolls independently.
 * - Footer extracted to the bottom of the page, outside the grid.
 * - Root shell uses flexbox to push footer down when content is short.
 * - No gap utilities; spacing via px and py utilities on grid items.
 */
import type { ReactNode } from 'react'
import { DocsNavbar as Navbar } from './layout/Navbar'
import { Sidebar } from './layout/Sidebar'
import { TableOfContents } from './layout/TableOfContents'
import { Footer } from '../showroom/sections/Footer'
import { useDynamicStrata } from '../core/hooks/useDynamicStrata'

export const DocsLayout = ({ children }: { children: ReactNode }) => {
  const strataStyle = useDynamicStrata()

  return (
    <div className="min-h-screen flex flex-col bg-(--lithos-strata) text-(--lithos-text)" style={strataStyle}>
      <Navbar />

      <div className="flex-1 w-full flex flex-row pt-24 px-6 md:px-8 items-start justify-between">
        {/* Left rail - sticky sidebar pinned to the left edge of the viewport */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto no-scrollbar sidebar-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Sidebar />
          </div>
        </aside>

        {/* Center reading stage - optimal reading width, centered between rails */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto px-4 lg:px-10 xl:px-14 py-8 lg:py-12 [&_header_h1]:font-docs [&_h2[id]]:font-docs [&_h3[id]]:font-docs [&_h4[id]]:font-docs">
          {children}
        </main>

        {/* Right rail - sticky table of contents pinned to the right edge of the viewport */}
        <aside className="hidden xl:block w-60 xl:w-64 shrink-0 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto no-scrollbar sidebar-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TableOfContents />
          </div>
        </aside>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
