import { useToast, type ToastTransition } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

const transitions: ToastTransition[] = ['slide-up', 'slide-down', 'fade', 'scale', 'none']

export const ToastTransitionExample = () => {
  const { addToast } = useToast()

  const handleTransitionToast = (transition: ToastTransition) => {
    addToast({
      title: `Transition: ${transition}`,
      message: `This toast rendered using the '${transition}' entrance animation.`,
      intent: 'success',
      transition,
    })
  }

  return (
    <div className="-mb-4 -mr-4 flex flex-wrap">
      {transitions.map((transition) => (
        <Button className="capitalize mb-4 mr-4" onClick={() => handleTransitionToast(transition)}>
          {transition.replace('-', ' ')}
        </Button>
      ))}
    </div>
  )
}
