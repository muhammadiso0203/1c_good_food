import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export interface HeaderProps {
  title?: string
  subTitle?: string
  onDateChange?: (date: DateRange | undefined) => void
  onBranchChange?: (branch: string) => void
}

export function Header({
  title = "КАБИНЕТ РУКОВОДИТЕЛЯ",
  onDateChange,
  onBranchChange,
}: HeaderProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 5, 1), // June 1, 2024
    to: new Date(2024, 5, 30), // June 30, 2024
  })
  const [month, setMonth] = useState<Date | undefined>(new Date(2024, 5, 1))
  const [branch, setBranch] = useState("all")

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    if (newDate?.from) {
      setMonth(newDate.from)
    }
    if (onDateChange) {
      onDateChange(newDate)
    }
  }

  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch)
    if (onBranchChange) {
      onBranchChange(newBranch)
    }
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range) return "Выберите период"
    if (!range.from) return "Выберите период"
    if (!range.to) return format(range.from, "dd.MM.yyyy")
    return `${format(range.from, "dd.MM.yyyy")} - ${format(range.to, "dd.MM.yyyy")}`
  }

  return (
    <header className="w-full bg-[#090d16] border-b border-zinc-800/60 px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg backdrop-blur-md">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-zinc-100 uppercase">
          {title}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Period (Date Picker) */}
        <div className="flex flex-col gap-1.5 min-w-60">
          <span className="text-[11px] font-semibold text-zinc-500">
            Период
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal h-10 px-3 bg-zinc-900/40 border-zinc-800 text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-100 hover:border-zinc-700 transition-all rounded-md"
                )}
              >
                <span className="text-sm font-medium">{formatDateRange(date)}</span>
                <CalendarIcon className="h-4.5 w-4.5 text-zinc-400 shrink-0 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-zinc-950 border-zinc-800 text-zinc-200 shadow-2xl rounded-lg" align="end">
              <Calendar
                mode="range"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Branch (Select Dropdown) */}
        <div className="flex flex-col gap-1.5 min-w-50">
          <span className="text-[11px] font-semibold text-zinc-500">
            Филиал
          </span>
          <Select value={branch} onValueChange={handleBranchChange}>
            <SelectTrigger className="w-full h-10 px-3 bg-zinc-900/40 border-zinc-800 text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-100 hover:border-zinc-700 transition-all rounded-md focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Выберите филиал" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-200 shadow-2xl rounded-md">
              <SelectItem value="all" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                Все филиалы
              </SelectItem>
              <SelectItem value="tashkent" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                Ташкент
              </SelectItem>
              <SelectItem value="samarkand" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                Самарканд
              </SelectItem>
              <SelectItem value="bukhara" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                Бухара
              </SelectItem>
              <SelectItem value="fergana" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                Фергана
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
