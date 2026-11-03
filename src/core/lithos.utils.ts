/**
 * @fileoverview Lithos UI global navigation and routes configuration.
 * - Centralizes all app links, documentation pages, and their dynamic import loaders.
 */

import type { ComponentType } from 'react'

export interface AppLink {
  to: string
  label: string
  importRoute: () => Promise<unknown>
}

export interface DocPageConfig {
  path: string
  to: string
  label: string
  category: 'Getting Started' | 'Components'
  loader: () => Promise<{ default: ComponentType<unknown> }>
}

export const LITHOS_UI_LINKS: readonly AppLink[] = [
  {
    to: '/components',
    label: 'Components',
    importRoute: () => import('../pages/ComponentsIndex').then((m) => ({ default: m.ComponentsIndex })),
  },
  {
    to: '/blocks',
    label: 'Blocks',
    importRoute: () => import('../pages/BlocksIndex').then((m) => ({ default: m.BlocksIndex })),
  },
  {
    to: '/templates',
    label: 'Templates',
    importRoute: () => import('../pages/TemplatesIndex').then((m) => ({ default: m.TemplatesIndex })),
  },
  {
    to: '/theme',
    label: 'Theme',
    importRoute: () => import('../pages/ThemeBuilder').then((m) => ({ default: m.ThemeBuilder })),
  },
  {
    to: '/faq',
    label: 'FAQ',
    importRoute: () => import('../pages/Faq').then((m) => ({ default: m.Faq })),
  },
  {
    to: '/docs',
    label: 'Docs',
    importRoute: () => import('../docs/pages/Introduction').then((m) => ({ default: m.Introduction })),
  },
] as const

export const DOC_PAGES: readonly DocPageConfig[] = [
  {
    path: '',
    to: '/docs',
    label: 'Introduction',
    category: 'Getting Started',
    loader: () => import('../docs/pages/Introduction').then((m) => ({ default: m.Introduction })),
  },
  {
    path: 'installation',
    to: '/docs/installation',
    label: 'Installation',
    category: 'Getting Started',
    loader: () => import('../docs/pages/Installation').then((m) => ({ default: m.Installation })),
  },

  {
    path: 'accordion',
    to: '/docs/accordion',
    label: 'Accordion',
    category: 'Components',
    loader: () => import('../docs/pages/Accordion').then((m) => ({ default: m.AccordionDoc })),
  },
  {
    path: 'alert',
    to: '/docs/alert',
    label: 'Alert',
    category: 'Components',
    loader: () => import('../docs/pages/Alert').then((m) => ({ default: m.AlertDoc })),
  },
  {
    path: 'avatar',
    to: '/docs/avatar',
    label: 'Avatar',
    category: 'Components',
    loader: () => import('../docs/pages/Avatar').then((m) => ({ default: m.AvatarDoc })),
  },
  {
    path: 'badge',
    to: '/docs/badge',
    label: 'Badge',
    category: 'Components',
    loader: () => import('../docs/pages/Badge').then((m) => ({ default: m.BadgeDoc })),
  },
  {
    path: 'breadcrumb',
    to: '/docs/breadcrumb',
    label: 'Breadcrumb',
    category: 'Components',
    loader: () => import('../docs/pages/Breadcrumb').then((m) => ({ default: m.BreadcrumbDoc })),
  },
  {
    path: 'button',
    to: '/docs/button',
    label: 'Button',
    category: 'Components',
    loader: () => import('../docs/pages/Button').then((m) => ({ default: m.ButtonDoc })),
  },
  {
    path: 'calendar',
    to: '/docs/calendar',
    label: 'Calendar',
    category: 'Components',
    loader: () => import('../docs/pages/Calendar').then((m) => ({ default: m.CalendarDoc })),
  },
  {
    path: 'card',
    to: '/docs/card',
    label: 'Card',
    category: 'Components',
    loader: () => import('../docs/pages/Card').then((m) => ({ default: m.CardDoc })),
  },
  {
    path: 'carousel',
    to: '/docs/carousel',
    label: 'Carousel',
    category: 'Components',
    loader: () => import('../docs/pages/Carousel').then((m) => ({ default: m.CarouselDoc })),
  },
  {
    path: 'checkbox',
    to: '/docs/checkbox',
    label: 'Checkbox',
    category: 'Components',
    loader: () => import('../docs/pages/Checkbox').then((m) => ({ default: m.CheckboxDoc })),
  },
  {
    path: 'command',
    to: '/docs/command',
    label: 'Command',
    category: 'Components',
    loader: () => import('../docs/pages/Command').then((m) => ({ default: m.CommandDoc })),
  },
  {
    path: 'dialog',
    to: '/docs/dialog',
    label: 'Dialog',
    category: 'Components',
    loader: () => import('../docs/pages/Dialog').then((m) => ({ default: m.DialogDoc })),
  },
  {
    path: 'drawer',
    to: '/docs/drawer',
    label: 'Drawer',
    category: 'Components',
    loader: () => import('../docs/pages/Drawer').then((m) => ({ default: m.DrawerDoc })),
  },
  {
    path: 'dropdown',
    to: '/docs/dropdown',
    label: 'Dropdown',
    category: 'Components',
    loader: () => import('../docs/pages/Dropdown').then((m) => ({ default: m.DropdownDoc })),
  },
  {
    path: 'icons',
    to: '/docs/icons',
    label: 'Icons',
    category: 'Components',
    loader: () => import('../docs/pages/Icons').then((m) => ({ default: m.IconsDoc })),
  },
  {
    path: 'input',
    to: '/docs/input',
    label: 'Input',
    category: 'Components',
    loader: () => import('../docs/pages/Input').then((m) => ({ default: m.InputDoc })),
  },
  {
    path: 'kbd',
    to: '/docs/kbd',
    label: 'Kbd',
    category: 'Components',
    loader: () => import('../docs/pages/Kbd').then((m) => ({ default: m.KbdDoc })),
  },
  {
    path: 'marquee',
    to: '/docs/marquee',
    label: 'Marquee',
    category: 'Components',
    loader: () => import('../docs/pages/Marquee').then((m) => ({ default: m.MarqueeDoc })),
  },
  {
    path: 'pagination',
    to: '/docs/pagination',
    label: 'Pagination',
    category: 'Components',
    loader: () => import('../docs/pages/Pagination').then((m) => ({ default: m.PaginationDoc })),
  },
  {
    path: 'popover',
    to: '/docs/popover',
    label: 'Popover',
    category: 'Components',
    loader: () => import('../docs/pages/Popover').then((m) => ({ default: m.PopoverPage })),
  },
  {
    path: 'select',
    to: '/docs/select',
    label: 'Select',
    category: 'Components',
    loader: () => import('../docs/pages/Select').then((m) => ({ default: m.SelectDoc })),
  },
  {
    path: 'sidebar',
    to: '/docs/sidebar',
    label: 'Sidebar',
    category: 'Components',
    loader: () => import('../docs/pages/Sidebar').then((m) => ({ default: m.SidebarDoc })),
  },
  {
    path: 'skeleton',
    to: '/docs/skeleton',
    label: 'Skeleton',
    category: 'Components',
    loader: () => import('../docs/pages/Skeleton').then((m) => ({ default: m.SkeletonDoc })),
  },
  {
    path: 'slider',
    to: '/docs/slider',
    label: 'Slider',
    category: 'Components',
    loader: () => import('../docs/pages/Slider').then((m) => ({ default: m.SliderDoc })),
  },
  {
    path: 'spinner',
    to: '/docs/spinner',
    label: 'Spinner',
    category: 'Components',
    loader: () => import('../docs/pages/Spinner').then((m) => ({ default: m.SpinnerDoc })),
  },
  {
    path: 'table',
    to: '/docs/table',
    label: 'Table',
    category: 'Components',
    loader: () => import('../docs/pages/Table').then((m) => ({ default: m.TableDoc })),
  },
  {
    path: 'tabs',
    to: '/docs/tabs',
    label: 'Tabs',
    category: 'Components',
    loader: () => import('../docs/pages/Tabs').then((m) => ({ default: m.TabsDoc })),
  },
  {
    path: 'toast',
    to: '/docs/toast',
    label: 'Toast',
    category: 'Components',
    loader: () => import('../docs/pages/Toast').then((m) => ({ default: m.ToastDoc })),
  },
  {
    path: 'toggle',
    to: '/docs/toggle',
    label: 'Toggle',
    category: 'Components',
    loader: () => import('../docs/pages/Toggle').then((m) => ({ default: m.ToggleDoc })),
  },
  {
    path: 'tooltip',
    to: '/docs/tooltip',
    label: 'Tooltip',
    category: 'Components',
    loader: () => import('../docs/pages/Tooltip').then((m) => ({ default: m.TooltipDoc })),
  },
  {
    path: 'typography',
    to: '/docs/typography',
    label: 'Typography',
    category: 'Components',
    loader: () => import('../docs/pages/Typography').then((m) => ({ default: m.TypographyDoc })),
  },
] as const

export const gettingStartedPages = DOC_PAGES.filter((p) => p.category === 'Getting Started')
export const componentPages = DOC_PAGES.filter((p) => p.category === 'Components').sort((a, b) =>
  a.label.localeCompare(b.label)
)
