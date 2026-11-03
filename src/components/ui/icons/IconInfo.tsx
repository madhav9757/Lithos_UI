import { FiInfo } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconInfo = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiInfo size={size} strokeWidth={strokeWidth} {...props} />
}
