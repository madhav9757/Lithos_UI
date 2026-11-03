import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { DocHeader, DocHeading, DocSection, DocExample, DocList } from '../layout/DocPage'
import { SetupGuide } from '../layout/SetupGuide'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { textareaPropsData } from '../propsData/textarea'
import { BasicTextareaExample } from '../examples/textarea/basic'
import basicSource from '../examples/textarea/basic.tsx?raw'
import { InvalidTextareaExample } from '../examples/textarea/invalid'
import invalidSource from '../examples/textarea/invalid.tsx?raw'
import { RequiredTextareaExample } from '../examples/textarea/required'
import requiredSource from '../examples/textarea/required.tsx?raw'
import { ReadOnlyTextareaExample } from '../examples/textarea/readOnly'
import readOnlySource from '../examples/textarea/readOnly.tsx?raw'
import { ResizeTextareaExample } from '../examples/textarea/resize'
import resizeSource from '../examples/textarea/resize.tsx?raw'
import { TextareaSizesExample } from '../examples/textarea/sizes'
import sizesSource from '../examples/textarea/sizes.tsx?raw'
import { TextareaGroupExample } from '../examples/textarea/group'
import groupSource from '../examples/textarea/group.tsx?raw'
import { AutoSizeTextareaExample } from '../examples/textarea/autoSize'
import autoSizeSource from '../examples/textarea/autoSize.tsx?raw'
import { DisabledTextareaExample } from '../examples/textarea/disabled'
import disabledSource from '../examples/textarea/disabled.tsx?raw'
import { TextareaVariantsExample } from '../examples/textarea/variants'
import variantsSource from '../examples/textarea/variants.tsx?raw'
import { TextareaFormExample } from '../examples/textarea/form'
import formSource from '../examples/textarea/form.tsx?raw'
import { CharacterCountTextareaExample } from '../examples/textarea/characterCount'
import characterCountSource from '../examples/textarea/characterCount.tsx?raw'
import { WordCountTextareaExample } from '../examples/textarea/wordCount'
import wordCountSource from '../examples/textarea/wordCount.tsx?raw'

const manualPath = '../../components/ui/Textarea'
const githubUrl = getComponentGithubUrl('textarea')
const examples = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'A minimal multiline text field.',
    source: basicSource,
    Component: BasicTextareaExample,
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Use variant to change the field appearance. Choose plain, outlined, soft, or solid.',
    source: variantsSource,
    Component: TextareaVariantsExample,
  },
  {
    id: 'form',
    title: 'Form',
    description: 'Pair a required textarea with a submit button.',
    source: formSource,
    Component: TextareaFormExample,
  },
  {
    id: 'textarea-group',
    title: 'Textarea group',
    description: 'Compose a textarea with attachment, emoji, and send controls.',
    source: groupSource,
    Component: TextareaGroupExample,
  },
  {
    id: 'character-count',
    title: 'Character count',
    description: 'Show characters used and remaining. maxLength prevents typing or pasting beyond the limit.',
    source: characterCountSource,
    Component: CharacterCountTextareaExample,
  },
  {
    id: 'word-count',
    title: 'Word count',
    description: 'Show words used and remaining, and prevent additional words once the limit is reached.',
    source: wordCountSource,
    Component: WordCountTextareaExample,
  },
  {
    id: 'auto-size',
    title: 'Auto size',
    description: 'Set autoSize to grow the field from one row as content is added.',
    source: autoSizeSource,
    Component: AutoSizeTextareaExample,
  },
  {
    id: 'resize',
    title: 'Resize',
    description: 'Use resize to control the native resize handle.',
    source: resizeSource,
    Component: ResizeTextareaExample,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'The native disabled attribute prevents editing and removes the field from keyboard focus.',
    source: disabledSource,
    Component: DisabledTextareaExample,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description: 'Set invalid to communicate a validation error.',
    source: invalidSource,
    Component: InvalidTextareaExample,
  },
  {
    id: 'required',
    title: 'Required',
    description: 'Use the native required attribute to prevent empty form submission.',
    source: requiredSource,
    Component: RequiredTextareaExample,
  },
  {
    id: 'read-only',
    title: 'Read only',
    description: 'The native readOnly attribute prevents editing while keeping the text selectable.',
    source: readOnlySource,
    Component: ReadOnlyTextareaExample,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Use size to control typography and padding, and rows to set the visible line count.',
    source: sizesSource,
    Component: TextareaSizesExample,
  },
]

export const TextareaDoc = () => (
  <div className="mx-auto max-w-5xl px-6">
    <DocHeader
      title="Textarea"
      description="A multiline form primitive that wraps the native textarea element with theme awareness."
    />
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide slug="textarea" componentNames={['Textarea']} manualPath={manualPath} />
      <p className="mb-4">
        Field, FieldLabel, and FieldDescription are exported from Typography. For source installation, also add
        typography; the action examples use button and icons.
      </p>
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    {examples.map(({ id, title, description, source, Component }) => (
      <DocExample key={id} id={id} title={title} description={description}>
        <PreviewBlock
          githubUrl={githubUrl}
          code={{
            body: removeImports(source),
            componentNames: [
              'Textarea',
              'Field',
              'FieldLabel',
              ...(['basic', 'sizes', 'variants'].includes(id) ? [] : ['FieldDescription']),
              ...(id === 'textarea-group'
                ? ['Button', 'FiPaperclip', 'FiSmile', 'useId', 'useRef', 'useState']
                : id === 'form'
                  ? ['Button', 'useState']
                  : ['character-count', 'word-count'].includes(id)
                    ? ['useState']
                    : []),
            ],
            manualPath: {
              others: manualPath,
              Field: '../../components/ui/Typography',
              FieldLabel: '../../components/ui/Typography',
              FieldDescription: '../../components/ui/Typography',
              Button: '../../components/ui/Button',
              'react-icons/fi': ['FiPaperclip', 'FiSmile'],
              react: ['useId', 'useRef', 'useState'],
            },
          }}
        >
          <Component />
        </PreviewBlock>
      </DocExample>
    ))}
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Textarea can stand alone or compose with a label and description inside Field.
      </p>
      <CodeViewer
        language="tsx"
        code={`<Textarea />

<Field>
  <FieldLabel />
  <Textarea />
  <FieldDescription />
</Field>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Wrap Textarea in Field with a FieldLabel and optional FieldDescription, imported from Typography. Label and
          description IDs connect automatically; use Field controlId for an explicit control ID.
        </li>
        <li>
          Set invalid for errors. FieldDescription explains the error; additional aria-describedby IDs are preserved.
        </li>
        <li>
          required is native validation; it does not imply invalid. disabled prevents focus, editing, and form
          submission. Keep both optional.
        </li>
        <li>
          Native editing, multiline Enter, form submission, refs, and controlled or uncontrolled values are preserved.
        </li>
        <li>Vertical resizing is enabled by default. Use resize to change it, or className for custom styling.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Textarea Props" data={textareaPropsData} />
    </DocSection>
  </div>
)
