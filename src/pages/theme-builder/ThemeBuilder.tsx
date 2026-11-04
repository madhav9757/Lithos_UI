/**
 * @fileoverview Lithos UI Theme Studio page.
 * - Full-viewport (100vh) studio workbench, no page-level scroll.
 * - Three horizontal panels — Actions / Tokens / Stage.
 * - High-density, sharp bento-box dashboard orientation.
 * - Strictly utilizes imported UI components for all interactions.
 */

import { Navbar } from '../../showroom/sections/Navbar'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { THEME_PROPERTIES, PRESET_THEMES } from './utils/constants'

import { useThemeHistory } from './hooks/useThemeHistory'
import { SpecimenGrid } from './components/SpecimenGrid'
import { PropertyControl } from './components/PropertyControl'
import { useToast } from '../../components/ui/toast/useToast'
import { Footer } from '../../showroom/sections/Footer'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { Toggle } from '../../components/ui/Toggle'
import { Select } from '../../components/ui/Select'
import { Button, ButtonGroup } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import {
  IconUndo,
  IconRedo,
  IconUpload,
  IconDownload,
  IconRotateCcw,
  IconMonitor,
  IconTablet,
  IconSmartphone,
  IconCopy,
} from '../../components/ui/icons'
import { useDynamicStrata } from '../../core/hooks/useDynamicStrata'

type StageTab = 'preview' | 'code' | 'swatches'

export const ThemeBuilder = () => {
  const {
    previewMode,
    stageTab,
    setStageTab,
    viewport,
    setViewport,
    defaults,
    currentValues,
    colorProps,
    geometryProps,
    shadowProps,
    canUndo,
    canRedo,
    handleChange,
    handleUndo,
    handleRedo,
    handleReset,
    handlePresetSelect,
    handleTogglePreviewMode,
    fileInputRef,
    handleExportJSON,
    handleImportJSON,
    previewStyle,
    generatedCSS,
    activePresetId,
  } = useThemeHistory()
  const { addToast } = useToast()
  const strataStyle = useDynamicStrata({ variant: 'compact' })

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen lg:h-screen pt-14 flex flex-col overflow-y-auto lg:overflow-hidden bg-(--lithos-strata) text-(--lithos-text) antialiased"
        style={strataStyle}
      >
        {/* Strict monolithic flex container for exact height sharing and sharp border intersections */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row w-full items-stretch">
          {/* PANEL 1: CONFIGURATION */}
          <div className="flex flex-col w-full lg:w-[280px] h-auto lg:h-full overflow-hidden bg-(--lithos-strata) lg:border-r-2 border-(--lithos-border) text-(--lithos-text) shrink-0">
            <div className="h-16 border-b-2 border-(--lithos-border) bg-(--lithos-strata) flex items-center justify-between shrink-0 px-5">
              <h2 className="text-sm tracking-widest uppercase mt-0.5 font-bold font-mono">Configuration</h2>
            </div>

            <div className="p-5 flex flex-col space-y-10 flex-1 overflow-visible lg:overflow-y-auto">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[13px] tracking-widest uppercase font-body">Workspace</span>
                </div>
                <div className="flex items-center justify-between w-2/3 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] bg-(--lithos-surface) py-1.5 px-3 rounded-(--lithos-radius)">
                  <span
                    className={`text-[13px] font-bold cursor-pointer transition-colors ${
                      previewMode !== 'dark'
                        ? 'text-(--lithos-text)'
                        : 'text-(--lithos-muted) hover:text-(--lithos-text)'
                    }`}
                    onClick={() => previewMode === 'dark' && handleTogglePreviewMode()}
                  >
                    Light
                  </span>
                  <div className="shrink-0">
                    <Toggle
                      checked={previewMode === 'dark'}
                      onToggle={handleTogglePreviewMode}
                      label="Toggle dark mode"
                    />
                  </div>
                  <span
                    className={`text-[13px] font-bold cursor-pointer transition-colors ${
                      previewMode === 'dark'
                        ? 'text-(--lithos-text)'
                        : 'text-(--lithos-muted) hover:text-(--lithos-text)'
                    }`}
                    onClick={() => previewMode !== 'dark' && handleTogglePreviewMode()}
                  >
                    Dark
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[13px] tracking-widest uppercase font-body">Presets</span>
                  <span className="text-xs font-mono font-bold text-(--lithos-accent)">
                    {PRESET_THEMES.length} <span className="ml-0.5 uppercase">Ready</span>
                  </span>
                </div>

                <Select
                  value={activePresetId}
                  options={PRESET_THEMES.map((preset) => ({ label: preset.name, value: preset.id }))}
                  placeholder="Select preset..."
                  onChange={(val) => handlePresetSelect(val)}
                  className="w-full border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:translate-x-0 active:translate-y-0 bg-(--lithos-surface) rounded-(--lithos-radius) flex justify-between items-center text-[13px] font-bold cursor-pointer hover:opacity-90 transition-colors px-3 py-2.5"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[13px] tracking-widest uppercase font-body">Timeline</span>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    iconLeft={<IconUndo size={14} strokeWidth={2.5} />}
                    className={`flex-1 py-2 text-[13px] font-bold ${
                      !canUndo && 'bg-(--lithos-bg) text-(--lithos-muted) shadow-[4px_4px_0_0_var(--lithos-shadow)]'
                    }`}
                  >
                    Undo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    iconLeft={<IconRedo size={14} strokeWidth={2.5} />}
                    className={`flex-1 py-2 text-[13px] font-bold ${
                      !canRedo && 'bg-(--lithos-bg) text-(--lithos-muted) shadow-[4px_4px_0_0_var(--lithos-shadow)]'
                    }`}
                  >
                    Redo
                  </Button>
                </div>
              </div>

              <div>
                <div className="mb-3">
                  <span className="text-[13px] tracking-widest uppercase font-body">Data Transfer</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleExportJSON}
                    className="justify-between py-2.5 px-3 text-[13px] font-bold hover:bg-(--lithos-bg)"
                  >
                    <div className="flex items-center space-x-4">
                      <IconUpload size={16} strokeWidth={2.5} />
                      <span>Export config</span>
                    </div>
                    <span className="text-(--lithos-muted) font-mono text-xs uppercase font-normal">.JSON</span>
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => fileInputRef.current?.click()}
                    className="justify-between py-2.5 px-3 text-[13px] font-bold hover:bg-(--lithos-bg)"
                  >
                    <div className="flex items-center space-x-4">
                      <IconDownload size={16} strokeWidth={2.5} />
                      <span>Import config</span>
                    </div>
                    <span className="text-(--lithos-muted) font-mono text-xs uppercase font-normal">.JSON</span>
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                </div>
              </div>

              <div className="mt-4 pt-8 border-t-2 border-(--lithos-border)">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleReset}
                  iconLeft={<IconRotateCcw size={16} strokeWidth={2.5} />}
                  className="py-3 text-[14px] font-bold"
                >
                  Reset all values
                </Button>
              </div>
            </div>
          </div>

          {/* PANEL 2: DESIGN TOKENS */}
          <div className="flex flex-col w-full lg:w-[340px] h-auto lg:h-full overflow-hidden bg-(--lithos-strata) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) text-(--lithos-text) shrink-0">
            <div className="h-16 border-b-2 border-(--lithos-border) bg-(--lithos-strata) flex items-center justify-between shrink-0 px-5">
              <h2 className="text-sm tracking-widest uppercase mt-0.5 font-bold font-mono">Design Tokens</h2>
            </div>

            <div className="p-5 flex flex-col space-y-2 h-full overflow-visible lg:overflow-y-auto">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[13px] tracking-widest uppercase font-body">Color Palette</span>
              </div>

              {colorProps.map((prop) => (
                <PropertyControl
                  key={prop.key}
                  property={prop}
                  value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                  onChange={handleChange}
                />
              ))}

              {shadowProps.map((prop) => (
                <PropertyControl
                  key={prop.key}
                  property={prop}
                  value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                  onChange={handleChange}
                />
              ))}

              {geometryProps.map((prop) => (
                <PropertyControl
                  key={prop.key}
                  property={prop}
                  value={currentValues[prop.key] ?? defaults[prop.key] ?? '0px'}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* PANEL 3: STAGE */}
          <div className="flex flex-col min-w-0 flex-1 h-auto min-h-[600px] lg:min-h-0 lg:h-full overflow-hidden bg-(--lithos-strata) font-sans text-(--lithos-text)">
            {/* Stage Header */}
            {/* Reset */}
            <div className="min-h-[64px] px-4 md:px-6 pt-4 md:pt-0 border-b-2 border-(--lithos-border) bg-(--lithos-strata) flex flex-col md:flex-row items-center md:items-end justify-between space-y-4 md:space-y-0">
              <Tabs
                variant="underline"
                value={stageTab}
                onValueChange={(val) => setStageTab(val as StageTab)}
                className="mb-0 md:mb-2 w-full md:w-auto overflow-x-auto no-scrollbar"
              >
                <TabsList className="space-x-2">
                  <TabsTrigger value="preview">Live Preview</TabsTrigger>

                  <TabsTrigger value="code">Generated CSS</TabsTrigger>

                  <TabsTrigger value="swatches">Token Swatches</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center justify-center w-full md:w-auto space-x-4 pb-4 md:pb-2">
                {stageTab === 'preview' && (
                  <div className="hidden lg:block">
                    <ButtonGroup
                      attached
                      className="shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)"
                    >
                      <Button
                        variant="secondary"
                        onClick={() => setViewport('desktop')}
                        className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-r-none hover:bg-(--lithos-bg) ${viewport === 'desktop' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                      >
                        <IconMonitor size={15} strokeWidth={2.5} />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setViewport('tablet')}
                        className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-none hover:bg-(--lithos-bg) ${viewport === 'tablet' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                      >
                        <IconTablet size={14} strokeWidth={2.5} />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setViewport('mobile')}
                        className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-l-none hover:bg-(--lithos-bg) ${viewport === 'mobile' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                      >
                        <IconSmartphone size={14} style={{ width: 12, height: 14 }} strokeWidth={2.5} />
                      </Button>
                    </ButtonGroup>
                  </div>
                )}

                <Button
                  variant="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCSS)
                    addToast({
                      message: 'CSS copied to clipboard',
                      intent: 'accent',
                      duration: 2000,
                    })
                  }}
                  iconLeft={<IconCopy size={14} strokeWidth={3} />}
                  className="px-4 py-2 font-black uppercase tracking-wider text-[11px] whitespace-nowrap"
                >
                  Copy CSS
                </Button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="flex-1 p-4 lg:p-10 relative overflow-auto flex justify-center bg-(--lithos-strata) bg-[radial-gradient(var(--lithos-muted)_1.5px,transparent_1.5px)] bg-size-[16px_16px]">
              {stageTab === 'preview' && (
                <div
                  className={`h-full transition-all duration-300 rounded-none overflow-hidden border-4 border-(--lithos-border) bg-(--lithos-surface) ${previewMode === 'dark' ? 'obsidian' : ''}`}
                  style={{
                    ...previewStyle,
                    width: viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '600px' : '375px',
                  }}
                >
                  <SpecimenGrid
                    style={previewStyle}
                    accentColor={
                      currentValues['--lithos-accent'] ?? defaults['--lithos-accent'] ?? 'var(--lithos-accent)'
                    }
                  />
                </div>
              )}

              {stageTab === 'code' && (
                <div>
                  <CodeViewer code={generatedCSS} language="css" />
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="flex flex-wrap -m-2 sm:-m-3">
                  {THEME_PROPERTIES.map((prop) => {
                    const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                    return (
                      <div key={prop.key} className="w-1/2 lg:w-1/3 xl:w-1/4 p-2 sm:p-3 flex">
                        <Card className="flex flex-col flex-1 w-full overflow-hidden">
                          <div
                            className="h-28 sm:h-32 w-full flex items-center justify-center border-b-[3px] border-(--lithos-border) shrink-0"
                            style={{
                              backgroundColor:
                                prop.type === 'color' && (val.startsWith('rgba') || val.startsWith('#'))
                                  ? val
                                  : 'var(--lithos-surface)',
                            }}
                          >
                            <span
                              className="inline-block max-w-[85%] text-center wrap-break-word text-[10px] sm:text-xs font-mono font-bold bg-(--lithos-surface) text-(--lithos-text) px-3 py-1.5 border-[3px] border-(--lithos-border) rounded-(--lithos-radius) cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(val)
                                addToast({
                                  message: `Copied ${val} to clipboard`,
                                  intent: 'accent',
                                  duration: 2000,
                                })
                              }}
                              style={{
                                boxShadow:
                                  prop.type === 'shadow' ? `4px 4px 0 0 ${val}` : '3px 3px 0 0 var(--lithos-shadow)',
                                borderRadius:
                                  prop.type === 'range' && prop.key === '--lithos-radius'
                                    ? val
                                    : 'var(--lithos-radius)',
                              }}
                            >
                              {val}
                            </span>
                          </div>

                          <CardContent className="p-4 sm:p-5 flex flex-col space-y-2 flex-1 justify-start bg-(--lithos-surface) min-w-0">
                            <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-(--lithos-text) wrap-break-word">
                              {prop.label}
                            </p>
                            <code className="text-[10px] sm:text-[11px] font-mono text-(--lithos-muted) font-bold p-1.5 bg-(--lithos-bg) border-2 border-(--lithos-border)/20 rounded wrap-break-word whitespace-normal w-full inline-block">
                              {prop.key}
                            </code>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
