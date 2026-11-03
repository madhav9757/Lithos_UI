import { isHexColor } from '../core/types'

export const getYiqValue = (hexcolor: string | undefined, isDarkModeOverride?: boolean): number => {
  if (!hexcolor || !isHexColor(hexcolor)) return 0

  let hex = hexcolor.replace('#', '')
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  const r = parseInt(hex.substr(0, 2), 16) || 0
  const g = parseInt(hex.substr(2, 2), 16) || 0
  const b = parseInt(hex.substr(4, 2), 16) || 0

  let a = 255
  if (hex.length === 8) {
    const parsedA = parseInt(hex.substr(6, 2), 16)
    if (!isNaN(parsedA)) {
      a = parsedA
    }
  }

  let isDarkMode = false
  if (isDarkModeOverride !== undefined) {
    isDarkMode = isDarkModeOverride
  } else if (typeof window !== 'undefined') {
    isDarkMode =
      document.documentElement.classList.contains('obsidian') ||
      document.body.classList.contains('obsidian') ||
      document.body.classList.contains('dark') ||
      localStorage.getItem('lithos-theme-mode') === 'dark'
  }

  // Blend over a white or black background depending on theme mode
  const alpha = a / 255
  const bg = isDarkMode ? 0 : 255
  const blendedR = r * alpha + bg * (1 - alpha)
  const blendedG = g * alpha + bg * (1 - alpha)
  const blendedB = b * alpha + bg * (1 - alpha)

  return (blendedR * 299 + blendedG * 587 + blendedB * 114) / 1000
}

export const getContrastText = (hexcolor: string | undefined, isDarkModeOverride?: boolean) => {
  return getYiqValue(hexcolor, isDarkModeOverride) >= 128 ? '#000000' : '#FFFFFF'
}
