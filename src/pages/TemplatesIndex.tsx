import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { KineticGrid } from '../components/ui/KineticGrid'
import { templateCategories } from '../components/templates/registry'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { useDynamicStrata } from '../core/hooks/useDynamicStrata'

export const TemplatesIndex = () => {
  const navigate = useNavigate()
  const strataStyle = useDynamicStrata()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-(--lithos-strata) text-(--lithos-text)" style={strataStyle}>
        {/* Hero Section */}
        <section className="border-b-2 border-(--lithos-border)">
          <KineticGrid baseOpacity="opacity-10" className="pt-20 pb-12 md:pt-28 md:pb-24 w-full">
            <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
              <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
                  FULL PAGE COMPOSITIONS
                </p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
                  TEMPLATES
                </h1>
                <h2 className="mt-4 text-3xl sm:text-4xl font-display md:text-5xl italic font-medium text-(--lithos-accent) max-w-4xl mx-auto lg:mx-0">
                  Ready-to-ship architectures built purely from Lithos blocks.
                </h2>
              </div>
            </div>
          </KineticGrid>
        </section>

        {/* Category Catalog */}
        <section className="py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap -m-3">
              {templateCategories.map((category) => {
                const firstVariant = category.variants[0]
                if (!firstVariant) return null
                const FirstComponent = firstVariant.component

                return (
                  <div key={category.slug} className="w-full sm:w-[50%] lg:w-[33.333%] p-3">
                    <Card
                      interactive
                      onClick={() => navigate(`/templates/${category.slug}`)}
                      className="h-full flex flex-col p-0 cursor-pointer"
                    >
                      <div className="w-full h-48 overflow-hidden bg-(--lithos-surface) relative border-b-2 border-(--lithos-border) font-normal tracking-normal leading-normal">
                        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                          <div className="w-[300%] scale-[0.333] origin-top-left">
                            <FirstComponent />
                          </div>
                        </div>
                      </div>
                      <CardContent spacing="sm" className="grow flex flex-col justify-between bg-(--lithos-strata)">
                        <h3 className="text-xl font-black tracking-tighter leading-none text-(--lithos-text)">
                          <Link
                            to={`/templates/${category.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-(--lithos-accent) transition-colors"
                          >
                            {category.title}
                          </Link>
                        </h3>
                        <div className="mt-4 text-xs font-bold tracking-widest text-(--lithos-accent)">
                          {category.variants.length} Variant{category.variants.length !== 1 ? 's' : ''}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
