import { useToast } from '../../../components/ui/Toast'
import { Button } from '../../../components/ui/Button'

const mockSuccessfulFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true }
}

const mockFailedFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  throw new Error('Network request failed')
}

export const AsyncToastExample = () => {
  const toast = useToast()

  const triggerToast = (withError?: boolean) => {
    if (!toast || !toast.addToast) return

    toast.addToast({
      title: 'FILE SYNC',
      loading: 'Uploading file...',
      success: 'File uploaded!',
      error: 'Upload failed.',
      preserveIntent: true,
      action: !withError ? mockSuccessfulFetch : mockFailedFetch,
    })
  }

  return (
    <div className="flex flex-col space-y-4 items-center">
      <Button onClick={() => triggerToast()}>Trigger Success Async Toast</Button>
      <Button onClick={() => triggerToast(true)}>Trigger Error Async Toast</Button>
    </div>
  )
}
