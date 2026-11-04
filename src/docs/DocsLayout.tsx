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

      <div className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-12 pt-24 items-start">
        <div className="hidden lg:block lg:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto no-scrollbar sidebar-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Sidebar />
          </div>
        </div>

        <main className="col-span-12 lg:col-span-10 xl:col-span-8 px-6 lg:px-12 py-12 [&_header_h1]:font-docs [&_h2[id]]:font-docs [&_h3[id]]:font-docs [&_h4[id]]:font-docs">
          {children}
        </main>

        <div className="hidden xl:block xl:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto no-scrollbar sidebar-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TableOfContents />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
