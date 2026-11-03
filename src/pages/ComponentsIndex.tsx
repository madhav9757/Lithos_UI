import { useState } from 'react'
import { RouteLink } from '../components/site/RouteLink'
import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { Toggle } from '../components/ui/Toggle'
import { KineticGrid } from '../components/ui/KineticGrid'
import { ToastItem } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Card, CardImage, CardContent } from '../components/ui/Card'
import { useTheme } from '../core/hooks/useTheme'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Alert } from '../components/ui/Alert'
import { Accordion } from '../components/ui/Accordion'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Calendar } from '../components/ui/Calendar'
import { Carousel, CarouselSlide } from '../components/ui/Carousel'
import { Checkbox } from '../components/ui/Checkbox'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownSub,
} from '../components/ui/Dropdown'

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../components/ui/Command'
import { Marquee } from '../components/ui/Marquee'
import { Pagination } from '../components/ui/Pagination'
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/Popover'
import { Select } from '../components/ui/Select'
import { Skeleton, SkeletonText } from '../components/ui/Skeleton'
import { isUnreleasedComponent } from '../core/unreleasedRegistry'
import { Slider } from '../components/ui/Slider'
import { Spinner } from '../components/ui/Spinner'
import {
  IconClose,
  IconHome,
  IconFolder,
  IconSettings,
  IconArrowRight,
  IconHeart,
  IconSearch,
} from '../components/ui/icons'
import { Input } from '../components/ui/Input'
import { Kbd, KbdGroup } from '../components/ui/Kbd'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table'
import { Typography } from '../components/ui/Typography'
import { Tooltip } from '../components/ui/tooltip/Tooltip'
import { TooltipTrigger } from '../components/ui/tooltip/TooltipTrigger'
import { TooltipContent } from '../components/ui/tooltip/TooltipContent'
import card1 from '../docs/assets/images/card1.webp'

import { componentPages, type DocPageConfig } from '../core/lithos.utils'
import { useMediaQuery } from '../core/hooks/useMediaQuery'

const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'projects', label: 'Projects', icon: IconFolder },
  { id: 'settings', label: 'Settings', icon: IconSettings },
]

const FRAMEWORK_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Preact', value: 'preact' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

const slideClass = 'h-[3.5rem] flex items-center justify-center font-black text-sm'

const TogglePreview = () => {
  const [on, setOn] = useState(true)
  return <Toggle checked={on} onToggle={() => setOn(!on)} />
}

const ToastPreview = () => {
  const { accentColor } = useTheme()
  return (
    <div className="w-[120%] scale-[0.7] origin-center pointer-events-none mt-6">
      <ToastItem
        toast={{ id: 'prev-toast', message: 'Yummy toast', intent: 'success', color: accentColor, title: 'SUCCESS' }}
        onRemove={() => {}}
      />
    </div>
  )
}

const AlertPreview = () => {
  const { accentColor } = useTheme()
  return (
    <div className="w-[140%] scale-[0.55] origin-center pointer-events-none">
      <Alert color={accentColor} title="Notice">
        Structural review pending.
      </Alert>
    </div>
  )
}

const SidebarPreview = () => {
  const [active, setActive] = useState('home')

  return (
    <div className="flex w-full flex-col justify-between my-auto">
      <div className="flex w-full overflow-hidden rounded-md border border-black bg-white">
        <aside className="flex w-28 flex-col space-y-1 border-r border-black p-1.5">
          <Typography variant="h6" as="h4" className="pl-1 border-b-2 border-(--lithos-border)">
            Lithos UI
          </Typography>

          {SIDEBAR_ITEMS.map((item) => {
            const isActive = active === item.id

            return (
              <Button
                variant={isActive ? 'primary' : 'text'}
                key={item.id}
                onClick={() => setActive(item.id)}
                className={'justify-start space-x-2 py-0.5 px-1'}
              >
                <item.icon strokeWidth="3" size={14} />
                <Typography variant="small" className="truncate" title={item.label}>
                  {item.label}
                </Typography>
              </Button>
            )
          })}
        </aside>

        <div className="flex-1 p-2">
          <Typography variant="small">
            Viewing active item
            <Typography variant="mark">{SIDEBAR_ITEMS.find((item) => item.id === active)?.label}</Typography>
          </Typography>
        </div>
      </div>
    </div>
  )
}

const getComponentPreview = (name: string) => {
  switch (name) {
    case 'Accordion':
      return (
        <Accordion
          title="Is this product free?"
          classes={{ container: 'min-w-20', header: 'text-sm', content: 'text-xs' }}
        >
          Yeah! This product is 100% free.
        </Accordion>
      )
    case 'Alert':
      return <AlertPreview />
    case 'Avatar':
      return <Avatar variant="solid" alt="Jane Doe" />
    case 'Badge':
      return (
        <Badge intent="accent" size="md">
          Feature
        </Badge>
      )
    case 'Breadcrumb':
      return (
        <div className="scale-[0.75] origin-center">
          <Breadcrumb
            items={[
              { label: 'Home', href: '#' },
              { label: 'Docs', active: true },
            ]}
          />
        </div>
      )
    case 'Button':
      return <Button className="cursor-pointer">Button</Button>
    case 'Calendar':
      return <Calendar className="pointer-events-none scale-[0.32] origin-center" />
    case 'Card':
      return (
        <Card
          variant="accent"
          className="pointer-events-none w-32 group-hover/link:bg-(--lithos-accent) group-hover/link:text-(--lithos-accent-text) transition-colors"
        >
          <CardImage src={card1} alt="Preview" className="h-16!" />
          <CardContent className="p-2">
            <p className="font-black uppercase text-[10px] tracking-tight leading-none mb-1">Accent Card</p>
            <p className="font-body opacity-70 text-[8px] leading-tight">Hover to see fill.</p>
          </CardContent>
        </Card>
      )
    case 'Carousel':
      return (
        <div className="w-full h-full scale-[0.9] pointer-events-none">
          <Carousel title="LITHOS UI!" hidePagination loop playInfinite playInterval={3000}>
            <CarouselSlide className={slideClass}>Slide 1</CarouselSlide>
            <CarouselSlide className={slideClass}>Slide 2</CarouselSlide>
            <CarouselSlide className={slideClass}>Slide 3</CarouselSlide>
          </Carousel>
        </div>
      )
    case 'Checkbox':
      return (
        <div className="flex flex-col items-start [&>*:not(:first-child)]:mt-2 pointer-events-none">
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Unchecked" />
        </div>
      )
    case 'Command':
      return (
        <div className="w-[120%] scale-[0.5] origin-center pointer-events-none">
          <Command className="h-48 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)]">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )
    case 'Dialog':
      return (
        <div className="w-[130%] scale-[0.45] origin-center pointer-events-none border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[6px_6px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
          <div className="flex items-center justify-between p-4 border-b-2 border-(--lithos-border)">
            <p className="font-black uppercase tracking-tight leading-none m-0 text-lg">Confirm</p>
            <IconClose aria-hidden="true" className="w-4 h-4" />
          </div>
          <div className="p-4 font-body text-sm opacity-70">Delete this item?</div>
          <div className="flex items-center justify-end p-4 border-t-2 border-(--lithos-border)">
            <Button className="text-sm">Delete</Button>
          </div>
        </div>
      )
    case 'Drawer':
      return (
        <div className="w-full h-full scale-[0.7] origin-center flex items-end justify-center pointer-events-none pb-4">
          <div className="w-[80%] h-24 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-t-(--lithos-radius) flex flex-col items-center pt-2 px-4 relative">
            <div className="w-8 h-1 bg-(--lithos-border) rounded-full mb-2 opacity-50" />
            <div className="w-full h-4 bg-(--lithos-border)/10 rounded-sm mb-2" />
            <div className="w-3/4 h-4 bg-(--lithos-border)/10 rounded-sm" />
          </div>
        </div>
      )
    case 'Dropdown':
      return (
        <Dropdown placement="bottom-start">
          <DropdownTrigger asChild>
            <Button variant="accent">My account</Button>
          </DropdownTrigger>

          <DropdownContent className="w-56">
            <DropdownGroup label="Settings">
              <DropdownItem onClick={() => console.log('Go to profile')}>Profile</DropdownItem>

              <DropdownItem onClick={() => console.log('Go to plan')}>Plan</DropdownItem>

              <DropdownItem disabled className="flex flex-col items-start space-y-2">
                <span>Integrations</span>
                <span className="opacity-60">(Coming soon)</span>
              </DropdownItem>
            </DropdownGroup>

            <DropdownSeparator />

            <DropdownSub
              trigger={
                <span className="flex items-center justify-between w-full">
                  Preferences <span>▶</span>
                </span>
              }
            >
              <DropdownItem>Dark Mode</DropdownItem>
              <DropdownItem>Language</DropdownItem>
            </DropdownSub>

            <DropdownSeparator />

            <DropdownGroup>
              <DropdownItem
                onClick={() => console.log('Log out')}
                className="text-red-500 hover:bg-red-500/5 focus:bg-red-500/5"
              >
                Log out
              </DropdownItem>
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      )
    case 'Icons':
      return (
        <div className="flex items-center space-x-3 text-(--lithos-text)">
          <IconHeart size={22} className="text-(--lithos-accent)" fill="var(--lithos-accent)" />
          <IconSearch size={22} strokeWidth={3} />
          <IconArrowRight size={22} strokeWidth={3} />
        </div>
      )
    case 'Input':
      return <Input placeholder="Input" className="w-24 pointer-events-none" />
    case 'Kbd':
      return (
        <KbdGroup>
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      )
    case 'Marquee':
      return (
        <div className="w-full py-1 overflow-hidden pointer-events-none">
          <Marquee speed="normal" noPause className="shadow-none border-y-2 border-x-0 py-1.5 bg-(--lithos-bg)">
            <span className="font-mono font-black text-[11px] tracking-widest text-(--lithos-accent)">NEO-BRUTAL</span>
            <span className="font-mono text-xs text-(--lithos-text)">✦</span>
            <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-(--lithos-text)">
              LITHOS UI
            </span>
            <span className="font-mono text-xs text-(--lithos-text)">✦</span>
            <span className="font-mono font-black text-[11px] tracking-widest text-(--lithos-accent)">CONTINUOUS</span>
            <span className="font-mono text-xs text-(--lithos-text)">✦</span>
          </Marquee>
        </div>
      )
    case 'Pagination':
      return (
        <div inert aria-hidden="true">
          <Pagination count={3} defaultPage={2} size="sm" aria-label="Pagination preview" />
        </div>
      )
    case 'Popover':
      return (
        <div className="w-full scale-[0.6] origin-center flex flex-col items-center pointer-events-none mt-2">
          <Popover open={true} modal={false}>
            <PopoverTrigger asChild>
              <Button className="mb-2">Open</Button>
            </PopoverTrigger>
            <PopoverContent
              portaled={false}
              className="p-3 w-32 border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) z-0"
            >
              <p className="font-bold text-sm m-0 leading-tight">Settings</p>
              <p className="text-[10px] opacity-70 m-0 leading-tight mt-1">Preferences.</p>
            </PopoverContent>
          </Popover>
        </div>
      )
    case 'Select':
      return <Select options={FRAMEWORK_OPTIONS} placeholder="Select a framework..." />
    case 'Sidebar':
      return <SidebarPreview />
    case 'Skeleton':
      return (
        <div className="w-full max-w-48 p-2">
          <Skeleton variant="rectangular" height={44} tone="accent" className="mb-4" />
          <SkeletonText lines={2} className="text-xs" />
        </div>
      )
    case 'Slider':
      return <Slider size="sm" defaultValue={40} aria-label="Example volume" className="max-w-48" />
    case 'Spinner':
      return (
        <div className="w-full flex justify-center p-2">
          <Spinner size={32} variant="accent" />
        </div>
      )
    case 'Table':
      return (
        <div className="w-full p-3">
          <Table size="sm" aria-label="Example invoices">
            <TableHeader variant="accent">
              <TableRow>
                <TableHead scope="col">Invoice</TableHead>
                <TableHead scope="col" className="text-end">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead scope="row">INV-001</TableHead>
                <TableCell className="text-end">$250</TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">INV-002</TableHead>
                <TableCell className="text-end">$150</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )
    case 'Tabs':
      return (
        <div className="w-[120%] scale-[0.55] origin-center pointer-events-none mt-2">
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value="1">Tab 1</TabsTrigger>
              <TabsTrigger value="2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="1">Content 1</TabsContent>
            <TabsContent value="2">Content 2</TabsContent>
          </Tabs>
        </div>
      )
    case 'Toast':
      return <ToastPreview />
    case 'Toggle':
      return <TogglePreview />
    case 'Tooltip':
      return (
        <div className="w-full scale-[0.7] origin-center flex justify-center pointer-events-none mt-10">
          <Tooltip initialOpen={true} placement="top">
            <TooltipTrigger asChild>
              <Button>Hover Me</Button>
            </TooltipTrigger>
            <TooltipContent className="z-0">Tooltips provide context</TooltipContent>
          </Tooltip>
        </div>
      )
    case 'Typography':
      return (
        <Typography variant="mark" className="-rotate-3">
          14 Typography Variants!
        </Typography>
      )
    default:
      return null
  }
}

const ComponentCard = ({ page }: { page: DocPageConfig }) => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const rootMargin = isMobile ? '500px' : '200px'

  return (
    <div className="w-full sm:w-[50%] md:w-[33.333%] lg:w-[25%] p-3">
      <RouteLink
        to={page.to}
        importRoute={page.loader}
        rootMargin={rootMargin}
        className="block group/link h-full outline-none"
      >
        <Card interactive className="h-full flex flex-col p-0">
          {/* Top Zone: Live Preview */}
          <div className="w-full aspect-4/3 sm:aspect-3/2 md:aspect-video flex items-center justify-center bg-(--lithos-surface) p-2 overflow-hidden relative border-b-2 border-(--lithos-border) font-normal tracking-normal leading-normal">
            {getComponentPreview(page.label)}
          </div>

          {/* Bottom Zone: Thin Label Strip */}
          <CardContent spacing="sm" className="grow flex flex-row items-center justify-between bg-(--lithos-strata)">
            <h2 className="text-xl font-black tracking-tighter leading-none text-(--lithos-text)">{page.label}</h2>
            {isUnreleasedComponent(page.label) && (
              <Badge intent="accent" size="sm" className="font-mono font-black text-[10px] tracking-wider">
                NEW
              </Badge>
            )}
          </CardContent>
        </Card>
      </RouteLink>
    </div>
  )
}

export const ComponentsIndex = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-(--lithos-strata) text-(--lithos-text)">
      <section className="border-b-2 border-(--lithos-border) bg-(--lithos-strata)">
        <KineticGrid baseOpacity="opacity-10" className="pt-20 pb-12 md:pt-28 md:pb-24 w-full">
          <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
                EVERY PRIMITIVE. ONE SOURCE.
              </p>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
                THE PARTS THAT <br /> DON'T BREAK
              </h1>
              <h2 className="mt-4 text-3xl sm:text-4xl font-display md:text-5xl italic text-(--lithos-accent) max-w-4xl mx-auto lg:mx-0">
                Every primitive is built with strict adherence to structural integrity.
              </h2>
            </div>
          </div>
        </KineticGrid>
      </section>

      <section className="py-24 bg-(--lithos-strata)">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap -m-3">
            {componentPages.map((page) => (
              <ComponentCard key={page.to} page={page} />
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
)
