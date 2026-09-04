import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, LogOut } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { clearAuthSession, getAuthUser } from "../lib/auth"

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
  date?: DateRange
  branch?: number
  onDateChange?: (date: DateRange | undefined) => void
  onBranchChange?: (branch: number) => void
}

export function Header({
  title = "КАБИНЕТ РУКОВОДИТЕЛЯ",
  date: externalDate,
  branch: externalBranch,
  onDateChange,
  onBranchChange,
}: HeaderProps) {
  const [internalDate, setInternalDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const date = externalDate !== undefined ? externalDate : internalDate

  const [internalBranch, setInternalBranch] = useState<number>(1)
  const branch = externalBranch !== undefined ? externalBranch : internalBranch

  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<DateRange | undefined>(date)
  const [month, setMonth] = useState<Date | undefined>(date?.from || new Date())

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempDate(date)
      if (date?.from) {
        setMonth(date.from)
      }
    }
    setIsOpen(open)
  }

  const handleApply = () => {
    if (tempDate?.from) {
      const finalRange: DateRange = {
        from: tempDate.from,
        to: tempDate.to || tempDate.from,
      }
      setInternalDate(finalRange)
      if (onDateChange) {
        onDateChange(finalRange)
      }
    }
    setIsOpen(false)
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Выберите период"
    if (!range.to) return format(range.from, "dd.MM.yyyy")
    return `${format(range.from, "dd.MM.yyyy")} - ${format(range.to, "dd.MM.yyyy")}`
  }

  const navigate = useNavigate()
  const authUser = getAuthUser()

  const handleLogout = () => {
    clearAuthSession()
    toast.info("Tizimdan chiqdingiz")
    navigate("/login", { replace: true })
  }

  const handleBranchChange = (newBranchStr: string) => {
    const newBranchId = Number(newBranchStr) || 1
    setInternalBranch(newBranchId)
    if (onBranchChange) {
      onBranchChange(newBranchId)
    }
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  return (
    <header className="w-full bg-[#090d16] border-b border-zinc-800/60 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-zinc-100 uppercase">
            {title}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full md:w-auto flex-wrap">
          {/* Период (Date Picker Popup) */}
          <div className="flex flex-col gap-1.5 w-full sm:w-auto sm:min-w-64">
            <span className="text-[11px] font-semibold text-zinc-500">
              Период
            </span>
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between text-left font-normal h-10 px-3 bg-zinc-900/40 border-zinc-800 text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-100 hover:border-zinc-700 transition-all rounded-md"
                  )}
                >
                  <span className="text-xs sm:text-sm font-medium truncate">
                    {formatDateRange(date)}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-zinc-400 shrink-0 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-4 bg-zinc-950 border-zinc-800 text-zinc-200 rounded-xl shadow-2xl max-w-[95vw] overflow-x-auto"
                align="end"
              >
                <div className="flex flex-col gap-4">
                  {/* Ikkita alohida ko'rinish: Дата начала va Дата окончания */}
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-800/80">
                    <div className="flex flex-col gap-1 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                      <span className="text-[11px] font-semibold text-zinc-400">
                        Дата начала:
                      </span>
                      <span className="text-sm font-bold text-zinc-100">
                        {tempDate?.from ? format(tempDate.from, "dd.MM.yyyy") : "—"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                      <span className="text-[11px] font-semibold text-zinc-400">
                        Дата окончания:
                      </span>
                      <span className="text-sm font-bold text-zinc-100">
                        {tempDate?.to
                          ? format(tempDate.to, "dd.MM.yyyy")
                          : tempDate?.from
                          ? format(tempDate.from, "dd.MM.yyyy")
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Kalendar */}
                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={tempDate}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(range) => setTempDate(range)}
                      numberOfMonths={isMobile ? 1 : 2}
                    />
                  </div>

                  {/* Tugmalar: Отмена va ОК */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800/80">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 px-3 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md cursor-pointer"
                    >
                      Отмена
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleApply}
                      className="h-8 px-5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-sm transition-all cursor-pointer"
                    >
                      ОК
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Branch (Select Dropdown) */}
          <div className="flex flex-col gap-1.5 w-full sm:w-auto sm:min-w-[180px]">
            <span className="text-[11px] font-semibold text-zinc-500">
              Филиал
            </span>
            <Select value={String(branch)} onValueChange={handleBranchChange}>
              <SelectTrigger className="w-full h-10 px-3 bg-zinc-900/40 border-zinc-800 text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-100 hover:border-zinc-700 transition-all rounded-md focus:ring-0 focus:ring-offset-0 text-xs sm:text-sm">
                <SelectValue placeholder="Выберите филиал" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-200 rounded-md">
                <SelectItem value="1" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer text-xs sm:text-sm">
                  Все филиалы
                </SelectItem>
                <SelectItem value="2" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer text-xs sm:text-sm">
                  Ташкент
                </SelectItem>
                <SelectItem value="3" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer text-xs sm:text-sm">
                  Сырдарья
                </SelectItem>
                <SelectItem value="4" className="hover:bg-zinc-900 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer text-xs sm:text-sm">
                  Джизак
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Logout Button */}
          <div className="flex flex-col gap-1.5 sm:self-end">
            <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline-block">
              {authUser || "Foydalanuvchi"}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-10 px-3 bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900/40 hover:text-red-300 hover:border-red-700 transition-all rounded-md flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              title="Tizimdan chiqish"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-zinc-800/40">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              "px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            )
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/nelikvid"
          className={({ isActive }) =>
            cn(
              "px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            )
          }
        >
          Неликвидный товар
        </NavLink>
      </nav>
    </header>
  )
}
