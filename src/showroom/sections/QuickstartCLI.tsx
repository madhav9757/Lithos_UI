/**
 * @fileoverview Lithos UI CLI quickstart showcase.
 * - Interactive terminal snippet demonstrating zero-lock-in installation.
 * - Single-command workflow: `add` auto-initializes lithos.json if missing.
 * - Supports pnpm, npm, yarn, bun with one-click copy.
 */
import { useState } from 'react'
import { IconCopy, IconCheck } from '../../components/ui/icons'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const COMMANDS: Record<PackageManager, string> = {
  pnpm: 'pnpm dlx lithos-ui add button card dialog',
  npm: 'npx lithos-ui add button card dialog',
  yarn: 'yarn dlx lithos-ui add button card dialog',
  bun: 'bunx lithos-ui add button card dialog',
}

export const QuickstartCLI = () => {
  const [pm, setPm] = useState<PackageManager>('pnpm')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const activeCommand = COMMANDS[pm]

  return (
    <section id="quickstart" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-accent) mb-3">
            SINGLE-COMMAND SETUP
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none text-(--lithos-text)">
            COPY. PASTE. SHIP.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-(--lithos-text) opacity-80 font-medium">
            No manual configuration required. Running{' '}
            <code className="font-mono font-bold text-(--lithos-accent)">add</code> auto-initializes your tokens,
            configures Tailwind, and injects clean primitives directly into your project.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto border-4 border-(--lithos-border) bg-(--lithos-bg) rounded-(--lithos-radius) shadow-[8px_8px_0px_0px_var(--lithos-shadow)] overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b-2 border-(--lithos-border) bg-(--lithos-surface) px-4 py-3">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <span className="w-3 h-3 border-2 border-(--lithos-border) bg-[#ff5f56] rounded-full inline-block" />
              <span className="w-3 h-3 border-2 border-(--lithos-border) bg-[#ffbd2e] rounded-full inline-block" />
              <span className="w-3 h-3 border-2 border-(--lithos-border) bg-[#27c93f] rounded-full inline-block" />
              <span className="ml-3 font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                lithos-cli ~ v0.1.4
              </span>
            </div>

            {/* PM Switcher Tabs */}
            <div className="flex items-center w-full sm:w-auto border-2 border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden mt-3 sm:mt-0">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab, idx) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPm(tab)}
                  className={`flex-1 sm:flex-initial sm:px-4 py-1.5 px-3 font-mono text-xs font-bold transition-colors cursor-pointer text-center ${
                    idx > 0 ? 'border-l-2 border-(--lithos-border)' : ''
                  } ${
                    pm === tab
                      ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                      : 'bg-(--lithos-bg) text-(--lithos-text) hover:bg-(--lithos-surface)'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm sm:text-base space-y-5 bg-(--lithos-bg)">
            {/* Command Box */}
            <div className="flex items-center justify-between border-2 border-(--lithos-border) bg-(--lithos-surface) p-4 rounded-(--lithos-radius) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
              <div className="flex items-center space-x-3 overflow-x-auto py-1">
                <span className="text-(--lithos-accent) select-none font-black text-lg">$</span>
                <span className="text-(--lithos-text) font-bold text-base sm:text-lg tracking-tight">
                  {activeCommand}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(activeCommand)}
                aria-label="Copy add command"
                className="ml-4 shrink-0 px-3 py-2 border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-bg) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) text-xs font-black uppercase lithos-click flex items-center space-x-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <IconCheck size={14} />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <IconCopy size={14} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Execution Feedback Output */}
            <div className="border-2 border-dashed border-(--lithos-border) bg-(--lithos-bg) p-4 rounded-(--lithos-radius) text-xs font-mono text-(--lithos-text) opacity-80 space-y-1">
              <p className="text-(--lithos-accent) font-bold">i lithos.json not found. Initializing automatically...</p>
              <p>✓ Generated src/tokens.css & tailwind theme tokens</p>
              <p>✓ Downloaded Button.tsx, Card.tsx, Dialog.tsx</p>
              <p>✓ Resolved transitive dependencies (yiq, cn, icons)</p>
              <p className="text-[#27c93f] font-bold mt-2">✔ Ready to import into your React views!</p>
            </div>
          </div>

          {/* Quick Pillars Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t-2 border-(--lithos-border) bg-(--lithos-surface) text-xs font-mono font-bold">
            <div className="p-3.5 border-b-2 sm:border-b-0 sm:border-r-2 border-(--lithos-border) text-center text-(--lithos-text)">
              ✓ Auto-Initializes If Missing
            </div>
            <div className="p-3.5 border-b-2 sm:border-b-0 sm:border-r-2 border-(--lithos-border) text-center text-(--lithos-text)">
              ✓ Direct Source Code
            </div>
            <div className="p-3.5 text-center text-(--lithos-text)">✓ Zero Specificity Wars</div>
          </div>
        </div>
      </div>
    </section>
  )
}
