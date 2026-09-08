import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker> & {
  month?: Date
  onMonthChange?: (month: Date) => void
}

const MONTHS_RU = [
  { value: 0, label: "янв." },
  { value: 1, label: "февр." },
  { value: 2, label: "март" },
  { value: 3, label: "апр." },
  { value: 4, label: "май" },
  { value: 5, label: "июн." },
  { value: 6, label: "июл." },
  { value: 7, label: "авг." },
  { value: 8, label: "сент." },
  { value: 9, label: "окт." },
  { value: 10, label: "нояб." },
  { value: 11, label: "дек." },
]

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month: controlledMonth,
  onMonthChange,
  ...props
}: CalendarProps) {
  const [uncontrolledMonth, setUncontrolledMonth] = React.useState<Date>(
    controlledMonth || new Date()
  )
  const currentMonth = controlledMonth || uncontrolledMonth

  const handleMonthChange = (newMonth: Date) => {
    if (!controlledMonth) {
      setUncontrolledMonth(newMonth)
    }
    onMonthChange?.(newMonth)
  }

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    handleMonthChange(prev)
  }

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    handleMonthChange(next)
  }

  const handleSelectMonth = (m: number) => {
    const updated = new Date(currentMonth.getFullYear(), m, 1)
    handleMonthChange(updated)
  }

  const handleSelectYear = (y: number) => {
    const updated = new Date(y, currentMonth.getMonth(), 1)
    handleMonthChange(updated)
  }

  // Generate list of years (2020 - 2035)
  const currentYear = currentMonth.getFullYear()
  const years = React.useMemo(() => {
    const list: number[] = []
    const startYear = Math.min(2020, currentYear - 5)
    const endYear = Math.max(2032, currentYear + 6)
    for (let y = startYear; y <= endYear; y++) {
      list.push(y)
    }
    return list
  }, [currentYear])

  return (
    <div className={cn("p-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-xl inline-block select-none", className)}>
      {/* Custom Header matching screenshot: < сент. ⌄ 2026 ⌄ > */}
      <div className="flex items-center justify-between px-1 pb-3 mb-2 border-b border-zinc-800/80">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {/* Month dropdown */}
          <div className="relative group">
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => handleSelectMonth(Number(e.target.value))}
              className="appearance-none bg-zinc-800/60 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm pl-2.5 pr-6 py-1 rounded-lg cursor-pointer transition-colors border border-zinc-700/60 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {MONTHS_RU.map((m) => (
                <option key={m.value} value={m.value} className="bg-zinc-900 text-zinc-100">
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none group-hover:text-zinc-200" />
          </div>

          {/* Year dropdown */}
          <div className="relative group">
            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => handleSelectYear(Number(e.target.value))}
              className="appearance-none bg-zinc-800/60 hover:bg-zinc-800 text-zinc-100 font-bold text-sm pl-2.5 pr-6 py-1 rounded-lg cursor-pointer transition-colors border border-zinc-700/60 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-zinc-900 text-zinc-100">
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none group-hover:text-zinc-200" />
          </div>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* DayPicker */}
      <DayPicker
        month={currentMonth}
        onMonthChange={handleMonthChange}
        showOutsideDays={showOutsideDays}
        className="m-0"
        classNames={{
          months: "flex flex-col space-y-2",
          month: "space-y-2",
          month_caption: "hidden",
          caption_label: "hidden",
          nav: "hidden",
          month_grid: "w-full border-collapse",
          weekdays: "flex justify-between mb-1",
          weekday: "text-zinc-400 font-medium text-xs text-center w-8 h-8 flex items-center justify-center",
          week: "flex w-full mt-1 justify-between",
          day: "h-8 w-8 p-0 text-center relative flex items-center justify-center",
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-medium text-sm text-zinc-200 aria-selected:opacity-100 text-center flex items-center justify-center rounded-xl hover:bg-zinc-800 cursor-pointer transition-colors"
          ),
          selected: "!bg-black !text-white hover:!bg-zinc-900 focus:!bg-black focus:!text-white font-bold rounded-xl shadow-lg ring-1 ring-zinc-700",
          today: "bg-zinc-800 text-blue-400 font-bold border border-blue-500/40 rounded-xl",
          outside: "text-zinc-600 opacity-40 font-normal",
          disabled: "text-zinc-700 opacity-20 cursor-not-allowed",
          range_start: "bg-black text-white rounded-l-xl font-bold",
          range_end: "bg-black text-white rounded-r-xl font-bold",
          range_middle: "bg-zinc-800/60 text-zinc-200 rounded-none",
          ...classNames,
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

