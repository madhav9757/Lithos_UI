# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.5]

### Added (0.1.5)

- **Textarea:** Added a native multiline field matching Input sizing, with plain, outlined, soft, and solid variants, accessible validation, automatic sizing, and manual resize controls.
- Added Textarea documentation, code-only Anatomy, props reference, lazy route, navigation, component showcase, package exports, CLI installation, and behavior/accessibility tests.
- Added Typography Field, FieldLabel, and FieldDescription helpers for connected labels and descriptions, plus Textarea examples with submit buttons, local attachments, emoji insertion, and enforced character/word limits.

- **Slider:** Added a native horizontal/vertical range primitive with controlled/uncontrolled values, numeric change callbacks, bounds and steps, disabled state, three thumb sizes, native form support, and theme-token track/thumb styling.
- Added Slider documentation, standalone examples, props reference, component showcase, navigation, package exports, CLI registry entry, and behavior/accessibility tests.
- Added square and round shapes, filled sliders controlling whole-app brightness with both icons inside or outside, a three-color Easy/Medium/Hard distribution slider with adjustable shares totaling 100%, and optional custom thumb colors with YIQ border contrast.
- Added a two-handle range slider example with theme-styled handles, a highlighted selected interval, 1% increments, and keyboard-accessible minimum/maximum values.
- Added separate horizontal and vertical orientation examples and consistent arrow-key stepping for both axes.
- Kept Slider as a native input wrapper: the browser handles keyboard stepping, and React change callbacks update consumer state.
- Added evenly and unevenly distributed stepped examples with labeled stops and snapping.
- Simplified Slider event/style handling and brightness state updates; app filter cleanup now runs when the brightness demo unmounts instead of resetting on each adjustment.

## [0.1.4]

### Added (0.1.4)

- **Typography:** Added the `Typography` primitive ([#335](https://github.com/lithosui/Lithos_UI/pull/335))
- Added a **ThemeProvider** to synchronize the calls to the new `useTheme` hook _(before useLithosTheme)_ ([#337](https://github.com/lithosui/Lithos_UI/pull/337))
- **Table:** Added the `Table` primitive ([#341](https://github.com/lithosui/Lithos_UI/pull/341))
- **Sidebar:** Added the `Sidebar` primitive ([#346](https://github.com/lithosui/Lithos_UI/pull/346))
- **Pagination:** Added the `Pagination` primitive ([#350](https://github.com/lithosui/Lithos_UI/pull/350))
- **Icons:** Introduced the `Icons` primitive suite and interactive documentation explorer.
  - Standardized wrapper around `react-icons` with unified default geometry (`size: 16`, `strokeWidth: 2`) and design token compatibility.
  - Added `icons.types.ts` defining `IconProps` and `iconDefaults` with backwards-compatible re-exports in `IconBase.tsx`.
  - Exported 44 vector icon components and added `icons` to the CLI registry and component exports.
  - Added interactive Gallery Explorer with real-time name and tag search, size and stroke thickness toggle controls, click-to-copy JSX tags, and expandable pagination with Lithos `Button`.
  - Zero-Gap Rule compliance across the gallery grid using explicit margin and padding math.
  - Comprehensive documentation page with standalone examples (`default`, `withButton`, `sizeAndStroke`, `colorAndToken`), Anatomy code preview, and custom props API reference.
  - Integrated Icons card into the Components Index page.

### Changed (0.1.4)

- **Toast:** Added JSDoc comments to the `Toast` types and the `addToast` function now
  accepts a `label` that is used on the `Toast` close button. ([#357](https://github.com/lithosui/Lithos_UI/pull/357))

### Fixed (0.1.4)

- The `Tooltip` arrow appeared detached from the floating element when using a non-sharp radius.
- **Tabs:** Fixed `TabsList` default variant wrapping behavior by replacing one-dimensional `[&>*:not(:first-child)]:ml-4` with zero-gap compliant `-m-1 [&>*]:m-1` margin distribution. Tab triggers now wrap cleanly across multiple lines on smaller viewports with consistent vertical and horizontal clearance, preventing overlap.

### Removed (0.1.4)

## [0.1.3]

### Added (0.1.3)

### Changed (0.1.3)

### Fixed (0.1.3)

### Removed (0.1.3)

## [0.1.2]

### Added (0.1.2)

- **Skeleton & SkeletonText:** Added loading placeholder components ([#320](https://github.com/lithosui/Lithos_UI/pull/320)).
  - Text, rectangular, rounded, and circular variants with customizable dimensions and neutral or accent tones.
  - Shimmer animation enabled by default, with pulse and disabled animation options, opt-in reduced-motion support, and forced-colors support.
  - Multi-line text placeholders with configurable line count and last-line width, hidden from assistive technology and marked inert.
  - Documentation with installation instructions, props tables, and animation, card, list, and avatar examples, plus component tests.
- **Zero-Dependency CLI Installer:** Introduced `lithos-ui init` and `lithos-ui add <component>`.
  - Scaffolds a lightweight `lithos.json` configuration file.
  - Automatically fetches raw components, blocks, and all transitive dependencies (including local files and SVG icons) directly from GitHub.
  - Implements an intelligent, regex-based import rewrite engine (via Node's native `path` module) that recalculates relative import paths on the fly to match the consumer's custom directory structure.
  - Automatically injects neo-brutalist variables from `tokens.css` into the consumer's global CSS file, ensuring a seamless theming setup out-of-the-box.
  - Evaluates NPM dependencies required by downloaded components and outputs terminal warnings for manual installation.
  - Added `src/cli/registry.ts` to act as the single source of truth for component dependencies. The documentation's `SetupGuide.tsx` now dynamically pulls from this registry to prevent drift.
- **Dropdown:** Added the dropdown primitive ([#315](https://github.com/lithosui/Lithos_UI/pull/315)).
- **useListKeyNavigation:** Added hook to manage keyboard events easily and allowing 2D navigation. Currently being used by the `Dropdown` and `Select` primitives. ([#315](https://github.com/lithosui/Lithos_UI/pull/315))
- **Command:** Introduced neo-brutalist Command palette and ⌘K menu primitive suite ([#331](https://github.com/lithosui/Lithos_UI/pull/331)).
  - Zero-dependency, accessible keyboard-driven command menu (`Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandLoading`, `CommandGroup`, `CommandItem`, `CommandItemDescription`, `CommandBadge`, `CommandShortcut`, `CommandSeparator`, `CommandFooter`, `CommandDialog`).
  - Real-time client-side substring and keyword fuzzy searching with auto-hiding empty groups.
  - Full keyboard navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, `Escape`) with disabled item skipping and auto-scroll into view.
  - Integrated with Lithos UI primitives: mechanical keycaps via `Kbd`, intent tags via `Badge`, clearable search via `IconClose`, and modal overlays via `Dialog`.
  - Added desktop-grade `CommandFooter` status bar with interactive keycap hints and dynamic match counter.
  - Zero-Gap Rule compliance across all subcomponents using explicit margin/padding calculations and no CSS `gap`.
  - Comprehensive documentation page with live interactive examples (Basic, Shortcuts & Badges, and Dialog modal) and full `propsData` tables.
  - Vitest test suite with 14 unit tests achieving 100% pass rate and `jest-axe` automated accessibility compliance.
- Added lithos-ui CSS **z-index variables** ([#329](https://github.com/lithosui/Lithos_UI/pull/329)).
- **Drawer:** Added the drawer primitive ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).
- **useMediaQuery:** Added hook to use listen to media queries ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).

### Changed (0.1.2)

- Improved DX by allowing the `role` prop to be passed directly to the Popover component, simplifying `Dropdown` and `Select` implementations ([#318](https://github.com/lithosui/Lithos_UI/pull/318)).
- Added `matchTriggerWidth` prop to the **Popover** primitive ([#327](https://github.com/lithosui/Lithos_UI/pull/327)).
- Added `transitionDuration` prop to the **PopoverContent** component ([#327](https://github.com/lithosui/Lithos_UI/pull/327)).
- **Kbd & KbdGroup:** Introduced keyboard keycap and shortcut group UI primitives ([#328](https://github.com/lithosui/Lithos_UI/pull/328)).
  - Semantic `<kbd>` component with tactical keycap proportions, calibrated vertical/horizontal centering, and 0px-blur brutalist hard-drop shadows.
  - Multiple size steps (`xs`, `sm`, `md`, `lg`) and visual style variants (`default`, `accent`, `outline`, `solid`, `subtle`, `inverse`).
  - Dynamic YIQ biological contrast engine integration for custom HEX background colors.
  - `KbdGroup` compound component adhering to the Zero-Gap Rule with explicit margin spacing and an `attached` mode for fused multi-key strips.
  - Comprehensive documentation page with interactive shortcut examples, 5-color custom palette row, and live `Ctrl + K` input focus integration.
  - Unit tests with 100% pass rate and `jest-axe` accessibility compliance.
  - Scoped the generic `kbd` selector in `src/tokens.css` to `kbd:not([data-slot="kbd"])` to avoid polluting the `Kbd` component styling ([#328](https://github.com/lithosui/Lithos_UI/pull/328)).
- Properly arranged the components and blocks ([#303](https://github.com/lithosui/Lithos_UI/pull/303)).
- Improved the hero title responsiveness ([#305](https://github.com/lithosui/Lithos_UI/pull/305)).
- The `PopoverContent` now passes the transition status as `data-status` ([#322](https://github.com/lithosui/Lithos_UI/pull/332)).

### Fixed (0.1.2)

- Fixed select scrollbar overflow ([#309](https://github.com/lithosui/Lithos_UI/pull/309)).
- Fixed breadcrumb primitive items wrap ([#304](https://github.com/lithosui/Lithos_UI/pull/304)).
- Fixed clipping of border radius on underline tabs ([#302](https://github.com/lithosui/Lithos_UI/pull/302)).
- Fixed invalid type usage on the `PreviewBlock` and the `deriveUsageCode` doc. utility ([#330](https://github.com/lithosui/Lithos_UI/pull/330)).

### Removed (0.1.2)

## [0.1.1]

### Added (0.1.1)

- Tooltip component ([#277](https://github.com/lithosui/Lithos_UI/pull/277)).

### Changed (0.1.1)

- Comprehensive manual audit and synchronization of component `propsData` documentation with source typings.

### Fixed (0.1.1)

- Fixes for v0.1.0 for the components were made.
- Make the icon inside the checkbox move along with the box ([#276](https://github.com/lithosui/Lithos_UI/pull/276)).

### Removed (0.1.1)

## [0.0.0]

### Added (0.0.0)

- Initial pre-1.0 release of Lithos UI as a copy-paste React template repository.
- Zero-Gap layout architecture across landing and docs surfaces using explicit margin/padding spacing.
- YIQ-based automated contrast engine (`getContrastText`) for accent/foreground token selection.
- Universal specificity override system via runtime style injection in `useTheme` (`!important` token rebinding for accent and selection).
- Global physics token utility (`.lithos-click`) for shared brutalist interaction states.
- Initial component set:
  - Blocks: `Hero`, `FeatureGrid`, `Pricing`, `Testimonials`, `FAQ`, `ThemeEngine`.
  - Layout: `Navbar`, `Footer`, `NotFound`, `ComingSoon`.
  - UI primitives: `CodeViewer`, `PreviewBlock`, `ToastProvider`, `Toggle`, `KineticGrid`.
- Documentation routes/pages for introduction, installation, and core primitives (`CodeViewer`, `PreviewBlock`, `Toast`, `Toggle`).
- GitHub Actions CI workflow to lint and build on pushes and pull requests to `main`.

### Changed (0.0.0)

### Fixed (0.0.0)

### Removed (0.0.0)
