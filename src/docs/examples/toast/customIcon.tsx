import { useToast } from '../../../components/ui/Toast'
import { LithosLogo } from '../../../components/ui/LithosLogo'
import { Button } from '../../../components/ui/Button'

export const ToastCustomIconExample = () => {
  const { addToast } = useToast()

  const handleCustomIconToast = () => {
    addToast({
      title: 'Lithos Branded',
      message: 'This notification uses the official Lithos logo component.',
      icon: <LithosLogo collapsed interactive={false} className="w-5 h-5" />,
    })
  }

  return <Button onClick={handleCustomIconToast}>Show Branded Toast</Button>
}
