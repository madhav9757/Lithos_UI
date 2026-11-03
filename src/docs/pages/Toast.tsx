import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { toastPropsData, toastProviderPropsData } from '../propsData/toast'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { DefaultToast } from '../examples/toast/default'
import defaultSource from '../examples/toast/default.tsx?raw'
import { PositionedToast } from '../examples/toast/customPosition'
import positionedSource from '../examples/toast/customPosition.tsx?raw'
import { AllIntentsToast } from '../examples/toast/allIntents'
import allIntentsSource from '../examples/toast/allIntents.tsx?raw'
import { AsyncToastExample } from '../examples/toast/asyncToast'
import { ToastCustomIconExample } from '../examples/toast/customIcon'
import customIconSource from '../examples/toast/customIcon?raw'
import { ToastProgressExample } from '../examples/toast/progress'
import progressSource from '../examples/toast/progress?raw'
import { ToastTransitionExample } from '../examples/toast/transition'
import transitionSource from '../examples/toast/transition?raw'
import { StackedToasts } from '../examples/toast/stack'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocSection,
  DocList,
  Code,
} from '../layout/DocPage'

const githubUrl = getComponentGithubUrl('toast')
const toastPath = '../../components/ui/Toast'
const manualPath = {
  others: toastPath,
  ToastProvider: toastPath,
  useToast: toastPath,
  Button: '../../components/ui/Button',
  IconHeart: '../../components/ui/IconHeart',
  LithosLogo: '../../components/ui/LithosLogo',
}

const toastCode = (source: string, componentNames: string[] = [], types: string[] = []) => ({
  body: removeImports(source),
  componentNames: ['useToast', 'Button', ...componentNames],
  types,
  manualPath,
})

const defaultCode = toastCode(defaultSource)
const allIntentsCode = toastCode(allIntentsSource, ['ToastType'], ['ToastType'])
const positionedCode = toastCode(positionedSource, ['ToastProvider'])
const customIconCode = toastCode(customIconSource, ['LithosLogo'])
const progressCode = toastCode(progressSource)
const transitionCode = toastCode(transitionSource, [], ['ToastTransition'])
const stackCode = toastCode(
  `
export const StackedToasts = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <ToastProvider stack>
      <Button
        onClick={() => {
          addToast({
            title: 'My stacked toast ' + count + 'º'},
            description: 'This is a stacked toast'
          )
        }}>
        Click me!
      </Button>
    </ToastProvider>
  )
}`,
  ['ToastProvider']
)

const asyncCode = toastCode(`
// Simulated database API
const fakeDatabase = {
  deleteRecord: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return { success: true, message: 'Record deleted from database' }
  },
  failRecord: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    throw new Error('Database constraint violation')
  },
}

export const AsyncToastExample = () => {
  const toast = useToast()

  const triggerToast = (shouldFail?: boolean) => {
    if (!toast || !toast.addToast) return

    toast.addToast({
      title: 'DATABASE SYNC',
      loading: 'Deleting record from database...',
      success: 'Record successfully removed!',
      error: 'Failed to delete record.',
      action: !shouldFail ? fakeDatabase.deleteRecord : fakeDatabase.failRecord,
    })
  }

  return (
    <div className='flex flex-col space-y-4 items-center'>
      <Button onClick={() => triggerToast()}>Trigger Success API Action</Button>
      <Button onClick={() => triggerToast(true)}>Trigger Error API Action</Button>
    </div>
  )
}`)

export const ToastDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader title="Toast" description="A transient feedback stack operating strictly outside the page flow." />
    <DocSection className="mb-6">
      <DocLeadText>
        The Toast primitive renders as a hard plaque rather than a soft notification card. It utilizes explicit margins
        and absolute positioning to guarantee it never shifts or breaks the underlying layout grid when mounting.
      </DocLeadText>
      <DocCallout>Click the button below to dispatch a toast to the fixed coordinate stack.</DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="toast"
        componentNames={['useToast', 'Button']}
        manualPath={manualPath}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/icons/IconAlertCircle.tsx',
          'components/ui/icons/IconCheck.tsx',
          'components/ui/icons/IconInfo.tsx',
          'components/ui/icons/IconClosIconAlertTriangle.tsx',
          'components/ui/icons/IconBell.tsx',
          'components/ui/Spinner.tsx',
          'components/ui/Typography.tsx',
          'core/hooks/useSwipe.ts',
          'utils/colors.ts',
          'utils/yiq.ts',
          'utils/cn.ts',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          Use this to provide transient feedback after a user action, such as saving a form or confirming a deletion. It
          renders a temporary overlay notification in the bottom-right corner. Toasts automatically disappear after a
          set duration, but hovering pauses the timer. Ensure messages are brief. Inherits <Code text='role="status"' />
          for polite screen reader announcements without stealing focus.
        </>
      }
    >
      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <DefaultToast />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="intents"
      title="Intents"
      description={
        <>
          Toasts support multiple semantic intents (<Code text="success" />, <Code text="error" />,{' '}
          <Code text="warning" />, <Code text="info" />, <Code text="default" />, and <Code text="accent" />) which
          automatically map to specific background colors and guarantee perfect text/shadow contrast in both light and
          dark themes.
        </>
      }
    >
      <PreviewBlock code={allIntentsCode} githubUrl={githubUrl}>
        <AllIntentsToast />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="custom-position"
      title="Custom position"
      description="Use this when the default bottom-right placement obscures critical UI elements on your specific page. It alters the fixed positioning coordinates (e.g., top-left, bottom-center) of the toast container. The structural layout and animations remain identical. Positioning choices do not impact accessibility order or DOM semantics."
    >
      <PreviewBlock code={positionedCode} githubUrl={githubUrl}>
        <PositionedToast />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="async-toast"
      title="Async Toast"
      description="Handle asynchronous operations seamlessly. The toast automatically displays a loading spinner with pending states, transitioning to success or error states upon promise resolution or rejection."
    >
      <PreviewBlock code={asyncCode} githubUrl={githubUrl}>
        <AsyncToastExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading>Handling Asynchronous Actions</DocHeading>
      <p className="text-sm mb-4">
        When dispatching toasts with asynchronous actions, the provider automatically manages the loading, success, and
        error states.
      </p>
      <DocList>
        <li>
          Access the <Code text="cancel" /> callback directly from the action parameter (
          <Code text="action: ({ cancel }) => {}" />) to dynamically abort or prevent the automatic success/error state
          transition during runtime execution.
        </li>
        <li>
          Upon resolution (success or error), the toast timer automatically resets and adopts the corresponding duration
          configuration so the user has enough time to read the final result.
        </li>
      </DocList>
    </DocSection>

    <DocExample
      id="custom-icon"
      title="Custom Icon"
      description="Override default intent icons or fallback indicators by passing any custom component reference directly to the icon property for specialized messaging."
    >
      <PreviewBlock code={customIconCode} githubUrl={githubUrl}>
        <ToastCustomIconExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="progress"
      title="Progress bar"
      description="Enable a live countdown progress bar indicator at the bottom of the toast to visually track the remaining auto-dismiss lifetime."
    >
      <PreviewBlock code={progressCode} githubUrl={githubUrl}>
        <ToastProgressExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="transition"
      title="Transitions"
      description="Customize the entrance animation of your toast notifications by selecting from various transition styles like slide, fade, scale, or none."
    >
      <PreviewBlock code={transitionCode} githubUrl={githubUrl}>
        <ToastTransitionExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="stacking"
      title="Stacking"
      description={
        <>
          Group multiple active notifications into an interactive card deck that collapses to save space and{' '}
          <b>expands or collapses</b> on click or tap depending on its current state.
        </>
      }
    >
      <PreviewBlock code={stackCode} githubUrl={githubUrl}>
        <div className="flex flex-col space-y-4">
          <StackedToasts />
          <StackedToasts position="top-left" />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<ToastProvider>
  <App />
</ToastProvider>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <Code text='role="alert"' /> and <Code text='aria-live="assertive"' /> for error toasts so critical
          feedback is announced immediately to screen readers.
        </li>
        <li>
          Uses <Code text='role="status"' /> and <Code text='aria-live="polite"' /> for non-critical notifications
          (success, info, warning) to avoid interrupting ongoing screen reader speech.
        </li>
        <li>
          The floating toast container is wrapped with <Code text='role="region"' /> and an accessible label (
          <Code text='aria-label="Notifications"' />
          ), which can be customized or overridden via props.
        </li>
        <li>
          Automatically shifts focus to error notifications when mounted and restores focus to the previously active
          element upon dismissal.
        </li>
        <li>Pauses the auto-dismiss timer on hover, allowing users extra time to read or interact with the content.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <Code text="--lithos-radius" /> CSS token,
        or per-instance via <Code text="className" /> (e.g. <Code text="rounded-full" />
        ). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="ToastProvider Props" data={toastProviderPropsData} />
      <div className="mt-8">
        <PropsAccordion title="addToast Options (ToastProps)" data={toastPropsData} />
      </div>
    </DocSection>
  </div>
)
