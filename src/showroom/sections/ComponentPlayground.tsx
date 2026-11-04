/**
 * @fileoverview Lithos UI interactive component playground.
 * - Neo-brutalist bento grid showcasing real, interactive primitives directly on the landing page.
 * - Lets visitors test tactile click physics, tabs, alerts, badges, and toggles without leaving.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Toggle } from '../../components/ui/Toggle'
import { PlainCheckbox } from '../../components/ui/Checkbox'
import { Kbd, KbdGroup } from '../../components/ui/Kbd'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { Card } from '../../components/ui/Card'
import { IconArrowRight, IconRotateCcw, IconHeart } from '../../components/ui/icons'

export const ComponentPlayground = () => {
  const [clickCount, setClickCount] = useState(0)
  const [toggleActive, setToggleActive] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <section id="components" className="border-b-2 border-(--lithos-border) py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-(--lithos-accent) mb-3">
            TACTILE INTERACTION ENGINE
          </p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none text-(--lithos-text)">
            HARD-EDGED PRIMITIVES
          </h2>
          <p className="mt-4 text-base sm:text-lg text-(--lithos-text) opacity-80 font-medium">
            Test drive the components below. Every piece is built with standardized physics tokens, tactile click
            reactions, and automated YIQ contrast preservation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-wrap -m-3">
          {/* Card 1: Interactive Button Physics */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  01 // BUTTON PHYSICS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  TACTILE SPRING
                </span>
              </div>
              <p className="text-xs text-(--lithos-text) opacity-70 mb-5">
                Press and hold to feel the instant neo-brutalist depression physics with hard shadow compression.
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap -m-1">
                  <Button
                    variant="primary"
                    onClick={() => setClickCount((c) => c + 1)}
                    className="m-1 text-xs font-black uppercase py-2 px-3"
                  >
                    Click Me ({clickCount})
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setClickCount(0)}
                    className="m-1 text-xs font-bold uppercase py-2 px-3"
                    iconLeft={<IconRotateCcw size={12} />}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="accent"
                    onClick={() => setLiked(!liked)}
                    className="m-1 text-xs font-bold uppercase py-2 px-3"
                    iconLeft={<IconHeart size={12} />}
                  >
                    {liked ? 'Liked!' : 'Like'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              Total Clicks Registered: {clickCount}
            </div>
          </Card>

          {/* Card 2: Interactive Tabs Component */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  02 // TABS SLABS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  WAI-ARIA
                </span>
              </div>
              <p className="text-xs text-(--lithos-text) opacity-70 mb-4">
                Structured panel switching with zero geometric jitter or displacement.
              </p>

              <Tabs defaultValue="architecture" className="w-full">
                <TabsList className="mb-4 w-full flex">
                  <TabsTrigger
                    value="architecture"
                    className="flex-1 px-2 py-2 text-xs font-bold uppercase text-center"
                  >
                    Pillars
                  </TabsTrigger>
                  <TabsTrigger value="contrast" className="flex-1 px-2 py-2 text-xs font-bold uppercase text-center">
                    YIQ Ink
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex-1 px-2 py-2 text-xs font-bold uppercase text-center">
                    Tokens
                  </TabsTrigger>
                </TabsList>
                <div className="border-2 border-(--lithos-border) bg-(--lithos-surface) p-3 rounded-(--lithos-radius) min-h-[90px] flex items-center">
                  <TabsContent value="architecture" className="text-xs font-medium text-(--lithos-text)">
                    Strict zero-gap discipline prevents unpredictable browser layout shifts.
                  </TabsContent>
                  <TabsContent value="contrast" className="text-xs font-medium text-(--lithos-text)">
                    YIQ color formula automatically swaps foreground text between dark and light ink.
                  </TabsContent>
                  <TabsContent value="code" className="text-xs font-mono text-(--lithos-text)">
                    var(--lithos-border) · var(--lithos-radius) · var(--lithos-shadow)
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              Native keyboard arrow navigation supported
            </div>
          </Card>

          {/* Card 3: Interactive Alerts & Feedback */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  03 // LIVE NOTIFICATIONS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  AA+ CONTRAST
                </span>
              </div>
              <p className="text-xs text-(--lithos-text) opacity-70 mb-4">
                High-contrast notice bars designed for maximum visual urgency and legibility.
              </p>

              {!alertDismissed ? (
                <Alert intent="accent" onClose={() => setAlertDismissed(true)} className="text-xs">
                  <span className="font-black uppercase tracking-wider block mb-1">BUILD PASSED:</span>
                  All 27 UI primitives compiled with 0 TypeScript errors.
                </Alert>
              ) : (
                <div className="border-2 border-dashed border-(--lithos-border) p-4 text-center rounded-(--lithos-radius)">
                  <p className="text-xs font-mono text-(--lithos-text) opacity-60 mb-2">Alert dismissed</p>
                  <Button
                    variant="secondary"
                    onClick={() => setAlertDismissed(false)}
                    className="text-xs font-bold uppercase py-1 px-3"
                  >
                    Restore Alert
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              Tested against 4.5:1 contrast standards
            </div>
          </Card>

          {/* Card 4: Toggles & Form Controls */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  04 // TOGGLE & CHECKBOX
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  BINARY STATES
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-2 border-(--lithos-border) bg-(--lithos-surface) rounded-(--lithos-radius)">
                  <span className="text-xs font-bold uppercase text-(--lithos-text)">Strict Layout Mode</span>
                  <Toggle
                    checked={toggleActive}
                    onToggle={() => setToggleActive(!toggleActive)}
                    label="Toggle layout mode"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border-2 border-(--lithos-border) bg-(--lithos-surface) rounded-(--lithos-radius)">
                  <span className="text-xs font-bold uppercase text-(--lithos-text)">Preserve YIQ Contrast</span>
                  <PlainCheckbox
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    aria-label="Toggle YIQ contrast"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              State: {toggleActive ? 'ACTIVE' : 'INACTIVE'} · {checkboxChecked ? 'CHECKED' : 'UNCHECKED'}
            </div>
          </Card>

          {/* Card 5: Badge & Status Stack */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  05 // BADGE PILLS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  SEMANTIC TOKENS
                </span>
              </div>
              <p className="text-xs text-(--lithos-text) opacity-70 mb-4">
                Semantic status badges dynamically resolving their foreground ink tone.
              </p>

              <div className="flex flex-wrap -m-1">
                <Badge intent="accent" className="m-1 font-mono text-xs uppercase font-black">
                  ACCENT
                </Badge>
                <Badge intent="success" className="m-1 font-mono text-xs uppercase font-black">
                  SUCCESS
                </Badge>
                <Badge intent="warning" className="m-1 font-mono text-xs uppercase font-black">
                  WARNING
                </Badge>
                <Badge intent="error" className="m-1 font-mono text-xs uppercase font-black">
                  CRITICAL
                </Badge>
                <Badge intent="info" className="m-1 font-mono text-xs uppercase font-black">
                  SYSTEM
                </Badge>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              No manual color classes required
            </div>
          </Card>

          {/* Card 6: Kbd Shortcuts & Hotkeys */}
          <Card className="m-3 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border-4 border-(--lithos-border) bg-(--lithos-bg) p-6 flex flex-col justify-between shadow-[6px_6px_0px_0px_var(--lithos-shadow)]">
            <div>
              <div className="flex items-center justify-between border-b-2 border-(--lithos-border) pb-3 mb-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-(--lithos-text)">
                  06 // BRUTALIST KEYCAPS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface)">
                  HOTKEYS
                </span>
              </div>
              <p className="text-xs text-(--lithos-text) opacity-70 mb-4">
                Hardware-styled keycaps for commands and keyboard workflows.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 border-2 border-(--lithos-border) bg-(--lithos-surface) rounded-(--lithos-radius)">
                  <span className="text-xs font-bold text-(--lithos-text)">Command Palette</span>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </div>
                <div className="flex items-center justify-between p-2.5 border-2 border-(--lithos-border) bg-(--lithos-surface) rounded-(--lithos-radius)">
                  <span className="text-xs font-bold text-(--lithos-text)">Quick Theme Builder</span>
                  <KbdGroup>
                    <Kbd>SHIFT</Kbd>
                    <Kbd>T</Kbd>
                  </KbdGroup>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-(--lithos-border) text-[11px] font-mono text-(--lithos-text) opacity-60">
              Neo-brutalist hardware depth
            </div>
          </Card>
        </div>

        {/* View All Components CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/components"
            className="inline-flex items-center space-x-2 border-2 border-(--lithos-border) bg-(--lithos-bg) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) text-xs font-black uppercase tracking-wider px-6 py-3 rounded-(--lithos-radius) lithos-click transition-colors"
          >
            <span>Explore All 27+ UI Components</span>
            <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
