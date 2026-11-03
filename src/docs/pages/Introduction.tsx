import { RouteLink } from '../../components/site/RouteLink'

export const Introduction = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Introduction
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Why A Neo-Brutalist Library?
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          When I set out to build Lithos UI, my goal wasn&apos;t just to add another generic component library to the
          ecosystem. I wanted to build something genuinely impactful-a tool that developers could rely on to solve real
          layout problems without fighting the framework.
        </p>
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Most design systems look great on the surface but break under pressure because of unpredictable spacing. I
          wanted to engineer a solution built on absolute structural integrity, using explicit mathematics and our
          Zero-Gap law to guarantee predictability.
        </p>
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Welcome to Lithos UI. It is 100% free, open-source, and built for developers who care about precision,
          brutalist aesthetics, and creating interfaces that are actually useful and durable in production.
        </p>
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          You can now install Lithos UI via NPM for a streamlined workflow, or continue using our manual copy-paste
          approach for absolute control.
        </p>
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Follow the{' '}
          <RouteLink
            to="/docs/installation"
            className="text-lg md:text-xl underline decoration-2 underline-offset-4 decoration-inherit hover:decoration-(--lithos-accent) transition-colors duration-200"
            importRoute={() => import('./Installation')}
          >
            Installation Guide
          </RouteLink>{' '}
          to get started.
        </p>
      </header>

      <div
        id="welcome-video"
        className="w-full aspect-video border-2 mt-12 mb-16 scroll-mt-32 relative overflow-hidden"
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/9ORW8yjorJE?si=rO7sIYy9tUHkcZPa"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
