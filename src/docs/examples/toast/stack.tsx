import { useToast, ToastProvider } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

type ExamplePosition = 'bottom-right' | 'top-left'

export const CustomToastTriggerButton = ({ position }: { position: ExamplePosition }) => {
  const toast = useToast()

  const triggerToast = () => {
    if (toast && toast.addToast)
      toast.addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        intent: 'default',
      })
  }

  return <Button onClick={triggerToast}>Trigger Toast ({position.replace('-', ' ').toUpperCase()})</Button>
}

export const StackedToasts = ({ position = 'bottom-right' }: { position?: ExamplePosition }) => {
  return (
    <ToastProvider stack position={position}>
      <CustomToastTriggerButton position={position} />
    </ToastProvider>
  )
}
