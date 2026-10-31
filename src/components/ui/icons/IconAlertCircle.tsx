import { FiAlertCircle } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconAlertCircle = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiAlertCircle size={size} strokeWidth={strokeWidth} {...props} />
}
