import { useToast } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

export const ToastProgressExample = () => {
  const { addToast } = useToast()

  const handleProgressToast = () => {
    addToast({
      title: 'Auto-Dismiss Progress',
      message: 'Watch the live progress bar tracking the remaining time.',
      intent: 'info',
      showProgress: true,
      duration: 6000,
    })
  }

  return <Button onClick={handleProgressToast}>Show Progress Toast</Button>
}
