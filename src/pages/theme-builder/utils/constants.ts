/**
 * @fileoverview Core constants and configuration for the Theme Builder.
 * Defines available design tokens, pre-built themes, and default values.
 */
import type { ThemeProperty, ThemePreset } from './types'

export const THEME_PROPERTIES: ThemeProperty[] = [
  { key: '--lithos-bg', label: 'Background', section: 'colors', type: 'color' },
  { key: '--lithos-text', label: 'Text', section: 'colors', type: 'color' },
  { key: '--lithos-border', label: 'Border', section: 'colors', type: 'color' },
  { key: '--lithos-accent', label: 'Accent', section: 'colors', type: 'color' },
  { key: '--lithos-surface', label: 'Surface', section: 'colors', type: 'color' },
  { key: '--lithos-muted', label: 'Muted opacity', section: 'colors', type: 'opacity' },
  {
    key: '--lithos-shadow',
    label: 'Shadow',
    section: 'shadow',
    type: 'shadow',
  },
  {
    key: '--lithos-radius',
    label: 'Radius',
    section: 'geometry',
    type: 'range',
    min: 0,
    max: 24,
    step: 1,
    unit: 'px',
  },
]

export const LIGHT_DEFAULTS: Record<string, string> = {
  '--lithos-bg': '#ffffff',
  '--lithos-text': '#000000',
  '--lithos-border': '#000000',
  '--lithos-accent': '#00ff00',
  '--lithos-surface': '#ffffff',
  '--lithos-muted': 'rgba(0, 0, 0, 1)',
  '--lithos-shadow': 'rgba(0, 0, 0, 1)',
  '--lithos-radius': '0px',
}

export const DARK_DEFAULTS: Record<string, string> = {
  '--lithos-bg': '#0a0a0a',
  '--lithos-text': '#ffffff',
  '--lithos-border': '#000000',
  '--lithos-accent': '#00ff00',
  '--lithos-surface': '#141414',
  '--lithos-muted': 'rgba(255, 255, 255, 0.4)',
  '--lithos-shadow': 'rgba(0, 0, 0, 1)',
  '--lithos-radius': '0px',
}

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    mode: 'light',
    values: LIGHT_DEFAULTS,
  },
  {
    id: 'default-dark',
    name: 'Default Dark (Obsidian)',
    mode: 'dark',
    values: DARK_DEFAULTS,
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    mode: 'dark',
    values: {
      '--lithos-bg': '#0a0a12',
      '--lithos-text': '#00ffcc',
      '--lithos-border': '#ff007f',
      '--lithos-accent': '#ff007f',
      '--lithos-surface': '#121225',
      '--lithos-muted': 'rgba(0, 255, 204, 1)',
      '--lithos-shadow': 'rgba(255, 0, 127, 1)',
      '--lithos-radius': '4px',
    },
  },
  {
    id: 'industrial-amber',
    name: 'Industrial Amber',
    mode: 'dark',
    values: {
      '--lithos-bg': '#1a1917',
      '--lithos-text': '#f59e0b',
      '--lithos-border': '#f59e0b',
      '--lithos-accent': '#fbbf24',
      '--lithos-surface': '#262421',
      '--lithos-muted': 'rgba(245, 158, 11, 1)',
      '--lithos-shadow': 'rgba(245, 158, 11, 1)',
      '--lithos-radius': '0px',
    },
  },
  {
    id: 'tokyo-pastel',
    name: 'Tokyo Soft',
    mode: 'light',
    values: {
      '--lithos-bg': '#fdf6e3',
      '--lithos-text': '#268bd2',
      '--lithos-border': '#268bd2',
      '--lithos-accent': '#b58900',
      '--lithos-surface': '#eee8d5',
      '--lithos-muted': 'rgba(38, 139, 210, 1)',
      '--lithos-shadow': 'rgba(38, 139, 210, 1)',
      '--lithos-radius': '8px',
    },
  },
  {
    id: 'emerald-synth',
    name: 'Emerald Synth',
    mode: 'dark',
    values: {
      '--lithos-bg': '#061412',
      '--lithos-text': '#10b981',
      '--lithos-border': '#10b981',
      '--lithos-accent': '#34d399',
      '--lithos-surface': '#0f2923',
      '--lithos-muted': 'rgba(16, 185, 129, 1)',
      '--lithos-shadow': 'rgba(16, 185, 129, 1)',
      '--lithos-radius': '2px',
    },
  },
]

export const PANEL = 'border border-(--lithos-border)/15 rounded-(--lithos-radius) bg-(--lithos-surface)'
