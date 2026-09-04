"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  style,
  ...props
}: CalendarProps) {
  // When an inline `style` is passed (e.g. monochrome booking flow), drop the
  // slate-800 default background so the caller's bg color can show through.
  const hasInlineStyle = !!style
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      style={style}
      className={cn(
        hasInlineStyle
          ? "p-5 backdrop-blur-2xl rounded-2xl border shadow-2xl shadow-black/40"
          : "p-5 bg-slate-800/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-600/50 shadow-2xl shadow-black/60",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-5",
        caption_label: "text-xl font-bold text-white tracking-wide",
        nav: "space-x-3 flex items-center",
        nav_button: cn(
          "h-10 w-10 bg-slate-700/80 hover:bg-slate-600/80",
          "rounded-xl flex items-center justify-center transition-all duration-200",
          "border border-slate-600/50 hover:border-slate-500/70",
          "text-slate-300 hover:text-white hover:scale-105",
          "shadow-md hover:shadow-lg"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between mb-2",
        head_cell:
          "text-slate-400 rounded-lg w-11 font-bold text-xs uppercase tracking-wider",
        row: "flex w-full justify-between mt-1.5",
        cell: cn(
          "h-11 w-11 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
          "[&:has([aria-selected].day-outside)]:bg-blue-500/20",
          "[&:has([aria-selected])]:bg-blue-500/20",
          "first:[&:has([aria-selected])]:rounded-l-lg",
          "last:[&:has([aria-selected])]:rounded-r-lg",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "h-11 w-11 p-0 font-semibold rounded-lg transition-all duration-200",
          "text-slate-200 hover:text-white",
          "hover:bg-slate-700/60",
          "hover:scale-105 hover:shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-0",
          "aria-selected:opacity-100 active:scale-95"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold",
          "shadow-lg shadow-blue-500/40 border-2 border-blue-400/60",
          "hover:from-blue-600 hover:to-blue-700",
          "hover:shadow-xl hover:shadow-blue-500/50",
          "scale-[1.08]"
        ),
        day_today: cn(
          "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
          "ring-2 ring-cyan-400/80 ring-offset-0",
          "text-cyan-200 font-bold",
          "shadow-md shadow-cyan-500/30"
        ),
        day_outside: cn(
          "day-outside text-slate-500/50 opacity-50",
          "hover:text-slate-400/70",
          "aria-selected:bg-blue-500/15 aria-selected:text-slate-400"
        ),
        day_disabled:
          "text-slate-500/45 line-through cursor-not-allowed hover:scale-100 hover:bg-transparent hover:text-slate-500/45 aria-selected:bg-transparent aria-selected:text-slate-500/45",
        day_range_middle: cn(
          "aria-selected:bg-blue-500/20 aria-selected:text-white"
        ),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
