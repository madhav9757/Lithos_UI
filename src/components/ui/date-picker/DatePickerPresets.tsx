import { useDatePickerContext } from './useDatePicker'
import { getDefaultPresets } from './date-picker.utils'
import { cn } from '../../../utils/cn'
import type { DatePickerPresetsProps, DatePickerPreset } from './date-picker.types'

export const DatePickerPresets = ({ presets: consumerPresets, className, onSelectPreset }: DatePickerPresetsProps) => {
  const { mode, setValue } = useDatePickerContext()
  const presets = consumerPresets ?? getDefaultPresets(mode)

  const handleSelect = (preset: DatePickerPreset) => {
    setValue(preset.value)
    onSelectPreset?.(preset)
  }

  return (
    <div className={cn('flex flex-wrap border-b-2 border-(--lithos-border) pb-2 mb-2 max-w-72', className)}>
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => handleSelect(preset)}
          className="text-xs px-2 py-1 mr-1 mb-1 font-mono font-bold border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) rounded-(--lithos-radius) shadow-[1px_1px_0_0_var(--lithos-shadow)] transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
