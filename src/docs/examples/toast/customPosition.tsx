import { useToast, ToastProvider } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

const CustomToastTriggerButton = () => {
  const toast = useToast()

  const triggerToast = () => {
    if (toast && toast.addToast)
      toast.addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        intent: 'accent',
      })
  }

  return <Button onClick={triggerToast}>Trigger Toast</Button>
}

export const PositionedToast = () => {
  return (
    <ToastProvider position="top-left">
      <CustomToastTriggerButton />
    </ToastProvider>
  )
}
