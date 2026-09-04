"use client"

import { useState, type ReactNode } from "react"
import { format } from "date-fns"
import { enUS, mn } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import {
  AlertCircle,
  ArrowRight,
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  Copy,
  CreditCard,
  Download,
  Eye,
  ExternalLink,
  FileText,
  GitBranch,
  Home,
  ImagePlus,
  Inbox,
  Instagram,
  Layers3,
  Loader2,
  Maximize2,
  Menu,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Paperclip,
  Play,
  Plus,
  Redo2,
  Search,
  Send,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  Trash2,
  Undo2,
  Upload,
  UserRound,
  Workflow,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { plateCopy, type PlateLocale } from "./copy"

const palette = [
  ["Paper", "#F5F5EE", "bg-[#f5f5ee]"],
  ["Surface", "#FFFEF8", "bg-[#fffef8]"],
  ["Ink", "#16140F", "bg-[#16140f]"],
  ["Muted", "#716F67", "bg-[#716f67]"],
  ["Line", "#D8D7CE", "bg-[#d8d7ce]"],
  ["Action", "#FF5A1F", "bg-[#ff5a1f]"],
] as const

const navigationIcons = [Home, Inbox, Workflow, ShoppingBag, BarChart3]

function Logo() {
  return (
    <a href="#top" aria-label="UsionFlow theme plate" className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center bg-[#ff5a1f] font-[family-name:var(--font-yc-serif)] text-2xl font-light leading-none text-white">
        U
      </span>
      <span className="hidden text-sm font-normal tracking-[0.01em] sm:block">UsionFlow</span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="grid gap-8 border-t border-black/25 pt-8 lg:grid-cols-[230px_1fr] lg:gap-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em]">{eyebrow}</p>
      <div>
        <h2 className="max-w-[850px] font-[family-name:var(--font-yc-serif)] text-4xl font-light leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-[64px]">
          {title}
        </h2>
        {body && <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#56534c] sm:text-lg">{body}</p>}
      </div>
    </div>
  )
}

function SpecLabel({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#716f67]">{children}</p>
}

function StatusPill({ tone, children }: { tone: "ready" | "review" | "failed" | "draft"; children: ReactNode }) {
  const tones = {
    ready: "border-[#276749]/25 bg-[#276749]/10 text-[#276749]",
    review: "border-[#a45b16]/25 bg-[#a45b16]/10 text-[#8a4b12]",
    failed: "border-[#c43d32]/25 bg-[#c43d32]/10 text-[#a83229]",
    draft: "border-black/15 bg-black/[0.04] text-[#56534c]",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-normal ${tones[tone]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

type PlateCopy = (typeof plateCopy)[PlateLocale]
type ComponentCopy = PlateCopy["components"]

const fieldFocusClass = "transition-[border-color,box-shadow] duration-150 focus:border-[#ff5a1f] focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(255,90,31,0.11)]"

const calendarClassNames = {
  months: "flex flex-col gap-4",
  month: "space-y-3",
  caption: "relative mb-3 flex items-center justify-center pt-1",
  caption_label: "text-xs font-medium text-[#16140f]",
  nav: "flex items-center gap-1",
  nav_button: "flex size-8 items-center justify-center rounded-full border border-black/15 bg-transparent text-[#16140f] transition hover:bg-black hover:text-white",
  nav_button_previous: "absolute left-0",
  nav_button_next: "absolute right-0",
  table: "w-full border-collapse",
  head_row: "flex justify-between",
  head_cell: "w-9 text-center text-[9px] font-medium uppercase text-[#716f67]",
  row: "mt-1 flex w-full justify-between",
  cell: "relative size-9 p-0 text-center text-xs focus-within:z-20",
  day: "size-9 rounded-[4px] p-0 text-xs font-normal text-[#16140f] transition hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/35",
  day_range_end: "day-range-end",
  day_selected: "bg-[#16140f] text-white hover:bg-[#16140f] hover:text-white",
  day_today: "ring-1 ring-inset ring-[#ff5a1f] text-[#c74317]",
  day_outside: "text-black/25 opacity-60 aria-selected:bg-black/[0.04] aria-selected:text-black/35",
  day_disabled: "text-black/20 line-through",
  day_range_middle: "aria-selected:!rounded-none aria-selected:!bg-[#ebeae2] aria-selected:!text-[#16140f]",
  day_hidden: "invisible",
}

function DateRangeControl({
  locale,
  label,
  presets,
  clear,
  apply,
  compact = false,
}: {
  locale: PlateLocale
  label: string
  presets: readonly string[]
  clear: string
  apply: string
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 8, 1),
    to: new Date(2026, 8, 30),
  })
  const dateLocale = locale === "mn" ? mn : enUS
  const rangeLabel = range?.from
    ? range.to
      ? `${format(range.from, "MMM d", { locale: dateLocale })} – ${format(range.to, "MMM d", { locale: dateLocale })}`
      : format(range.from, "MMM d", { locale: dateLocale })
    : label
  const presetRanges: DateRange[] = [
    { from: new Date(2026, 8, 30), to: new Date(2026, 8, 30) },
    { from: new Date(2026, 8, 24), to: new Date(2026, 8, 30) },
    { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) },
    { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`inline-flex items-center justify-between gap-3 border border-black/20 bg-white text-left font-normal transition hover:border-black ${compact ? "h-9 rounded-full px-3 text-[10px]" : "h-11 w-full rounded-[4px] px-3 text-sm"}`}
          aria-label={label}
        >
          <span className="inline-flex items-center gap-2"><CalendarDays className="size-3.5 text-[#716f67]" />{rangeLabel}</span>
          <ChevronDown className="size-3 text-[#716f67]" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[310px] rounded-[10px] border-black/20 bg-[#fffef8] p-0 text-[#16140f] shadow-[0_20px_60px_rgba(22,20,15,0.2)]">
        <div className="grid grid-cols-4 border-b border-black/15 p-2">
          {presets.map((preset, index) => (
            <button key={preset} onClick={() => setRange(presetRanges[index])} className="rounded-[4px] px-2 py-2 text-[9px] font-medium hover:bg-black/[0.05]">
              {preset}
            </button>
          ))}
        </div>
        <Calendar
          mode="range"
          defaultMonth={new Date(2026, 8, 1)}
          selected={range}
          onSelect={setRange}
          locale={dateLocale}
          numberOfMonths={1}
          style={{}}
          className="rounded-none border-0 bg-[#fffef8] p-4 shadow-none backdrop-blur-none"
          classNames={calendarClassNames}
        />
        <div className="flex items-center justify-between border-t border-black/15 p-3">
          <button onClick={() => setRange(undefined)} className="px-2 py-2 text-[10px] font-medium text-[#716f67] hover:text-black">{clear}</button>
          <button onClick={() => setOpen(false)} className="rounded-full bg-black px-4 py-2 text-[10px] font-medium text-white">{apply}</button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function FormidableSelect({ label, options, compact = false }: { label: string; options: readonly string[]; compact?: boolean }) {
  return (
    <Select defaultValue={options[0]}>
      <SelectTrigger aria-label={label} className={`${compact ? "h-9 w-[142px] rounded-full text-[10px]" : "h-11 w-full rounded-[4px] text-sm"} border-black/20 bg-white px-3 text-[#16140f] focus-visible:border-[#ff5a1f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_rgba(255,90,31,0.11)]`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-[8px] border-black/20 bg-[#fffef8] p-1 text-[#16140f] shadow-[0_18px_50px_rgba(22,20,15,0.18)] dark:border-black/20 dark:bg-[#fffef8] dark:text-[#16140f]">
        {options.map((option) => (
          <SelectItem key={option} value={option} className="rounded-[4px] py-2.5 pl-3 pr-8 text-xs text-[#16140f] focus:bg-[#16140f] focus:text-white dark:text-[#16140f] dark:focus:bg-[#16140f] dark:focus:text-white">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SettingsToggle({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="flex w-full items-center justify-between gap-4 py-3 text-left transition hover:bg-black/[0.025]"
    >
      <span className="text-[10px] font-medium">{label}</span>
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-[#16140f]" : "bg-black/15"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </span>
    </button>
  )
}

function MoreActionsMenu({ label, items, compact = false }: { label: string; items: readonly string[]; compact?: boolean }) {
  const icons = [Copy, Download, Archive, Trash2]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`${compact ? "flex size-8 items-center justify-center rounded-full" : "flex h-11 w-full items-center justify-between rounded-[4px] px-3 text-sm"} border border-black/20 bg-white hover:border-black`} aria-label={label}>
          {!compact && <span>{label}</span>}
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 rounded-[8px] border-black/20 bg-[#fffef8] p-1.5 text-[#16140f] shadow-[0_18px_50px_rgba(22,20,15,0.18)]">
        {items.map((item, index) => {
          const Icon = icons[index]
          return (
            <div key={item}>
              {index === items.length - 1 && <DropdownMenuSeparator className="my-1 bg-black/15" />}
              <DropdownMenuItem className={`rounded-[4px] px-2.5 py-2 text-xs focus:bg-black/[0.06] focus:text-[#16140f] ${index === items.length - 1 ? "text-[#a83229]" : ""}`}>
                <Icon className="size-3.5" />{item}
              </DropdownMenuItem>
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CreateFlowDialog({ copy, compact = false }: { copy: ComponentCopy; compact?: boolean }) {
  const modal = copy.createModal
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a1f] font-medium text-white transition hover:bg-[#df4816] ${compact ? "h-9 px-4 text-[10px]" : "px-5 py-3 text-xs"}`}>
          <Plus className="size-3.5" />{copy.openCreate}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[620px] overflow-y-auto rounded-[12px] border-black/20 bg-[#fffef8] p-0 text-[#16140f] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
        <DialogHeader className="border-b border-black/15 px-6 py-6 pr-14 text-left sm:px-8">
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#ff5a1f]">{modal.eyebrow}</p>
          <DialogTitle className="mt-3 font-[family-name:var(--font-yc-serif)] text-4xl font-light tracking-[-0.02em]">{modal.title}</DialogTitle>
          <DialogDescription className="mt-2 max-w-md text-xs leading-relaxed text-[#716f67]">{modal.body}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <label className="block sm:col-span-2"><span className="text-[11px] font-medium">{modal.name}</span><input defaultValue={modal.nameValue} className={`mt-2 h-11 w-full rounded-[4px] border border-black/25 bg-white px-3 text-sm ${fieldFocusClass}`} /></label>
          <label className="block"><span className="text-[11px] font-medium">{modal.template}</span><span className="mt-2 block"><FormidableSelect label={modal.template} options={modal.templates} /></span></label>
          <label className="block"><span className="text-[11px] font-medium">{modal.channel}</span><span className="mt-2 block"><FormidableSelect label={modal.channel} options={copy.channels.slice(1)} /></span></label>
          <label className="block sm:col-span-2"><span className="text-[11px] font-medium">{modal.description}</span><textarea defaultValue={modal.descriptionValue} className={`mt-2 min-h-24 w-full resize-none rounded-[4px] border border-black/25 bg-white px-3 py-3 text-sm leading-relaxed ${fieldFocusClass}`} /></label>
        </div>
        <DialogFooter className="flex-row justify-end gap-2 border-t border-black/15 px-6 py-4 sm:px-8">
          <DialogClose asChild><button className="rounded-full px-4 py-2.5 text-xs font-medium hover:bg-black/[0.05]">{modal.cancel}</button></DialogClose>
          <DialogClose asChild><button className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white">{modal.create}</button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function FlowDetailsSheet({ copy, iconOnly = false }: { copy: ComponentCopy; iconOnly?: boolean }) {
  const modal = copy.detailsModal
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={iconOnly ? "flex size-8 items-center justify-center rounded-full border border-black/15 hover:bg-black hover:text-white" : "inline-flex items-center gap-2 rounded-full border border-black/25 px-5 py-3 text-xs font-medium hover:bg-black hover:text-white"} aria-label={copy.openDetails}>
          <Eye className="size-3.5" />{!iconOnly && copy.openDetails}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full border-l border-black/20 bg-[#fffef8] p-0 text-[#16140f] shadow-[0_0_80px_rgba(0,0,0,0.22)] sm:max-w-[440px]">
        <SheetHeader className="border-b border-black/15 px-6 py-8 pr-14 text-left">
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#ff5a1f]">{modal.eyebrow}</p>
          <SheetTitle className="mt-4 font-[family-name:var(--font-yc-serif)] text-4xl font-light text-[#16140f]">{modal.title}</SheetTitle>
          <SheetDescription className="mt-3 text-xs leading-relaxed text-[#716f67]">{modal.body}</SheetDescription>
        </SheetHeader>
        <dl className="divide-y divide-black/15 px-6">
          {modal.labels.map((label, index) => <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-5 text-xs"><dt className="text-[#716f67]">{label}</dt><dd className="font-medium">{modal.values[index]}</dd></div>)}
        </dl>
        <div className="absolute inset-x-0 bottom-0 border-t border-black/15 bg-[#fffef8] p-5"><button className="w-full rounded-full bg-black px-5 py-3 text-xs font-medium text-white">{modal.action}</button></div>
      </SheetContent>
    </Sheet>
  )
}

function DeleteFlowDialog({ copy }: { copy: ComponentCopy }) {
  const modal = copy.deleteModal
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild><button className="inline-flex items-center gap-2 rounded-full border border-[#c43d32]/30 px-5 py-3 text-xs font-medium text-[#a83229] hover:bg-[#c43d32]/[0.07]"><Trash2 className="size-3.5" />{copy.openDelete}</button></AlertDialogTrigger>
      <AlertDialogContent className="max-w-[480px] rounded-[12px] border-black/20 bg-[#fffef8] p-7 text-[#16140f] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
        <AlertDialogHeader className="text-left">
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#a83229]">{modal.eyebrow}</p>
          <AlertDialogTitle className="mt-3 font-[family-name:var(--font-yc-serif)] text-3xl font-light">{modal.title}</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-xs leading-relaxed text-[#716f67]">{modal.body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5 flex-row justify-end gap-2">
          <AlertDialogCancel className="mt-0 rounded-full border-black/20 bg-transparent px-4 text-xs text-[#16140f] hover:bg-black/[0.05] hover:text-[#16140f]">{modal.cancel}</AlertDialogCancel>
          <AlertDialogAction className="rounded-full bg-[#a83229] px-5 text-xs text-white hover:bg-[#8f2923]">{modal.confirm}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function AppSidebar({
  labels,
  activeIndex,
  subMenu,
}: {
  labels: readonly string[]
  activeIndex: number
  subMenu?: { items: readonly string[]; activeIndex: number; onSelect: (index: number) => void }
}) {
  return (
    <aside className="hidden w-[174px] shrink-0 border-r border-black/15 bg-[#efefe7] p-3 lg:block">
      <div className="mb-6 flex items-center gap-2 px-2 py-1.5">
        <span className="flex size-7 items-center justify-center bg-[#ff5a1f] font-[family-name:var(--font-yc-serif)] text-lg text-white">U</span>
        <span className="text-xs font-medium">UsionFlow</span>
      </div>
      <nav className="space-y-1">
        {labels.map((label, index) => {
          const Icon = navigationIcons[index]
          const active = index === activeIndex
          return (
            <div key={label}>
              <div className={`flex items-center gap-2.5 rounded-[4px] px-2.5 py-2 text-xs ${active ? "bg-[#16140f] text-white" : "text-[#56534c]"}`}>
                <Icon className="size-3.5" strokeWidth={1.7} />
                <span>{label}</span>
              </div>
              {active && subMenu && (
                <div className="ml-[17px] mt-1 py-1 pl-2">
                  {subMenu.items.map((item, subIndex) => (
                    <button
                      key={item}
                      onClick={() => subMenu.onSelect(subIndex)}
                      className={`flex w-full items-center gap-2 rounded-[3px] px-2 py-2 text-left text-[9px] transition ${subMenu.activeIndex === subIndex ? "font-medium text-[#16140f]" : "text-[#716f67] hover:text-black"}`}
                    >
                      <span className={`size-1.5 rounded-full ${subMenu.activeIndex === subIndex ? "bg-[#ff5a1f]" : "bg-black/15"}`} />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      <div className="mt-7 border-t border-black/15 pt-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#d8d7ce] text-[10px] font-medium">UF</div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium">Usion Studio</p>
            <p className="text-[9px] text-[#716f67]">Pro workspace</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function InboxPreview({ copy }: { copy: (typeof plateCopy)[PlateLocale] }) {
  return (
    <div className="flex min-h-[520px] flex-1 flex-col bg-[#fffef8]">
      <div className="flex h-14 items-center justify-between border-b border-black/15 px-4 sm:px-5">
        <div>
          <p className="text-sm font-medium">{copy.workspaces.inbox.title}</p>
          <p className="text-[10px] text-[#716f67]">{copy.workspaces.inbox.count}</p>
        </div>
        <button className="flex size-8 items-center justify-center rounded-full border border-black/20" aria-label={copy.workspaces.search}>
          <Search className="size-3.5" />
        </button>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_190px]">
        <div className="border-r border-black/15 p-2.5">
          {copy.workspaces.inbox.conversations.map((conversation, index) => (
            <div key={conversation[0]} className={`mb-1 flex gap-2.5 rounded-[5px] p-2.5 ${index === 0 ? "bg-[#ebeae2]" : "hover:bg-black/[0.035]"}`}>
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${index === 0 ? "bg-[#ff5a1f] text-white" : "bg-[#d8d7ce]"}`}>
                {conversation[0].slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <p className="truncate text-xs font-medium">{conversation[0]}</p>
                  <span className="text-[9px] text-[#716f67]">{conversation[2]}</span>
                </div>
                <p className="mt-1 truncate text-[10px] text-[#716f67]">{conversation[1]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-black/15 px-4 py-3">
            <div>
              <p className="text-xs font-medium">{copy.workspaces.inbox.customer}</p>
              <p className="text-[9px] text-[#716f67]">{copy.workspaces.inbox.source}</p>
            </div>
            <MoreHorizontal className="size-4 text-[#716f67]" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3 p-4 sm:p-6">
            <div className="max-w-[76%] rounded-[10px] rounded-bl-[2px] bg-[#ebeae2] px-3.5 py-3 text-xs leading-relaxed">
              {copy.workspaces.inbox.incoming}
            </div>
            <div className="ml-auto max-w-[82%] rounded-[10px] rounded-br-[2px] bg-[#16140f] px-3.5 py-3 text-xs leading-relaxed text-white">
              {copy.workspaces.inbox.reply}
            </div>
          </div>
          <div className="m-3 flex items-center gap-2 rounded-[6px] border border-black/25 bg-white px-3 py-2.5 focus-within:border-black">
            <Paperclip className="size-3.5 text-[#716f67]" />
            <span className="flex-1 text-[11px] text-[#8a877f]">{copy.workspaces.inbox.placeholder}</span>
            <button className="flex size-7 items-center justify-center rounded-full bg-[#ff5a1f] text-white" aria-label="Send">
              <Send className="size-3" />
            </button>
          </div>
        </div>
        <div className="hidden border-l border-black/15 p-4 xl:block">
          <SpecLabel>{copy.workspaces.inbox.details}</SpecLabel>
          <dl className="space-y-5 text-[11px]">
            <div>
              <dt className="text-[#716f67]">{copy.workspaces.inbox.assigned}</dt>
              <dd className="mt-1.5 flex items-center gap-2 font-medium"><Bot className="size-3.5" />{copy.workspaces.inbox.owner}</dd>
            </div>
            <div>
              <dt className="text-[#716f67]">{copy.workspaces.inbox.category}</dt>
              <dd className="mt-1.5"><StatusPill tone="draft">{copy.workspaces.inbox.categoryValue}</StatusPill></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

type BuilderNode = PlateCopy["workspaces"]["builder"]["nodes"][number]

function DetailedFlowNode({
  node,
  index,
  selected,
  onSelect,
  className,
}: {
  node: BuilderNode
  index: number
  selected: boolean
  onSelect: () => void
  className: string
}) {
  const icons = [Instagram, Sparkles, GitBranch, Send, UserRound]
  const Icon = icons[index]
  return (
    <button
      onClick={onSelect}
      className={`absolute w-[180px] rounded-[8px] border bg-[#fffef8] p-3.5 text-left shadow-[0_8px_24px_rgba(22,20,15,0.06)] transition ${selected ? "z-20 border-[#ff5a1f] shadow-[0_0_0_3px_rgba(255,90,31,0.10)]" : "z-10 border-black/20 hover:border-black/40"} ${className}`}
    >
      <span className="absolute -left-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-black/35 bg-[#f0f0e9]" />
      <span className="absolute -right-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-black/35 bg-[#f0f0e9]" />
      <span className="flex items-start justify-between gap-2">
        <span className={`flex size-7 items-center justify-center rounded-[4px] ${index === 1 ? "bg-[#ff5a1f] text-white" : "bg-[#ecebe3] text-[#16140f]"}`}><Icon className="size-3.5" /></span>
        <span className="rounded-full border border-black/15 px-2 py-1 text-[7px] font-medium uppercase tracking-[0.13em] text-[#716f67]">{node.kind}</span>
      </span>
      <span className="mt-3 block text-[11px] font-medium">{node.title}</span>
      <span className="mt-1.5 block min-h-8 text-[8px] leading-relaxed text-[#716f67]">{node.body}</span>
      <span className="mt-3 block border-t border-black/10 pt-2">
        {node.details.map((detail) => <span key={detail[0]} className="mt-1 flex justify-between gap-2 text-[7px]"><span className="text-[#8a877f]">{detail[0]}</span><span className="max-w-[98px] truncate font-medium">{detail[1]}</span></span>)}
      </span>
      <span className="mt-2 flex items-center justify-end gap-1 font-mono text-[7px] text-[#716f67]"><span className="size-1.5 rounded-full bg-[#276749]" />{node.output}</span>
    </button>
  )
}

function BuilderPreview({ copy }: { copy: PlateCopy }) {
  const builder = copy.workspaces.builder
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(1)
  const [nodeSearch, setNodeSearch] = useState("")
  const [zoom, setZoom] = useState(100)
  const [testOpen, setTestOpen] = useState(false)
  const [published, setPublished] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const selectedNode = builder.nodes[selectedNodeIndex]
  const libraryIcons = [[Instagram, MessageSquare], [Sparkles, GitBranch], [Send, UserRound, ShoppingBag]]

  return (
    <div className="flex min-h-[680px] min-w-0 flex-1 flex-col bg-[#f0f0e9]">
      <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-black/15 bg-[#fffef8] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2"><p className="text-sm font-medium">{builder.title}</p><span className="rounded-full border border-[#276749]/25 bg-[#276749]/10 px-2 py-0.5 text-[8px] font-medium text-[#276749]">{builder.live}</span></div>
            <p className="mt-1 flex items-center gap-1 text-[8px] text-[#276749]"><Check className="size-2.5" />{builder.saved} · 13:14</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="flex size-8 items-center justify-center rounded-full text-[#716f67] hover:bg-black/[0.05] hover:text-black" aria-label={builder.undo}><Undo2 className="size-3.5" /></button>
          <button className="flex size-8 items-center justify-center rounded-full text-black/25" aria-label={builder.redo} disabled><Redo2 className="size-3.5" /></button>
          <span className="mx-1 hidden h-5 w-px bg-black/15 sm:block" />
          <button className="hidden h-9 items-center gap-1.5 rounded-full border border-[#ff5a1f]/30 px-3 text-[9px] font-medium text-[#c74317] hover:bg-[#ff5a1f]/[0.06] sm:inline-flex"><Sparkles className="size-3" />{builder.aiAssistant}</button>
          <button className="hidden h-9 rounded-full border border-black/20 px-3 text-[9px] font-medium hover:border-black md:block">{builder.preview}</button>
          <button onClick={() => setTestOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/20 px-3 text-[9px] font-medium hover:border-black"><Play className="size-3" />{builder.test}</button>
          <button onClick={() => setPublished(true)} className={`h-9 rounded-full px-4 text-[9px] font-medium text-white ${published ? "bg-[#276749]" : "bg-black"}`}>{published ? builder.published : builder.publish}</button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 md:grid-cols-[176px_minmax(0,1fr)] xl:grid-cols-[176px_minmax(0,1fr)_224px]">
        <aside className="hidden border-r border-black/15 bg-[#fffef8] md:block">
          <div className="border-b border-black/15 p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.15em]">{builder.libraryTitle}</p>
            <label className="relative mt-3 block"><Search className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-[#716f67]" /><input value={nodeSearch} onChange={(event) => setNodeSearch(event.target.value)} placeholder={builder.librarySearch} className={`h-8 w-full rounded-[4px] border border-black/15 bg-white pl-7 pr-2 text-[9px] placeholder:text-[#8a877f] ${fieldFocusClass}`} /></label>
          </div>
          <div className="space-y-5 p-2.5">
            {builder.libraryGroups.map((group, groupIndex) => {
              const visibleItems = group[1].map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => item.toLowerCase().includes(nodeSearch.toLowerCase()))
              if (visibleItems.length === 0) return null
              return <div key={group[0]}><p className="px-1.5 text-[7px] font-medium uppercase tracking-[0.15em] text-[#8a877f]">{group[0]}</p><div className="mt-1.5 space-y-1">{visibleItems.map(({ item, itemIndex }) => { const Icon = libraryIcons[groupIndex][itemIndex]; return <button key={item} className="flex w-full items-center gap-2 rounded-[4px] border border-transparent px-1.5 py-2 text-left text-[9px] hover:border-black/15 hover:bg-[#f5f5ee]"><span className="flex size-6 items-center justify-center rounded-[4px] bg-[#ecebe3]"><Icon className="size-3" /></span><span className="min-w-0 flex-1 truncate">{item}</span><Plus className="size-2.5 text-[#8a877f]" /></button>})}</div></div>
            })}
          </div>
        </aside>

        <div className="relative min-w-0 overflow-auto bg-[#f0f0e9]">
          <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(#aaa89f_0.75px,transparent_0.75px)] [background-size:18px_18px]" />
          <div className="relative h-[600px] min-w-[850px]">
            <div className="absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full border border-black/15 bg-[#fffef8]/95 px-3 py-2 text-[8px] shadow-sm"><Workflow className="size-3" /><span>{builder.canvasLabel}</span></div>
            <div className="absolute inset-0 origin-center transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
              <svg aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
                <path d="M210 290 H235" fill="none" stroke="#9b998f" strokeWidth="1.2" />
                <path d="M415 290 H440" fill="none" stroke="#9b998f" strokeWidth="1.2" />
                <path d="M620 250 C645 250 645 155 670 155" fill="none" stroke="#9b998f" strokeWidth="1.2" />
                <path d="M620 330 C645 330 645 425 670 425" fill="none" stroke="#9b998f" strokeWidth="1.2" strokeDasharray="4 4" />
              </svg>
              <span className="absolute left-[630px] top-[196px] rounded-full bg-[#276749] px-2 py-0.5 text-[6px] font-medium text-white">{builder.branches[0]}</span>
              <span className="absolute left-[627px] top-[365px] rounded-full border border-black/20 bg-[#fffef8] px-2 py-0.5 text-[6px] font-medium">{builder.branches[1]}</span>
              <DetailedFlowNode node={builder.nodes[0]} index={0} selected={selectedNodeIndex === 0} onSelect={() => setSelectedNodeIndex(0)} className="left-[30px] top-[205px]" />
              <DetailedFlowNode node={builder.nodes[1]} index={1} selected={selectedNodeIndex === 1} onSelect={() => setSelectedNodeIndex(1)} className="left-[235px] top-[205px]" />
              <DetailedFlowNode node={builder.nodes[2]} index={2} selected={selectedNodeIndex === 2} onSelect={() => setSelectedNodeIndex(2)} className="left-[440px] top-[205px]" />
              <DetailedFlowNode node={builder.nodes[3]} index={3} selected={selectedNodeIndex === 3} onSelect={() => setSelectedNodeIndex(3)} className="left-[670px] top-[70px]" />
              <DetailedFlowNode node={builder.nodes[4]} index={4} selected={selectedNodeIndex === 4} onSelect={() => setSelectedNodeIndex(4)} className="left-[670px] top-[340px]" />
            </div>

            <div className="absolute bottom-3 left-3 z-30 hidden w-28 rounded-[5px] border border-black/15 bg-[#fffef8]/95 p-2 shadow-sm lg:block" aria-label={builder.minimap}>
              <p className="text-[6px] font-medium uppercase tracking-[0.14em] text-[#716f67]">{builder.minimap}</p>
              <div className="relative mt-2 h-12 bg-[#f0f0e9] [background-image:radial-gradient(#aaa89f_0.5px,transparent_0.5px)] [background-size:6px_6px]"><span className="absolute left-2 top-5 h-2 w-5 bg-black/40" /><span className="absolute left-9 top-5 h-2 w-5 bg-[#ff5a1f]" /><span className="absolute left-16 top-5 h-2 w-5 bg-black/40" /><span className="absolute right-1 top-1 h-2 w-4 bg-black/30" /><span className="absolute right-1 bottom-1 h-2 w-4 bg-black/30" /></div>
            </div>
            <div className="absolute bottom-3 right-3 z-30 flex items-center rounded-full border border-black/15 bg-[#fffef8]/95 p-1 shadow-sm">
              <button onClick={() => setZoom((value) => Math.max(75, value - 25))} className="flex size-7 items-center justify-center rounded-full hover:bg-black/[0.05]" aria-label="Zoom out"><ZoomOut className="size-3" /></button>
              <span className="w-10 text-center font-mono text-[7px]">{zoom}%</span>
              <button onClick={() => setZoom((value) => Math.min(125, value + 25))} className="flex size-7 items-center justify-center rounded-full hover:bg-black/[0.05]" aria-label="Zoom in"><ZoomIn className="size-3" /></button>
              <span className="mx-1 h-4 w-px bg-black/15" />
              <button onClick={() => setZoom(100)} className="flex size-7 items-center justify-center rounded-full hover:bg-black/[0.05]" aria-label="Fit view"><Maximize2 className="size-3" /></button>
            </div>

            {testOpen && <div className="absolute bottom-14 right-3 z-40 w-[300px] rounded-[10px] border border-black/20 bg-[#fffef8] p-4 shadow-[0_20px_60px_rgba(22,20,15,0.2)]"><div className="flex items-start justify-between"><div><p className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#276749]">{builder.testPanelTitle}</p><p className="mt-1 text-[10px] font-medium">{builder.testPanelBody}</p></div><button onClick={() => setTestOpen(false)} className="p-1 text-[#716f67]" aria-label={builder.close}><X className="size-3.5" /></button></div><div className="mt-3 space-y-2 border-t border-black/10 pt-3">{builder.testSteps.map((step, index) => <div key={step} className="flex items-center gap-2 text-[8px]"><span className="flex size-4 items-center justify-center rounded-full bg-[#276749]/10 text-[#276749]"><Check className="size-2.5" /></span><span className="flex-1">{step}</span><span className="font-mono text-[#8a877f]">{index === 0 ? "0.0s" : `${(index * 0.6).toFixed(1)}s`}</span></div>)}</div></div>}
          </div>
        </div>

        <aside className="hidden border-l border-black/15 bg-[#fffef8] xl:flex xl:flex-col">
          <div className="border-b border-black/15 p-4">
            <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#ff5a1f]">{builder.inspectorEyebrow}</p>
            <h4 className="mt-2 text-xs font-medium">{builder.inspectorTitle}</h4>
            <p className="mt-1.5 text-[8px] leading-relaxed text-[#716f67]">{builder.inspectorBody}</p>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <label className="block"><span className="text-[8px] font-medium">{builder.nodeName}</span><input key={selectedNode.title} defaultValue={selectedNode.title} className={`mt-1.5 h-9 w-full rounded-[4px] border border-black/20 bg-white px-2.5 text-[10px] ${fieldFocusClass}`} /></label>
            <label className="block"><span className="text-[8px] font-medium">{selectedNode.kind}</span><textarea key={selectedNode.body} defaultValue={selectedNode.body} className={`mt-1.5 min-h-20 w-full resize-none rounded-[4px] border border-black/20 bg-white px-2.5 py-2 text-[9px] leading-relaxed ${fieldFocusClass}`} /></label>
            <div className="overflow-hidden rounded-[5px] border border-black/15">{selectedNode.details.map((detail) => <div key={detail[0]} className="grid grid-cols-[68px_1fr] border-b border-black/10 p-2.5 text-[8px] last:border-b-0"><span className="text-[#716f67]">{detail[0]}</span><span className="truncate font-medium">{detail[1]}</span></div>)}</div>
            <div className="rounded-[5px] border border-[#276749]/20 bg-[#276749]/[0.05] p-3"><p className="text-[7px] uppercase tracking-[0.13em] text-[#276749]">Output connected</p><p className="mt-1.5 flex items-center gap-1.5 text-[9px] font-medium"><span className="size-1.5 rounded-full bg-[#276749]" />{selectedNode.output}</p></div>
            <button onClick={() => setAdvancedOpen((value) => !value)} className="flex w-full items-center justify-between border-y border-black/10 py-3 text-[9px] font-medium">{builder.advanced}<ChevronDown className={`size-3 transition ${advancedOpen ? "rotate-180" : ""}`} /></button>
            {advancedOpen && <div className="rounded-[5px] bg-[#f5f5ee] p-3 font-mono text-[7px] leading-relaxed text-[#716f67]">retry: 2<br />timeout: 30s<br />continue_on_error: false</div>}
          </div>
          <div className="border-t border-black/15 p-3"><button className="w-full rounded-full bg-black px-4 py-2.5 text-[9px] font-medium text-white">{builder.saveNode}</button></div>
        </aside>
      </div>
    </div>
  )
}

function AnalyticsPreview({ copy, locale }: { copy: PlateCopy; locale: PlateLocale }) {
  const analytics = copy.workspaces.analytics
  const bars = [42, 58, 51, 70, 63, 78, 72, 88, 68, 81, 92, 84]
  return (
    <div className="min-h-[520px] flex-1 bg-[#fffef8] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-medium">{analytics.title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <FormidableSelect label={copy.components.channelFilter} options={copy.components.channels} compact />
          <DateRangeControl locale={locale} label={analytics.period} presets={copy.components.datePresets} clear={copy.components.clear} apply={copy.components.apply} compact />
          <button className="inline-flex h-9 items-center gap-2 rounded-full border border-black/20 bg-white px-3 text-[10px] font-medium hover:border-black"><Download className="size-3.5" />{analytics.export}</button>
        </div>
      </div>
      <div className="mt-6 grid gap-px overflow-hidden rounded-[8px] border border-black/15 bg-black/15 sm:grid-cols-3">
        {analytics.metrics.map((metric) => (
          <div key={metric[0]} className="bg-[#fffef8] p-4">
            <p className="text-[10px] text-[#716f67]">{metric[0]}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="font-[family-name:var(--font-yc-serif)] text-3xl font-light">{metric[1]}</p>
              <span className="text-[10px] text-[#276749]">{metric[2]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[8px] border border-black/15 p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em]">{analytics.chart}</p>
          <div className="mt-8 flex h-[170px] items-end gap-2 border-b border-black/20 px-1">
            {bars.map((height, index) => <div key={index} className={`flex-1 rounded-t-[2px] ${index === bars.length - 1 ? "bg-[#ff5a1f]" : "bg-[#16140f]"}`} style={{ height: `${height}%` }} />)}
          </div>
        </div>
        <div className="rounded-[8px] border border-black/15 p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em]">{analytics.sources}</p>
          <div className="mt-5 border-t border-black/20">
            {analytics.table.map((row) => <div key={row[0]} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-black/15 py-3 text-[10px]"><span className="font-medium">{row[0]}</span><span>{row[1]}</span><span className="text-[#716f67]">{row[2]}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function BackOfficePreview({ copy, locale }: { copy: PlateCopy; locale: PlateLocale }) {
  const office = copy.workspaces.backOffice
  const [selectedRows, setSelectedRows] = useState<number[]>([0])
  const [page, setPage] = useState(1)
  const statusTones = ["ready", "ready", "review", "draft"] as const

  const toggleRow = (index: number, checked: boolean) => {
    setSelectedRows((current) => checked ? [...new Set([...current, index])] : current.filter((item) => item !== index))
  }

  return (
    <div className="min-h-[590px] min-w-0 flex-1 bg-[#fffef8] p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#ff5a1f]">{office.eyebrow}</p>
          <h3 className="mt-2 font-[family-name:var(--font-yc-serif)] text-3xl font-light">{office.title}</h3>
          <p className="mt-1 max-w-lg text-[10px] leading-relaxed text-[#716f67]">{office.body}</p>
        </div>
        <CreateFlowDialog copy={copy.components} compact />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-black/15 py-3">
        <label className="relative min-w-[210px] flex-1 sm:max-w-[310px]">
          <span className="sr-only">{office.searchLabel}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#716f67]" />
          <input placeholder={office.search} className={`h-9 w-full rounded-full border border-black/20 bg-white pl-9 pr-12 text-[10px] placeholder:text-[#8a877f] ${fieldFocusClass}`} />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[3px] border border-black/15 bg-[#f5f5ee] px-1.5 py-0.5 font-mono text-[8px] text-[#716f67]">⌘K</kbd>
        </label>
        <FormidableSelect label={office.status} options={office.statuses} compact />
        <DateRangeControl locale={locale} label={office.date} presets={copy.components.datePresets} clear={copy.components.clear} apply={copy.components.apply} compact />
        <button className="inline-flex size-9 items-center justify-center rounded-full border border-black/20 bg-white hover:border-black" aria-label={office.status}><SlidersHorizontal className="size-3.5" /></button>
      </div>

      {selectedRows.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-[#ff5a1f]/30 bg-[#ff5a1f]/[0.06] px-3 py-2.5">
          <div className="flex items-center gap-2 text-[10px] font-medium"><span className="flex size-5 items-center justify-center rounded-full bg-[#ff5a1f] text-white">{selectedRows.length}</span>{office.selected}</div>
          <div className="flex items-center gap-2"><button className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-[#fffef8] px-3 py-1.5 text-[9px] font-medium"><UserRound className="size-3" />{office.bulkEdit}</button><button onClick={() => setSelectedRows([])} className="p-1 text-[#716f67] hover:text-black" aria-label={copy.components.clear}><X className="size-3.5" /></button></div>
        </div>
      )}

      <div className="mt-3 overflow-hidden rounded-[8px] border border-black/15">
        <Table aria-label={office.tableLabel} className="min-w-[850px] text-[10px]">
          <TableHeader className="bg-[#f1f0e9] [&_tr]:border-black/15">
            <TableRow className="border-black/15 hover:bg-transparent">
              <TableHead className="h-10 w-10 px-3"><Checkbox checked={selectedRows.length === office.rows.length} onCheckedChange={(checked) => setSelectedRows(checked === true ? office.rows.map((_, index) => index) : [])} className="border-black/30 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white" aria-label={office.tableLabel} /></TableHead>
              {office.columns.map((column, index) => <TableHead key={`${column}-${index}`} className={`${index === 0 ? "min-w-[180px]" : ""} h-10 px-3 text-[9px] font-medium uppercase tracking-[0.11em] text-[#716f67]`}>{column}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {office.rows.map((row, index) => (
              <TableRow key={row[0]} data-state={selectedRows.includes(index) ? "selected" : undefined} className="border-black/10 data-[state=selected]:bg-[#ff5a1f]/[0.045] hover:bg-black/[0.025]">
                <TableCell className="px-3 py-3"><Checkbox checked={selectedRows.includes(index)} onCheckedChange={(checked) => toggleRow(index, checked === true)} className="border-black/30 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white" aria-label={row[0]} /></TableCell>
                <TableCell className="px-3 py-3"><div className="flex items-center gap-2.5"><span className={`flex size-7 items-center justify-center rounded-[4px] ${index === 0 ? "bg-[#ff5a1f] text-white" : "bg-[#ebeae2]"}`}><Workflow className="size-3.5" /></span><span className="font-medium">{row[0]}</span></div></TableCell>
                <TableCell className="px-3 py-3 text-[#56534c]">{row[1]}</TableCell>
                <TableCell className="px-3 py-3"><StatusPill tone={statusTones[index]}>{row[2]}</StatusPill></TableCell>
                <TableCell className="px-3 py-3 text-[#56534c]">{row[3]}</TableCell>
                <TableCell className="px-3 py-3 font-mono">{row[4]}</TableCell>
                <TableCell className="px-3 py-3 text-[#716f67]">{row[5]}</TableCell>
                <TableCell className="px-3 py-3"><div className="flex items-center justify-end gap-1"><FlowDetailsSheet copy={copy.components} iconOnly /><MoreActionsMenu label={copy.components.moreActions} items={office.rowActions} compact /></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#716f67]">
        <p>{office.showing}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 disabled:opacity-30"><ChevronLeft className="size-3" />{office.previous}</button>
          {[1, 2, 3].map((number) => <button key={number} onClick={() => setPage(number)} className={`flex size-8 items-center justify-center rounded-full ${page === number ? "bg-black text-white" : "hover:bg-black/[0.05]"}`}>{number}</button>)}
          <button onClick={() => setPage((value) => Math.min(3, value + 1))} disabled={page === 3} className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 disabled:opacity-30">{office.next}<ChevronRight className="size-3" /></button>
        </div>
      </div>
    </div>
  )
}

function ShopSettingsPreview({ copy, sectionIndex }: { copy: PlateCopy; sectionIndex: number }) {
  const shop = copy.workspaces.shopSettings
  const [settings, setSettings] = useState([true, true, false, false])
  const [dirty, setDirty] = useState(false)
  const [published, setPublished] = useState(false)
  const [copied, setCopied] = useState(false)
  const markDirty = () => {
    setDirty(true)
    setPublished(false)
  }

  const toggleSetting = (index: number, checked: boolean) => {
    setSettings((current) => current.map((value, itemIndex) => itemIndex === index ? checked : value))
    markDirty()
  }

  return (
    <div className="min-h-[650px] min-w-0 flex-1 bg-[#fffef8]">
      <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-5 sm:px-6">
        <h3 className="font-[family-name:var(--font-yc-serif)] text-3xl font-light">{shop.title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`mr-1 inline-flex items-center gap-1.5 text-[9px] ${dirty ? "text-[#a45b16]" : "text-[#276749]"}`}>
            <span className={`size-1.5 rounded-full ${dirty ? "bg-[#a45b16]" : "bg-[#276749]"}`} />
            {dirty ? shop.publish : shop.saved}
          </span>
          <button className="inline-flex h-9 items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 text-[9px] font-medium transition hover:border-black">
            <ExternalLink className="size-3" />{shop.viewStore}
          </button>
          <button
            onClick={() => { setDirty(false); setPublished(true) }}
            className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[9px] font-medium text-white transition ${published ? "bg-[#276749]" : "bg-black hover:bg-[#ff5a1f]"}`}
          >
            {published && <Check className="size-3" />}{published ? shop.published : shop.publish}
          </button>
        </div>
      </div>

      <div className="min-h-[545px] min-w-0 p-4 sm:p-6">
          {sectionIndex === 0 && (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)]">
              <section className="min-w-0 xl:pr-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2"><span className="text-[9px] font-medium">{shop.storefront.name}</span><input defaultValue={shop.storefront.nameValue} onChange={markDirty} className={`mt-1.5 h-10 w-full rounded-[4px] border border-black/20 bg-white px-3 text-[11px] ${fieldFocusClass}`} /></label>
                  <label className="block sm:col-span-2"><span className="text-[9px] font-medium">{shop.storefront.description}</span><textarea defaultValue={shop.storefront.descriptionValue} onChange={markDirty} className={`mt-1.5 min-h-20 w-full resize-none rounded-[4px] border border-black/20 bg-white px-3 py-2.5 text-[11px] leading-relaxed ${fieldFocusClass}`} /></label>
                  <label className="block sm:col-span-2"><span className="text-[9px] font-medium">{shop.storefront.address}</span><input defaultValue={shop.storefront.addressValue} onChange={markDirty} className={`mt-1.5 h-10 w-full rounded-[4px] border border-black/20 bg-white px-3 text-[11px] ${fieldFocusClass}`} /></label>
                </div>
                <div className="mt-4">
                  <SettingsToggle checked={settings[0]} onCheckedChange={(checked) => toggleSetting(0, checked)} label={shop.storefront.visibility} />
                </div>
                <div className="mt-4">
                  <p className="text-[9px] font-medium">{shop.storefront.accent}</p>
                  <div className="mt-2 flex gap-2">
                    {["#ff5a1f", "#16140f", "#276749", "#5b5bd6", "#e8a21a"].map((color, index) => <button key={color} onClick={markDirty} aria-label={`${shop.storefront.accent} ${index + 1}`} className={`size-7 rounded-full border-2 border-[#fffef8] shadow-[0_0_0_1px_rgba(0,0,0,.18)] ${index === 0 ? "ring-2 ring-black ring-offset-2" : ""}`} style={{ backgroundColor: color }} />)}
                  </div>
                </div>
              </section>

              <aside className="pt-5 xl:pl-1 xl:pt-0">
                <div className="flex items-center justify-between pb-3">
                  <p className="text-[9px] font-medium uppercase tracking-[0.13em]">{shop.storefront.preview}</p>
                  <span className="size-1.5 rounded-full bg-[#276749]" />
                </div>
                <div className="pt-3">
                  <div className="overflow-hidden rounded-[7px] border border-black/15 bg-[#fffef8]">
                    <div className="flex h-10 items-center justify-between px-3"><div className="flex items-center gap-2"><span className="flex size-5 items-center justify-center bg-[#ff5a1f] font-[family-name:var(--font-yc-serif)] text-xs text-white">U</span><span className="text-[8px] font-medium">{shop.storefront.nameValue}</span></div><ShoppingBag className="size-3" /></div>
                    <div className="bg-[#16140f] px-4 py-6 text-white"><p className="font-[family-name:var(--font-yc-serif)] text-xl font-light">Tools for modern teams.</p><p className="mt-2 max-w-[190px] text-[7px] leading-relaxed text-white/60">{shop.storefront.descriptionValue}</p><button className="mt-4 rounded-full bg-[#ff5a1f] px-3 py-1.5 text-[7px] font-medium">Shop collection</button></div>
                    <div className="grid grid-cols-2 gap-2 p-3">{["AI Starter kit", "Commerce flow"].map((product, index) => <div key={product}><div className={`aspect-square rounded-[4px] ${index === 0 ? "bg-[#e9dfd3]" : "bg-[#dce4dc]"}`} /><p className="mt-2 text-[7px] font-medium">{product}</p><p className="mt-0.5 font-mono text-[7px] text-[#716f67]">₮ {index === 0 ? "89,000" : "129,000"}</p></div>)}</div>
                  </div>
                  <p className="mt-3 truncate text-center font-mono text-[7px] text-[#716f67]">https://{shop.storefront.url}</p>
                </div>
              </aside>
            </div>
          )}

          {sectionIndex === 1 && (
            <section className="max-w-3xl">
              <div>
                <p className="text-[9px] font-medium">{shop.domain.generated}</p>
                <div className="mt-1.5 flex overflow-hidden rounded-[4px] border border-black/20 bg-[#f5f5ee]">
                  <span className="min-w-0 flex-1 truncate px-3 py-3 font-mono text-[10px]">https://{shop.storefront.url}</span>
                  <button onClick={() => setCopied(true)} className="inline-flex items-center gap-1.5 border-l border-black/15 bg-white px-3 text-[9px] font-medium"><Copy className="size-3" />{copied ? shop.domain.copied : shop.domain.copy}</button>
                  <button className="flex w-10 items-center justify-center border-l border-black/15 bg-white" aria-label={shop.viewStore}><ExternalLink className="size-3" /></button>
                </div>
              </div>
              <div className="mt-6">
                <label className="text-[9px] font-medium">{shop.domain.custom}</label>
                <div className="mt-1.5 flex gap-2"><input defaultValue={shop.domain.customValue} onChange={markDirty} className={`h-10 min-w-0 flex-1 rounded-[4px] border border-black/20 bg-[#fffef8] px-3 text-[11px] ${fieldFocusClass}`} /><button onClick={markDirty} className="rounded-full bg-black px-4 text-[9px] font-medium text-white">{shop.domain.connect}</button></div>
              </div>
              <div className="mt-5 rounded-[6px] border border-[#a45b16]/25 bg-[#a45b16]/[0.07] p-4">
                <div className="flex items-center gap-2 text-[10px] font-medium text-[#8a4b12]"><span className="size-1.5 rounded-full bg-[#a45b16]" />{shop.domain.pending}</div>
                <p className="mt-2 max-w-2xl font-mono text-[8px] leading-relaxed text-[#8a4b12]/80">{shop.domain.instruction}</p>
              </div>
            </section>
          )}

          {sectionIndex === 2 && (
            <section className="max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-4 py-1">
                <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#16140f] text-white"><CreditCard className="size-4" /></span><div><p className="text-[9px] text-[#716f67]">{shop.payments.qpay}</p><p className="mt-1 text-[11px] font-medium">{shop.payments.merchant}</p></div></div>
                <StatusPill tone="ready">{shop.payments.connected}</StatusPill>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-[9px] font-medium">{shop.payments.mode}</span><span onClick={markDirty} className="mt-1.5 block"><FormidableSelect label={shop.payments.mode} options={shop.payments.modes} /></span></label>
                <label className="block"><span className="text-[9px] font-medium">{shop.payments.account}</span><span onClick={markDirty} className="mt-1.5 block"><FormidableSelect label={shop.payments.account} options={shop.payments.accounts} /></span></label>
                <label className="block"><span className="text-[9px] font-medium">{shop.payments.invoice}</span><input defaultValue={shop.payments.invoiceValue} onChange={markDirty} className={`mt-1.5 h-11 w-full rounded-[4px] border border-black/20 bg-[#fffef8] px-3 text-[11px] ${fieldFocusClass}`} /></label>
              </div>
            </section>
          )}

          {sectionIndex === 3 && (
            <section className="max-w-4xl">
              <div className="grid sm:grid-cols-2 sm:gap-x-6">{shop.orders.options.map((option, index) => <SettingsToggle key={option[0]} checked={settings[index]} onCheckedChange={(checked) => toggleSetting(index, checked)} label={option[0]} />)}</div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <label className="block"><span className="text-[9px] font-medium">{shop.orders.currency}</span><span onClick={markDirty} className="mt-1.5 block"><FormidableSelect label={shop.orders.currency} options={shop.orders.currencies} /></span></label>
                <label className="block"><span className="text-[9px] font-medium">{shop.orders.minimum}</span><input defaultValue={shop.orders.minimumValue} onChange={markDirty} className={`mt-1.5 h-11 w-full rounded-[4px] border border-black/20 bg-[#fffef8] px-3 text-[11px] ${fieldFocusClass}`} /></label>
                <label className="block"><span className="text-[9px] font-medium">{shop.orders.leadTime}</span><span onClick={markDirty} className="mt-1.5 block"><FormidableSelect label={shop.orders.leadTime} options={shop.orders.leadTimes} /></span></label>
              </div>
            </section>
          )}
      </div>
    </div>
  )
}

function ComponentInventory({ copy }: { copy: ComponentCopy }) {
  const inventory = copy.inventory
  const [toastVisible, setToastVisible] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(true)
  const [confidence, setConfidence] = useState(78)
  const [messageLimit, setMessageLimit] = useState(50)
  const [fileName, setFileName] = useState<string>(inventory.fileName)

  return (
    <div className="mt-5 rounded-[10px] border border-black/20 bg-[#fffef8] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SpecLabel>{inventory.title}</SpecLabel>
        <StatusPill tone="ready">{inventory.inUse}</StatusPill>
      </div>

      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2 xl:grid-cols-4">
        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.identity}</p>
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2">
              {inventory.people.map((person, index) => (
                <span key={person} title={person} className={`relative flex size-10 items-center justify-center rounded-full border-2 border-[#fffef8] text-[10px] font-medium ${index === 1 ? "bg-[#ff5a1f] text-white" : index === 2 ? "bg-[#dfe8e2]" : "bg-[#16140f] text-white"}`}>
                  {person.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  {index === 0 && <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#fffef8] bg-[#276749]" aria-label={inventory.online} />}
                </span>
              ))}
            </div>
            <div className="group relative">
              <button aria-describedby="assign-tooltip" className="flex size-10 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/35"><UserRound className="size-4" /></button>
              <span id="assign-tooltip" role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max -translate-x-1/2 rounded-[4px] bg-[#16140f] px-2.5 py-1.5 text-[9px] text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100">{inventory.tooltip}</span>
            </div>
          </div>
          <button onClick={() => setToastVisible(true)} className="mt-5 rounded-full border border-black/20 px-4 py-2.5 text-[10px] font-medium hover:border-black">{inventory.showToast}</button>
        </section>

        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.loading}</p>
          <div className="space-y-3" aria-label={inventory.skeleton}>
            {["w-4/5", "w-2/3"].map((width, index) => <div key={width} className="flex items-center gap-3"><span className="size-9 animate-pulse rounded-full bg-black/10" /><span className="flex-1 space-y-2"><span className={`block h-2.5 animate-pulse rounded-full bg-black/10 ${width}`} /><span className="block h-2 w-2/5 animate-pulse rounded-full bg-black/[0.06]" /></span><span className="font-mono text-[8px] text-[#8a877f]">0{index + 1}</span></div>)}
          </div>
          <div className="mt-5 flex items-center justify-between text-[9px]"><span>{inventory.progress}</span><span className="font-mono">72%</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10"><span className="block h-full w-[72%] rounded-full bg-[#16140f]" /></div>
        </section>

        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.controls}</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="text-[9px] font-medium">{inventory.time}</span><input type="time" defaultValue="10:30" className={`mt-1.5 h-10 w-full rounded-[4px] border border-black/20 bg-white px-2.5 text-xs ${fieldFocusClass}`} /></label>
            <label className="block"><span className="text-[9px] font-medium">{inventory.currency}</span><span className="mt-1.5 flex h-10 items-center rounded-[4px] border border-black/20 bg-white px-2.5 text-xs"><span className="mr-2 text-[#716f67]">₮</span><input defaultValue="50,000" inputMode="numeric" className="min-w-0 flex-1 bg-transparent outline-none" /></span></label>
          </div>
          <label className="mt-4 block"><span className="flex items-center justify-between text-[9px] font-medium"><span>{inventory.confidence}</span><span className="font-mono">{confidence}%</span></span><input type="range" min="0" max="100" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} className="mt-2 h-1.5 w-full cursor-pointer accent-[#16140f]" /></label>
          <div className="mt-4 flex items-center justify-between"><span className="text-[9px] font-medium">{inventory.messages}</span><span className="flex items-center rounded-full border border-black/20 bg-white"><button onClick={() => setMessageLimit((value) => Math.max(0, value - 10))} className="flex size-8 items-center justify-center" aria-label={inventory.decrease}><Minus className="size-3" /></button><span className="w-8 text-center font-mono text-[10px]">{messageLimit}</span><button onClick={() => setMessageLimit((value) => value + 10)} className="flex size-8 items-center justify-center" aria-label={inventory.increase}><Plus className="size-3" /></button></span></div>
        </section>

        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.disclosure}</p>
          <button onClick={() => setAdvancedOpen((open) => !open)} aria-expanded={advancedOpen} className="flex h-11 w-full items-center justify-between rounded-[4px] bg-[#f5f5ee] px-3 text-left text-[10px] font-medium"><span className="flex items-center gap-2"><Layers3 className="size-3.5 text-[#716f67]" />{inventory.advanced}</span><ChevronDown className={`size-3.5 transition-transform ${advancedOpen ? "rotate-180" : ""}`} /></button>
          {advancedOpen && <div className="px-3 pb-2 pt-3 font-mono text-[9px] leading-relaxed text-[#716f67]">{inventory.advancedValue}</div>}
        </section>
      </div>

      <div className="mt-14 grid gap-12 xl:grid-cols-[0.8fr_1.2fr]">
        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.media}</p>
          <div className="grid grid-cols-3 gap-3">
            <label className="cursor-pointer"><span className="text-[9px] font-medium">{inventory.image}</span><span className="mt-1.5 flex aspect-square items-center justify-center rounded-[5px] bg-[#eee5d8] text-[#716f67] transition hover:bg-[#e6dac9]"><ImagePlus className="size-5" /></span><input type="file" accept="image/*" className="sr-only" /></label>
            <div><span className="text-[9px] font-medium">{inventory.multiImage}</span><div className="mt-1.5 grid aspect-square grid-cols-2 gap-1"><span className="rounded-[4px] bg-[#dbe5df]" /><span className="rounded-[4px] bg-[#e9ddd0]" /><label className="col-span-2 flex cursor-pointer items-center justify-center rounded-[4px] border border-dashed border-black/20 text-[8px] text-[#716f67]"><Plus className="mr-1 size-3" />{inventory.addImage}<input type="file" accept="image/*" multiple className="sr-only" /></label></div></div>
            <label className="cursor-pointer"><span className="text-[9px] font-medium">{inventory.file}</span><span className="mt-1.5 flex aspect-square flex-col items-center justify-center rounded-[5px] bg-[#f5f5ee] px-2 text-center"><FileText className="size-5 text-[#716f67]" /><span className="mt-2 max-w-full truncate text-[8px]">{fileName}</span><span className="mt-1 inline-flex items-center gap-1 text-[8px] font-medium text-[#c74317]"><Upload className="size-2.5" />{inventory.chooseFile}</span></span><input type="file" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || inventory.fileName)} /></label>
          </div>
        </section>

        <section>
          <p className="mb-4 text-[11px] font-medium">{inventory.flowFields}</p>
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
            <div>
              <p className="text-[9px] font-medium">{inventory.quickReplies}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{inventory.replies.map((reply) => <button key={reply} className="rounded-full border border-black/20 bg-white px-2.5 py-1.5 text-[8px] hover:border-black">{reply}</button>)}</div>
              <p className="mt-5 text-[9px] font-medium">{inventory.buttonTemplate}</p>
              <div className="mt-2 rounded-[5px] bg-[#f5f5ee] p-3"><p className="text-[9px] leading-relaxed">{inventory.message}</p><button className="mt-3 w-full rounded-full bg-black px-3 py-2 text-[8px] font-medium text-white">{inventory.track}</button></div>
            </div>

            <div>
              <p className="text-[9px] font-medium">{inventory.dictionary}</p>
              <div className="mt-2 space-y-1.5">{inventory.dictionaryRows.map((row) => <div key={row[0]} className="grid grid-cols-2 gap-1.5"><span className="rounded-[4px] bg-[#f5f5ee] px-2.5 py-2 font-mono text-[8px]">{row[0]}</span><span className="rounded-[4px] bg-[#f5f5ee] px-2.5 py-2 font-mono text-[8px] text-[#716f67]">{row[1]}</span></div>)}</div>
              <p className="mt-5 text-[9px] font-medium">{inventory.dynamicOutputs}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{inventory.outputs.map((output) => <span key={output} className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5ee] px-2.5 py-1.5 font-mono text-[8px]"><span className="size-1.5 rounded-full bg-[#ff5a1f]" />{output}</span>)}</div>
            </div>

            <div>
              <p className="text-[9px] font-medium">{inventory.knowledge}</p>
              <div className="mt-2 flex items-center gap-2 rounded-[5px] bg-[#f5f5ee] p-3"><BookOpen className="size-4 text-[#716f67]" /><span className="min-w-0 flex-1 truncate text-[8px]">{inventory.knowledgeValue}</span><Check className="size-3 text-[#276749]" /></div>
              <p className="mt-5 text-[9px] font-medium">{inventory.code}</p>
              <div className="mt-2 flex items-start gap-2 rounded-[5px] bg-[#16140f] p-3 text-[#f5f5ee]"><Code2 className="mt-0.5 size-3.5 text-[#ff5a1f]" /><code className="font-mono text-[8px] leading-relaxed">{inventory.codeValue}</code></div>
            </div>

            <div>
              <p className="text-[9px] font-medium">{inventory.carousel}</p>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">{inventory.products.map((product, index) => <div key={product[0]} className="min-w-[132px] rounded-[5px] bg-[#f5f5ee] p-2"><div className={`aspect-[1.35] rounded-[4px] ${index === 0 ? "bg-[#e9ddd0]" : "bg-[#dbe5df]"}`} /><p className="mt-2 truncate text-[8px] font-medium">{product[0]}</p><p className="mt-1 font-mono text-[7px] text-[#716f67]">{product[1]}</p></div>)}</div>
            </div>
          </div>
        </section>
      </div>

      {toastVisible && <div role="status" className="fixed bottom-5 right-5 z-[80] flex w-[min(340px,calc(100vw-40px))] items-start gap-3 rounded-[8px] border border-black/20 bg-[#fffef8] p-4 shadow-[0_20px_70px_rgba(22,20,15,0.24)]"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#276749] text-white"><Check className="size-3.5" /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium">{inventory.toastTitle}</p><p className="mt-1 text-[10px] text-[#716f67]">{inventory.toastBody}</p></div><button onClick={() => setToastVisible(false)} className="p-1 text-[#716f67] hover:text-black" aria-label="Close"><X className="size-3.5" /></button></div>}
    </div>
  )
}

export function ReferencePage() {
  const [locale, setLocale] = useState<PlateLocale>("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [workspaceIndex, setWorkspaceIndex] = useState(0)
  const [shopSectionIndex, setShopSectionIndex] = useState(0)
  const copy = plateCopy[locale]
  const navTargets = ["foundations", "components", "workspaces", "migration"]

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#f5f5ee] font-[family-name:var(--font-yc-sans)] font-light text-[#16140f] selection:bg-[#ff5a1f] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-black/15 bg-[#f5f5ee]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Theme plate navigation">
            {copy.nav.map((label, index) => <a key={label} href={`#${navTargets[index]}`} className="rounded-[4px] px-3 py-2 text-xs font-normal hover:bg-black/[0.05]">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-[#276749]/25 bg-[#276749]/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[#276749] sm:block">{copy.hero.status}</span>
            <button onClick={() => setLocale((value) => value === "en" ? "mn" : "en")} className="flex size-9 items-center justify-center rounded-full border border-black/25 text-[10px] font-medium hover:bg-black hover:text-white">{copy.language}</button>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="flex size-9 items-center justify-center lg:hidden" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && <nav className="grid border-t border-black/15 px-5 py-4 lg:hidden">{copy.nav.map((label, index) => <a key={label} href={`#${navTargets[index]}`} onClick={() => setMobileMenuOpen(false)} className="border-b border-black/15 py-3 font-[family-name:var(--font-yc-serif)] text-2xl">{label}</a>)}</nav>}
      </header>

      <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] content-between px-5 py-10 sm:px-8 md:py-16 lg:px-10">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.17em]"><span>{copy.hero.kicker}</span><span className="hidden sm:inline">{copy.hero.version}</span></div>
        <div className="grid items-end gap-12 py-16 lg:grid-cols-[1fr_360px] lg:py-24">
          <h1 className="max-w-[920px] font-[family-name:var(--font-yc-serif)] text-[52px] font-light leading-[0.93] tracking-[-0.04em] sm:text-7xl lg:text-[102px]">{copy.hero.lead} <em className="font-normal">{copy.hero.emphasis}</em></h1>
          <div className="border-t border-black/30 pt-5"><p className="text-base leading-relaxed text-[#56534c]">{copy.hero.body}</p><a href="#foundations" className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-xs font-medium text-white">{copy.nav[0]}<ArrowRight className="size-3.5" /></a></div>
        </div>
        <div className="grid gap-px border-y border-black/20 bg-black/20 sm:grid-cols-3">
          {copy.principles.items.map((item, index) => <article key={item[0]} className="bg-[#f5f5ee] px-4 py-5 sm:px-6"><p className="text-[9px] font-medium tracking-[0.14em]">0{index + 1}</p><h2 className="mt-5 font-[family-name:var(--font-yc-serif)] text-2xl font-normal">{item[0]}</h2><p className="mt-3 text-xs leading-relaxed text-[#716f67]">{item[1]}</p></article>)}
        </div>
      </section>

      <section id="foundations" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading eyebrow={copy.foundations.eyebrow} title={copy.foundations.title} body={copy.foundations.body} />
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div><SpecLabel>{copy.foundations.palette}</SpecLabel><div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-black/20 bg-black/20 sm:grid-cols-3">{palette.map(([name, hex, color]) => <div key={name} className="bg-[#fffef8] p-3"><div className={`aspect-[1.35] rounded-[5px] border border-black/10 ${color}`} /><div className="mt-3 flex items-end justify-between gap-2"><p className="text-xs font-medium">{name}</p><p className="font-mono text-[9px] text-[#716f67]">{hex}</p></div></div>)}</div></div>
          <div><SpecLabel>{copy.foundations.typography}</SpecLabel><div className="rounded-[10px] border border-black/20 bg-[#fffef8] p-6 sm:p-8"><div className="border-b border-black/15 pb-7"><p className="font-[family-name:var(--font-yc-serif)] text-5xl font-light leading-none tracking-[-0.03em]">Source Serif <em>4</em></p><p className="mt-3 text-[10px] text-[#716f67]">{copy.foundations.display} · 300 / 400 italic</p></div><div className="border-b border-black/15 py-7"><p className="text-3xl font-light">Outfit 012345</p><p className="mt-3 text-[10px] text-[#716f67]">{copy.foundations.interface} · 300 / 400 / 500</p></div><div className="pt-7"><p className="font-mono text-sm tracking-[0.12em]">FLOW_01 · ACTIVE</p><p className="mt-3 text-[10px] text-[#716f67]">{copy.foundations.mono}</p></div></div></div>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-black/20 bg-black/20 md:grid-cols-3">
          {[copy.foundations.radius, copy.foundations.spacing, copy.foundations.depth].map((rule, index) => <div key={rule} className="bg-[#fffef8] p-6"><span className={`block ${index === 0 ? "h-12 rounded-[10px] border border-black/30" : index === 1 ? "h-12 border-x border-black/30 bg-[repeating-linear-gradient(90deg,transparent,transparent_15px,rgba(0,0,0,.12)_15px,rgba(0,0,0,.12)_16px)]" : "h-12 border border-black/20 bg-[#f5f5ee]"}`} /><p className="mt-5 text-sm leading-relaxed">{rule}</p></div>)}
        </div>
      </section>

      <section id="components" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading eyebrow={copy.components.eyebrow} title={copy.components.title} body={copy.components.body} />
        <div className="mt-20 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[10px] border border-black/20 bg-[#fffef8] p-6 sm:p-8">
            <SpecLabel>{copy.components.actions}</SpecLabel>
            <div className="flex flex-wrap gap-3"><button className="rounded-full bg-black px-5 py-3 text-xs font-medium text-white">{copy.components.primary}</button><button className="rounded-full border border-black/25 px-5 py-3 text-xs font-medium">{copy.components.secondary}</button><button className="inline-flex items-center gap-2 rounded-full bg-[#ff5a1f] px-5 py-3 text-xs font-medium text-white"><Sparkles className="size-3.5" />{copy.components.accent}</button><button className="px-3 py-3 text-xs font-medium underline decoration-black/30 underline-offset-4">{copy.components.quiet}</button><button disabled className="rounded-full bg-black/10 px-5 py-3 text-xs font-medium text-black/35">{copy.components.disabled}</button></div>
            <div className="mt-8 flex flex-wrap items-center gap-3"><button className="flex size-10 items-center justify-center rounded-full border border-black/25" aria-label="Add"><Plus className="size-4" /></button><button className="flex size-10 items-center justify-center rounded-full bg-black text-white" aria-label="Notifications"><Bell className="size-4" /></button><button className="flex size-10 items-center justify-center rounded-[4px] bg-[#ff5a1f] text-white" aria-label="AI"><Bot className="size-4" /></button></div>
            <pre className="mt-8 overflow-x-auto rounded-[5px] bg-[#16140f] p-4 font-mono text-[10px] leading-relaxed text-[#f5f5ee]">rounded-full bg-black px-5 py-3{`\n`}text-xs font-medium text-white</pre>
          </div>
          <div className="rounded-[10px] border border-black/20 bg-[#fffef8] p-6 sm:p-8">
            <SpecLabel>{copy.components.fields}</SpecLabel>
            <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="text-[11px] font-medium">{copy.components.name}</span><input readOnly value={copy.components.nameValue} className={`mt-2 h-11 w-full rounded-[4px] border border-black/25 bg-white px-3 text-sm ${fieldFocusClass}`} /><span className="mt-1.5 block text-[9px] text-[#716f67]">{copy.components.helper}</span></label><label className="block"><span className="text-[11px] font-medium">{copy.components.channel}</span><span className="mt-2 flex h-11 items-center justify-between rounded-[4px] border border-black/25 bg-white px-3 text-sm">{copy.components.channelValue}<ChevronDown className="size-3.5" /></span></label><label className="block sm:col-span-2"><span className="text-[11px] font-medium">{copy.components.prompt}</span><textarea readOnly value={copy.components.promptValue} className={`mt-2 min-h-24 w-full resize-none rounded-[4px] border border-black/25 bg-white px-3 py-3 text-sm leading-relaxed ${fieldFocusClass}`} /></label><label className="block"><span className="text-[11px] font-medium">{copy.components.name}</span><span className="mt-2 flex h-11 items-center rounded-[4px] border border-[#c43d32] bg-white px-3 text-sm text-[#a83229]">—</span><span className="mt-1.5 flex items-center gap-1 text-[9px] text-[#a83229]"><AlertCircle className="size-3" />{copy.components.invalid}</span></label></div>
          </div>
          <div className="rounded-[10px] border border-black/20 bg-[#fffef8] p-6 sm:p-8 xl:col-span-2">
            <SpecLabel>{copy.components.feedback}</SpecLabel>
            <div className="flex flex-wrap gap-2"><StatusPill tone="ready">{copy.components.ready}</StatusPill><StatusPill tone="review">{copy.components.review}</StatusPill><StatusPill tone="failed">{copy.components.failed}</StatusPill><StatusPill tone="draft">{copy.components.draft}</StatusPill></div>
            <div className="mt-6 flex max-w-xl items-start gap-3 rounded-[6px] border border-[#276749]/25 bg-[#276749]/[0.07] p-4"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#276749] text-white"><Check className="size-3.5" /></span><div><p className="text-xs font-medium text-[#276749]">{copy.components.successTitle}</p><p className="mt-1 text-[11px] leading-relaxed text-[#276749]/80">{copy.components.successBody}</p></div></div>
          </div>
          <div className="grid overflow-visible rounded-[10px] border border-black/20 bg-[#fffef8] lg:grid-cols-2 xl:col-span-2">
            <div className="p-6 sm:p-8 lg:border-r lg:border-black/15">
              <SpecLabel>{copy.components.menus}</SpecLabel>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-[11px] font-medium">{copy.components.channelFilter}</span><span className="mt-2 block"><FormidableSelect label={copy.components.channelFilter} options={copy.components.channels} /></span></label>
                <label className="block"><span className="text-[11px] font-medium">{copy.components.dateRange}</span><span className="mt-2 block"><DateRangeControl locale={locale} label={copy.components.dateRange} presets={copy.components.datePresets} clear={copy.components.clear} apply={copy.components.apply} /></span></label>
                <label className="block sm:col-span-2"><span className="text-[11px] font-medium">{copy.components.moreActions}</span><span className="mt-2 block max-w-xs"><MoreActionsMenu label={copy.components.moreActions} items={copy.components.menuItems} /></span></label>
              </div>
            </div>
            <div className="border-t border-black/15 p-6 sm:p-8 lg:border-t-0">
              <SpecLabel>{copy.components.overlays}</SpecLabel>
              <div className="flex flex-wrap gap-3">
                <CreateFlowDialog copy={copy.components} />
                <FlowDetailsSheet copy={copy.components} />
                <DeleteFlowDialog copy={copy.components} />
              </div>
              <div className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-black/15 bg-black/15 sm:grid-cols-3">
                {[copy.components.createModal.title, copy.components.detailsModal.title, copy.components.deleteModal.title].map((title, index) => (
                  <div key={title} className="bg-[#f5f5ee] p-3"><p className="font-mono text-[8px] text-[#ff5a1f]">0{index + 1}</p><p className="mt-4 text-[10px] font-medium leading-snug">{title}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ComponentInventory copy={copy.components} />
      </section>

      <section id="workspaces" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading eyebrow={copy.workspaces.eyebrow} title={copy.workspaces.title} body={copy.workspaces.body} />
        <div className="mt-16 flex flex-wrap gap-2">{copy.workspaces.tabs.map((tab, index) => <button key={tab} onClick={() => setWorkspaceIndex(index)} className={`rounded-full px-4 py-2 text-xs font-medium ${workspaceIndex === index ? "bg-black text-white" : "border border-black/20"}`}>{tab}</button>)}</div>
        <div className="mt-6 overflow-hidden rounded-[12px] border border-black/25 bg-[#fffef8]">
          <div className="flex h-11 items-center justify-between border-b border-black/15 px-4"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-[#ff5a1f]" /><span className="size-2 rounded-full bg-black/15" /><span className="size-2 rounded-full bg-black/15" /></div><p className="text-[9px] font-medium uppercase tracking-[0.15em]">{copy.workspaces.workspace}</p><Circle className="size-3 fill-black" /></div>
          <div className="flex"><AppSidebar labels={copy.workspaces.navigation} activeIndex={[1, 2, 4, 0, 3][workspaceIndex]} subMenu={workspaceIndex === 4 ? { items: copy.workspaces.shopSettings.sections, activeIndex: shopSectionIndex, onSelect: setShopSectionIndex } : undefined} />{workspaceIndex === 0 ? <InboxPreview copy={copy} /> : workspaceIndex === 1 ? <BuilderPreview copy={copy} /> : workspaceIndex === 2 ? <AnalyticsPreview copy={copy} locale={locale} /> : workspaceIndex === 3 ? <BackOfficePreview copy={copy} locale={locale} /> : <ShopSettingsPreview copy={copy} sectionIndex={shopSectionIndex} />}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading eyebrow={copy.states.eyebrow} title={copy.states.title} />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[10px] border border-black/20 bg-black/20 lg:grid-cols-3">
          <article className="flex min-h-[280px] flex-col bg-[#fffef8] p-6"><SpecLabel>{copy.states.empty[0]}</SpecLabel><div className="my-auto text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full border border-black/20"><Workflow className="size-5" /></span><h3 className="mt-5 font-[family-name:var(--font-yc-serif)] text-2xl">{copy.states.empty[1]}</h3><p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#716f67]">{copy.states.empty[2]}</p><button className="mt-5 rounded-full bg-black px-4 py-2 text-[10px] font-medium text-white">{copy.states.empty[3]}</button></div></article>
          <article className="flex min-h-[280px] flex-col bg-[#fffef8] p-6"><SpecLabel>{copy.states.loading[0]}</SpecLabel><div className="my-auto text-center"><Loader2 className="mx-auto size-7 animate-spin text-[#ff5a1f]" /><h3 className="mt-5 font-[family-name:var(--font-yc-serif)] text-2xl">{copy.states.loading[1]}</h3><p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#716f67]">{copy.states.loading[2]}</p><div className="mx-auto mt-6 h-1 w-36 overflow-hidden rounded-full bg-black/10"><span className="block h-full w-2/3 bg-black" /></div></div></article>
          <article className="flex min-h-[280px] flex-col bg-[#fffef8] p-6"><SpecLabel>{copy.states.error[0]}</SpecLabel><div className="my-auto text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#c43d32]/10 text-[#c43d32]"><AlertCircle className="size-5" /></span><h3 className="mt-5 font-[family-name:var(--font-yc-serif)] text-2xl">{copy.states.error[1]}</h3><p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#716f67]">{copy.states.error[2]}</p><button className="mt-5 rounded-full border border-[#c43d32]/30 px-4 py-2 text-[10px] font-medium text-[#a83229]">{copy.states.error[3]}</button></div></article>
        </div>
      </section>

      <section id="migration" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading eyebrow={copy.migration.eyebrow} title={copy.migration.title} body={copy.migration.body} />
        <div className="mt-16 overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left"><thead><tr className="border-y border-black"><th className="w-1/4 px-3 py-4 text-[10px] font-medium uppercase tracking-[0.15em]">{copy.migration.headers[0]}</th><th className="w-1/4 px-3 py-4 text-[10px] font-medium uppercase tracking-[0.15em]">{copy.migration.headers[1]}</th><th className="px-3 py-4 text-[10px] font-medium uppercase tracking-[0.15em]">{copy.migration.headers[2]}</th></tr></thead><tbody>{copy.migration.rows.map((row) => <tr key={row[0]} className="border-b border-black/20"><td className="px-3 py-5 text-sm text-[#716f67] line-through decoration-black/30">{row[0]}</td><td className="px-3 py-5 font-[family-name:var(--font-yc-serif)] text-xl">{row[1]}</td><td className="px-3 py-5 text-sm leading-relaxed text-[#56534c]">{row[2]}</td></tr>)}</tbody></table></div>
        <div className="mt-20"><SpecLabel>{copy.migration.phase}</SpecLabel><div className="grid gap-px overflow-hidden rounded-[10px] border border-black/20 bg-black/20 sm:grid-cols-2 lg:grid-cols-4">{copy.migration.phases.map((phase) => <div key={phase[0]} className="bg-[#fffef8] p-6"><p className="font-mono text-[10px] text-[#ff5a1f]">{phase[0]}</p><p className="mt-8 font-[family-name:var(--font-yc-serif)] text-2xl leading-tight">{phase[1]}</p></div>)}</div></div>
      </section>

      <footer className="bg-[#16140f] px-5 py-16 text-[#f5f5ee] sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-12 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-[10px] font-medium uppercase tracking-[0.17em] text-white/55">{copy.footer.label}</p><h2 className="mt-8 max-w-[920px] font-[family-name:var(--font-yc-serif)] text-4xl font-light leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl">{copy.footer.title}</h2></div><p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{copy.footer.note}</p></div>
      </footer>
    </main>
  )
}
