import { useToast, type ToastType } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

export const AllIntentsToast = () => {
  const toast = useToast()
  const intents: ToastType[] = ['default', 'success', 'error', 'warning', 'info', 'accent']

  return (
    <div className="-mb-4 -mr-4 flex flex-wrap">
      {intents.map((intent) => (
        <Button
          key={intent}
          onClick={() => {
            if (toast && toast.addToast) {
              toast.addToast({
                title: intent.toUpperCase(),
                message: `This is a ${intent} toast notification.`,
                intent,
              })
            }
          }}
          className="capitalize mb-4 mr-4"
        >
          {intent}
        </Button>
      ))}
    </div>
  )
}
