import { useToast } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'
import { IconRedo } from '../../../components/ui/icons/IconRedo'
import { Typography } from '../../../components/ui/Typography'

export const CustomIconUndoToastExample = () => {
  const toast = useToast()

  const handleDeleteItem = () => {
    if (!toast || !toast.addToast) return

    let cancelAction: (() => void) | null = null

    const toastId = toast.addToast({
      title: 'ITEM DELETED',
      message: (
        <div className="flex flex-col items-start space-y-3">
          <Typography className="text-sm">The file has been moved to trash.</Typography>
          <button
            onClick={() => {
              cancelAction?.()

              toast.updateToast!(toastId, {
                title: 'RESTORED',
                message: 'Item successfully recovered.',
                intent: 'success',
                duration: 4000,
              })
            }}
            className="underline font-bold text-xs uppercase cursor-pointer hover:opacity-80"
          >
            Undo
          </button>
        </div>
      ),
      intent: 'warning',
      success: 'Deleted successfully.',
      icon: IconRedo,
      action: () =>
        new Promise((resolve) => {
          const timer = setTimeout(() => {
            resolve('Deleted permanently')
          }, 4000)

          cancelAction = () => {
            clearTimeout(timer)
            resolve('Action undone by user')
          }
        }),
    })
  }

  return <Button onClick={handleDeleteItem}>Delete Item (With Undo)</Button>
}
