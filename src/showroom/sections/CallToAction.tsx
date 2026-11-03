/**
 * @fileoverview Lithos UI final call to action banner.
 * - Bold neo-brutalist anchor section directing developers to documentation and GitHub.
 */
import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { IconArrowRight } from '../../components/ui/icons'
import { useTheme } from '../../core/hooks/useTheme'

export const CallToAction = () => {
  const navigate = useNavigate()
  const { accentColor } = useTheme()

  return (
    <section className="border-b-2 border-(--lithos-border) bg-(--lithos-strata) py-24 md:py-32 relative overflow-hidden">
      <style>{`
        @font-palette-values --nabla-cta-accent {
          font-family: 'Nabla';
          base-palette: 0;
          override-colors:
            0 ${accentColor},
            1 ${accentColor},
            2 ${accentColor},
            3 ${accentColor},
            4 ${accentColor},
            5 ${accentColor},
            6 ${accentColor},
            7 ${accentColor},
            8 ${accentColor},
            9 ${accentColor};
        }

        .nabla-outline {
          text-shadow:
            0.018em 0 0 var(--lithos-border),
            -0.018em 0 0 var(--lithos-border),
            0 0.018em 0 var(--lithos-border),
            0 -0.018em 0 var(--lithos-border);
        }
      `}</style>
      <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
        <div className="inline-block border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) px-3 py-1 text-xs font-mono font-black uppercase tracking-widest rounded-(--lithos-radius) shadow-[3px_3px_0px_0px_var(--lithos-shadow)] mb-6">
          READY FOR PRODUCTION
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-nabla [font-palette:--nabla-cta-accent] nabla-outline tracking-normal leading-[1.45] py-3 px-4 sm:px-8 mb-8 overflow-visible inline-block max-w-full"
          style={{ fontPalette: '--nabla-cta-accent' } as CSSProperties}
        >
          <span className="block py-1 sm:py-2 overflow-visible">BUILD FRONTENDS THAT</span>
          <span className="block py-1 sm:py-2 overflow-visible">REFUSE TO BREAK</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-xl font-medium text-(--lithos-text) opacity-80 mb-10">
          Zero-gap stability, automated YIQ contrast protection, and 100% code ownership. Your project deserves an
          interface with real weight.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            variant="primary"
            onClick={() => navigate('/docs/installation')}
            iconRight={<IconArrowRight size={16} />}
            className="w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center"
          >
            Get Started in 30s
          </Button>

          <Button
            variant="secondary"
            onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center"
          >
            Star on GitHub ★
          </Button>
        </div>
      </div>
    </section>
  )
}
