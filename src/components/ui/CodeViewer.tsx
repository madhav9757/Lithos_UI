/**
 * @fileoverview Lithos UI code viewer atom.
 * - Displays raw React code inside a hard-shelled container.
 * - Copies the current code block to the clipboard with toast feedback.
 * - Uses explicit spacing only; no gap utilities are allowed.
 */
import { useToast } from './toast/useToast'
import { useTheme } from '../../core/hooks/useTheme'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import okaidia from 'react-syntax-highlighter/dist/esm/styles/prism/okaidia'
import { cn, type LithosClass } from '../../utils/cn'
import { Button } from './Button'
import { IconCopy } from './icons'

// Register only the required languages to keep bundle size minimal
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('json', json)

export interface CodeViewerProps {
  code: string
  language?: string
  showLanguage?: boolean
  embedded?: boolean
  className?: LithosClass
  cliCommand?: string
}

export const CodeViewer = ({
  code,
  language = 'tsx',
  showLanguage = false,
  embedded = false,
  className = '',
  cliCommand,
}: CodeViewerProps) => {
  const toast = useToast()
  const { accentColor } = useTheme()

  const handleCopy = async () => {
    const addToastExists = typeof toast?.addToast === 'function'

    try {
      await navigator.clipboard.writeText(code)

      if (addToastExists) {
        toast.addToast({
          title: 'SUCCESS',
          message: 'Copied to clipboard',
          intent: 'success',
          color: accentColor,
        })
      }
    } catch {
      if (addToastExists) {
        toast.addToast({
          title: 'ERROR',
          message: 'Failed to copy code to clipboard',
          intent: 'error',
        })
      }
    }
  }

  const handleCliCopy = async () => {
    if (!cliCommand) return
    const addToastExists = typeof toast?.addToast === 'function'

    try {
      await navigator.clipboard.writeText(cliCommand)

      if (addToastExists) {
        toast.addToast({
          title: 'SUCCESS',
          message: 'Command copied',
          intent: 'success',
          color: accentColor,
        })
      }
    } catch {
      if (addToastExists) {
        toast.addToast({
          title: 'ERROR',
          message: 'Failed to copy command to clipboard',
          intent: 'error',
        })
      }
    }
  }

  const classes = cn(
    embedded
      ? 'bg-transparent mb-0 relative overflow-hidden'
      : 'border-2 border-(--lithos-border) bg-(--lithos-bg) mb-8 relative rounded-(--lithos-radius) overflow-hidden',
    className
  )

  return (
    <div className={classes}>
      <div className="border-b-2 border-(--lithos-border) bg-(--lithos-strata) px-4 py-2 flex justify-between items-center relative">
        <div className="flex items-center z-10">
          {showLanguage ? (
            <p className="text-xs font-black uppercase tracking-widest text-(--lithos-text) font-code">{language}</p>
          ) : (
            <div className="flex items-center">
              {[0, 0, 0].map((_, i) => (
                <div
                  key={`square-${i}`}
                  className={`${i !== 2 ? 'mr-2 ' : ''}h-4 w-4 border-2 border-(--lithos-border) bg-(--lithos-accent) rounded-(--lithos-radius)`}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </div>

        {cliCommand && (
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none hidden md:flex">
            <button
              onClick={handleCliCopy}
              className="pointer-events-auto flex items-center bg-(--lithos-bg) border-2 border-(--lithos-border) rounded-full px-5 py-1.5 text-sm font-code font-bold hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) transition-colors lithos-click"
              title="Copy CLI command"
            >
              <span className="opacity-90">{cliCommand}</span>
              <IconCopy className="ml-2.5 w-4 h-4 opacity-90" />
            </button>
          </div>
        )}

        <Button
          onClick={handleCopy}
          variant="secondary"
          className="hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) z-10"
          aria-label="Copy code"
          title="Copy code"
        >
          Copy
        </Button>
      </div>

      <div className="overflow-x-auto p-4 text-sm bg-[#0a0a0a]">
        <SyntaxHighlighter
          language={language}
          style={okaidia}
          customStyle={{
            background: 'transparent',
            padding: '0',
            margin: '0',
            fontFamily: 'var(--font-code)',
          }}
          codeTagProps={{
            style: { fontFamily: 'inherit' },
          }}
          CodeTag={({ children }) => <code data-code-viewer>{children}</code>}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
