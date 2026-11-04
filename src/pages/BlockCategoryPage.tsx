import { useParams, Link } from 'react-router-dom'
import { blockCategories } from '../components/blocks/registry'
import { ComingSoon } from '../showroom/sections/ComingSoon'
import { PreviewBlock } from '../components/ui/PreviewBlock'
import { SetupGuide } from '../docs/layout/SetupGuide'
import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { useDynamicStrata } from '../core/hooks/useDynamicStrata'

const rewriteBlockImports = (code: string): string => {
  const importsToCombine: string[] = []

  // Extract all the imported items and remove those lines
  const codeWithoutLithosImports = code.replace(
    /^import\s+({[^}]+})\s+from\s+['"](?:\.\.\/)+(?:ui|utils|core)\/[^'"]+['"]/gm,
    (_match, p1) => {
      // Extract the named imports like "Badge, Button" from "{ Badge, Button }"
      const items = p1
        .replace(/[{}]/g, '')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean)
      importsToCombine.push(...items)
      return '' // Remove the original import line
    }
  )

  if (importsToCombine.length === 0) return code

  // Deduplicate, sort, and combine into a single clean import
  const uniqueImports = Array.from(new Set(importsToCombine)).sort()
  const combinedImport = `import { ${uniqueImports.join(', ')} } from 'lithos-ui'`

  // Clean up any double blank lines left by removing the original imports
  const cleanCode = codeWithoutLithosImports.replace(/^\s*[\r\n]{2,}/gm, '\n')

  return `${combinedImport}\n\n${cleanCode.trimStart()}`
}

export const BlockCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const strataStyle = useDynamicStrata()

  const category = blockCategories.find((c) => c.slug === categorySlug)

  if (!category) {
    return (
      <ComingSoon
        eyebrow="404 NOT FOUND"
        title="Unknown Category"
        description="The block category you're looking for doesn't exist in the registry or hasn't been built yet."
        primaryAction={{ label: 'Back to Blocks', to: '/blocks' }}
      />
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-(--lithos-strata) text-(--lithos-text)" style={strataStyle}>
        <section>
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-24">
            <Link
              to="/blocks"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-(--lithos-accent) mb-8 hover:opacity-80"
            >
              ← Back to Catalog
            </Link>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
              {category.title}
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) font-body max-w-3xl">
              {category.description}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-(--lithos-bg)">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col space-y-24">
              {category.variants.map((variant, index) => (
                <div key={variant.slug} id={`variant-${variant.slug}`} className="scroll-mt-32">
                  <h3 className="text-3xl font-black tracking-tighter mb-2 border-b-2 border-(--lithos-border) pb-4 text-(--lithos-text)">
                    {index + 1}
                  </h3>
                  <p className="font-body text-lg text-(--lithos-text) opacity-80 mb-8">{variant.name}</p>
                  <PreviewBlock
                    code={rewriteBlockImports(variant.code)}
                    githubUrl={variant.githubUrl}
                    slug={variant.slug}
                    height="600px"
                    noPadding={category.slug === 'navbars'}
                    installGuide={
                      <SetupGuide
                        bordered={false}
                        manualOnly
                        componentNames={[variant.exportName]}
                        manualPath={`../../components/blocks/${variant.githubUrl.split('src/components/blocks/')[1]?.replace('.tsx', '')}`}
                      />
                    }
                  >
                    <div className={category.slug === 'navbars' ? 'w-full relative h-100' : 'w-full'}>
                      <variant.component />
                    </div>
                  </PreviewBlock>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
