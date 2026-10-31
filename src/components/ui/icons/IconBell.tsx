import { FiBell } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconBell = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiBell size={size} strokeWidth={strokeWidth} {...props} />
}
