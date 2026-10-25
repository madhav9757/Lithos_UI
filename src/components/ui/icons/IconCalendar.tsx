import { FiCalendar } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconCalendar = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => <FiCalendar size={size} strokeWidth={strokeWidth} {...props} />
