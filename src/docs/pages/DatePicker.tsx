import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { datePickerPropsData } from '../propsData/datePicker'
import { SingleDatePicker } from '../examples/date-picker/single'
import { RangeDatePicker } from '../examples/date-picker/range'
import { PresetsDatePicker } from '../examples/date-picker/presets'
import { ClearableDatePicker } from '../examples/date-picker/clearable'
import { CompoundDatePicker } from '../examples/date-picker/compound'

import SingleDatePickerSource from '../examples/date-picker/single?raw'
import RangeDatePickerSource from '../examples/date-picker/range?raw'
import PresetsDatePickerSource from '../examples/date-picker/presets?raw'
import ClearableDatePickerSource from '../examples/date-picker/clearable?raw'
import CompoundDatePickerSource from '../examples/date-picker/compound?raw'
import { removeImports } from '../examples/removeImports'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/DatePicker.ts'
const componentNames = ['DatePicker', 'DatePickerInput', 'DatePickerTrigger', 'DatePickerContent', 'DatePickerPresets']
const manualPath = '../../components/ui/DatePicker'

const getCode = (source: string) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

export const DatePickerDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Date Picker
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A neo-brutalist date picker with single, range, presets, and compound API support powered by Floating UI and
          zero external date libraries.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Date Picker pairs the brutalist calendar grid with an accessible floating input overlay. It adheres to
          Lithos UI’s Zero-Gap policy and uses native <code>Date</code> and <code>Intl.DateTimeFormat</code> math for
          zero-dependency performance.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>
      <SetupGuide
        slug="date-picker"
        componentNames={componentNames}
        manualPath={manualPath}
        requires={[
          '@floating-ui/react',
          'utils/cn.ts',
          'components/ui/Calendar.tsx',
          'components/ui/icons/IconCalendar.tsx',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <div className="mb-12">
        <h3 id="single" className="text-xl font-bold mb-4 font-display">
          Single Date
        </h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          Turnkey single date picker that formats the date and automatically closes on selection.
        </p>
        <PreviewBlock code={getCode(SingleDatePickerSource)} githubUrl={githubUrl}>
          <div className="flex justify-center py-6 max-w-sm mx-auto">
            <SingleDatePicker />
          </div>
        </PreviewBlock>
      </div>

      <div className="mb-12">
        <h3 id="range" className="text-xl font-bold mb-4 font-display">
          Date Range
        </h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          Select a date span with start and end points displayed in a single brutalist field.
        </p>
        <PreviewBlock code={getCode(RangeDatePickerSource)} githubUrl={githubUrl}>
          <div className="flex justify-center py-6 max-w-sm mx-auto">
            <RangeDatePicker />
          </div>
        </PreviewBlock>
      </div>

      <div className="mb-12">
        <h3 id="presets" className="text-xl font-bold mb-4 font-display">
          With Presets
        </h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          Quick shortcuts for common date spans such as Today, Last 7 Days, and This Month.
        </p>
        <PreviewBlock code={getCode(PresetsDatePickerSource)} githubUrl={githubUrl}>
          <div className="flex justify-center py-6 max-w-sm mx-auto">
            <PresetsDatePicker />
          </div>
        </PreviewBlock>
      </div>

      <div className="mb-12">
        <h3 id="clearable" className="text-xl font-bold mb-4 font-display">
          Clearable Selection
        </h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          Inline clear button resets selected date value without closing the popover trigger.
        </p>
        <PreviewBlock code={getCode(ClearableDatePickerSource)} githubUrl={githubUrl}>
          <div className="flex justify-center py-6 max-w-sm mx-auto">
            <ClearableDatePicker />
          </div>
        </PreviewBlock>
      </div>

      <div className="mb-12">
        <h3 id="compound" className="text-xl font-bold mb-4 font-display">
          Compound Custom Composition
        </h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          Build custom date workflows by composing DatePickerTrigger, DatePickerContent, DatePickerPresets, and
          Calendar.
        </p>
        <PreviewBlock code={getCode(CompoundDatePickerSource)} githubUrl={githubUrl}>
          <div className="flex justify-center py-6 max-w-sm mx-auto">
            <CompoundDatePicker />
          </div>
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Use the turnkey DatePicker for immediate usage or compound subcomponents for full layout control:
        </p>
        <CodeViewer
          code={`<DatePicker mode="range" value={range} onChange={setRange}>
  <DatePickerInput placeholder="Select dates" />
  <DatePickerContent>
    <DatePickerPresets />
    <Calendar mode="range" />
  </DatePickerContent>
</DatePicker>`}
          language="tsx"
        />
      </div>

      <h2 id="accessibility" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Accessibility
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-12 font-body text-(--lithos-text) opacity-80">
        <li>
          Trigger element manages <code>aria-haspopup="dialog"</code> and <code>aria-expanded</code>.
        </li>
        <li>Focus is trapped inside the floating calendar dialog using FloatingFocusManager while open.</li>
        <li>
          Dismissible via the <code>Escape</code> key or clicking outside.
        </li>
        <li>Calendar day grid supports full arrow-key and Home/End keyboard navigation.</li>
      </ul>

      <h2 id="api-reference" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        API Reference
      </h2>
      <div className="mb-12">
        <PropsAccordion title="DatePicker Props" data={datePickerPropsData} />
      </div>
    </div>
  )
}
