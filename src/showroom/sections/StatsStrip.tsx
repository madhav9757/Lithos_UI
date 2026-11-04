/**
 * @fileoverview Lithos UI open-source stats and manifesto strip.
 * - Highlights core metric numbers, free forever ethos, and MIT licensing.
 * - Fulfills the open TODO in the showroom index.
 */
import { useEffect, useState } from 'react'

export const StatsStrip = () => {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    // Attempt non-blocking fetch of GitHub stars
    fetch('https://api.github.com/repos/lithosui/Lithos_UI')
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error('Rate limit or network error')
      })
      .then((data) => {
        if (typeof data?.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        // Fallback gracefully without breaking display
      })
  }, [])

  return (
    <section className="border-b-2 border-(--lithos-border) py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap -m-3">
          {/* Stat 1: Components */}
          <div className="m-3 w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 rounded-(--lithos-radius) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] text-center">
            <span className="text-4xl sm:text-6xl font-black font-mono text-(--lithos-text) block mb-2">27+</span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-text) opacity-70">
              UI Primitives
            </span>
          </div>

          {/* Stat 2: Blocks */}
          <div className="m-3 w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 rounded-(--lithos-radius) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] text-center">
            <span className="text-4xl sm:text-6xl font-black font-mono text-(--lithos-text) block mb-2">8+</span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-text) opacity-70">
              Sections & Blocks
            </span>
          </div>

          {/* Stat 3: Free Forever */}
          <div className="m-3 w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 rounded-(--lithos-radius) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] text-center">
            <span className="text-4xl sm:text-6xl font-black font-mono text-(--lithos-accent) block mb-2">$0</span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-text) opacity-70">
              Free & Open Source
            </span>
          </div>

          {/* Stat 4: Layout Shifts / GitHub Stars */}
          <div className="m-3 w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 rounded-(--lithos-radius) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] text-center">
            <span className="text-4xl sm:text-6xl font-black font-mono text-(--lithos-text) block mb-2">
              {stars !== null ? `${stars}★` : '0'}
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-text) opacity-70">
              {stars !== null ? 'GitHub Stars' : 'Layout Shifts'}
            </span>
          </div>
        </div>

        {/* Ticker / Guarantee bar */}
        <div className="mt-8 border-2 border-(--lithos-border) bg-(--lithos-bg) p-3 rounded-(--lithos-radius) flex flex-wrap items-center justify-center font-mono text-xs font-bold text-(--lithos-text) text-center">
          <span className="m-1.5 px-3 py-1 rounded-(--lithos-radius) border border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] whitespace-nowrap">
            MIT LICENSED
          </span>
          <span className="m-1.5 px-3 py-1 rounded-(--lithos-radius) border border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] whitespace-nowrap">
            NO PRO TIERS
          </span>
          <span className="m-1.5 px-3 py-1 rounded-(--lithos-radius) border border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] whitespace-nowrap">
            NO SUBSCRIPTIONS
          </span>
          <span className="m-1.5 px-3 py-1 rounded-(--lithos-radius) border border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] whitespace-nowrap">
            YOU OWN THE SOURCE
          </span>
        </div>
      </div>
    </section>
  )
}
