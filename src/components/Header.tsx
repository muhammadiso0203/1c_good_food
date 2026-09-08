import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Calendar as CalendarIcon,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Boxes,
  User,
  RotateCw,
} from "lucide-react"
import type { DateRange } from "react-day-picker"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
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

import { ru } from "date-fns/locale"

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
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Local buffered states for date and branch
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(externalDate)
  const [selectedBranch, setSelectedBranch] = useState<number>(externalBranch || 1)

  useEffect(() => {
    if (externalDate !== undefined) {
      setSelectedDate(externalDate)
    }
  }, [externalDate])

  useEffect(() => {
    if (externalBranch !== undefined) {
      setSelectedBranch(externalBranch)
    }
  }, [externalBranch])

  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Two separate dates for start and end inside popover
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(selectedDate?.from)
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(selectedDate?.to || selectedDate?.from)
  const [fromMonth, setFromMonth] = useState<Date | undefined>(selectedDate?.from || new Date())
  const [toMonth, setToMonth] = useState<Date | undefined>(selectedDate?.to || new Date())

  const navigate = useNavigate()
  const authUser = getAuthUser()

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  const handleOpenChange = (open: boolean) => {
    if (open) {
      const start = selectedDate?.from || new Date()
      const end = selectedDate?.to || selectedDate?.from || new Date()
      setTempStartDate(start)
      setTempEndDate(end)
      setFromMonth(start)
      setToMonth(end)
    }
    setIsOpen(open)
  }

  // When clicking OK in popover: only updates local selectedDate, does NOT trigger API calls yet
  const handleApply = () => {
    if (tempStartDate) {
      const finalRange: DateRange = {
        from: tempStartDate,
        to: tempEndDate || tempStartDate,
      }
      setSelectedDate(finalRange)
    }
    setIsOpen(false)
  }

  // When branch select changes: only updates local selectedBranch, does NOT trigger API calls yet
  const handleBranchChange = (newBranchStr: string) => {
    const newBranchId = Number(newBranchStr) || 1
    setSelectedBranch(newBranchId)
  }

  // When clicking "Обновить": triggers onDateChange, onBranchChange and refreshes queries
  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (onDateChange) {
      onDateChange(selectedDate)
    }
    if (onBranchChange) {
      onBranchChange(selectedBranch)
    }
    try {
      await queryClient.invalidateQueries()
      toast.success("Данные успешно обновлены", { duration: 2500 })
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setTimeout(() => setIsRefreshing(false), 400)
    }
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Выберите период"
    if (!range.to) return format(range.from, "dd.MM.yyyy")
    return `${format(range.from, "dd.MM.yyyy")} - ${format(range.to, "dd.MM.yyyy")}`
  }

  const handleLogout = () => {
    setIsMenuOpen(false)
    clearAuthSession()
    toast.info("Tizimdan chiqdingiz")
    navigate("/login", { replace: true })
  }

  return (
    <>
      {/* Header Bar */}
      <header className="w-full bg-[#090d16] border-b border-zinc-800/60 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3.5 sm:py-4">
        <div className="w-full max-w-[2000px] 2xl:max-w-[2560px] 3xl:max-w-[3200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          {/* Left side: Hamburger button and Title */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="h-10 w-10 bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
              title="Открыть меню"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-zinc-100 uppercase truncate">
              {title}
            </h1>
          </div>

          {/* Right side: Period, Branch Filters, Obnovit Button, User Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full md:w-auto flex-wrap">
            {/* Период (Date Picker Popup) */}
            <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-64">
              <Popover open={isOpen} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal h-10 px-3 bg-zinc-900/40 border-zinc-800 text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-100 hover:border-zinc-700 transition-all rounded-md"
                    )}
                  >
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {formatDateRange(selectedDate)}
                    </span>
                    <CalendarIcon className="h-4 w-4 text-zinc-400 shrink-0 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-4 sm:p-5 bg-[#0e1626] border-zinc-800 text-zinc-200 rounded-2xl shadow-2xl max-w-[98vw] overflow-x-auto"
                  align="end"
                >
                  <div className="flex flex-col gap-4">
                    {/* Ikkita alohida kalendar (Дата начала va Дата окончания) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1. Дата начала */}
                      <div className="flex flex-col bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80">
                        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-zinc-800/60">
                          <span className="text-xs font-semibold text-blue-400">
                            Дата начала
                          </span>
                          <span className="text-xs font-bold text-zinc-100 bg-zinc-800 px-2 py-0.5 rounded">
                            {tempStartDate ? format(tempStartDate, "dd.MM.yyyy") : "—"}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            locale={ru}
                            selected={tempStartDate}
                            month={fromMonth}
                            onMonthChange={setFromMonth}
                            onSelect={(selected) => {
                              if (selected) {
                                setTempStartDate(selected)
                                if (tempEndDate && selected > tempEndDate) {
                                  setTempEndDate(selected)
                                }
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* 2. Дата окончания */}
                      <div className="flex flex-col bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80">
                        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-zinc-800/60">
                          <span className="text-xs font-semibold text-emerald-400">
                            Дата окончания
                          </span>
                          <span className="text-xs font-bold text-zinc-100 bg-zinc-800 px-2 py-0.5 rounded">
                            {tempEndDate ? format(tempEndDate, "dd.MM.yyyy") : "—"}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            locale={ru}
                            selected={tempEndDate}
                            month={toMonth}
                            onMonthChange={setToMonth}
                            onSelect={(selected) => {
                              if (selected) {
                                setTempEndDate(selected)
                                if (tempStartDate && selected < tempStartDate) {
                                  setTempStartDate(selected)
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pastki tugmalar: Отмена va Применить */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <div className="text-xs text-zinc-400">
                        Период:{" "}
                        <span className="text-zinc-200 font-semibold">
                          {tempStartDate ? format(tempStartDate, "dd.MM.yyyy") : "—"}
                          {" — "}
                          {tempEndDate ? format(tempEndDate, "dd.MM.yyyy") : "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
                          className="h-8.5 px-3.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg cursor-pointer"
                        >
                          Отмена
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleApply}
                          className="h-8.5 px-5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition-all cursor-pointer"
                        >
                          ОК
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Branch (Select Dropdown) */}
            <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-45">
              <Select value={String(selectedBranch)} onValueChange={handleBranchChange}>
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

            {/* Обновить Button */}
            <Button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-10 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm rounded-md transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
              title="Обновить данные"
            >
              <RotateCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              <span>Обновить</span>
            </Button>

            {/* Logged in User Badge */}
            <div className="flex items-center gap-2.5 h-10 px-3.5 bg-zinc-900/40 border border-zinc-800 text-zinc-200 rounded-md shrink-0">
              <div className="h-6 w-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 truncate max-w-40">
                {authUser || "Admin"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Menu Drawer Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Menu Drawer Panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-[#0c121e] border-r border-zinc-800/80 z-50 flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6">
          {/* Menu Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Menu className="h-5 w-5" />
              </div>
              <span className="text-base font-bold tracking-wide text-zinc-100">
                Меню
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                )
              }
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              <span>Главная</span>
            </NavLink>

            <NavLink
              to="/nelikvid"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                )
              }
            >
              <Boxes className="h-4.5 w-4.5" />
              <span>Неликвидный товар</span>
            </NavLink>
          </nav>
        </div>

        {/* Menu Footer: User Info & Logout Button */}
        <div>

          {/* Выход (Chiqish) Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-11 px-4 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/50 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98]"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Выход</span>
          </button>
        </div>
      </aside>
    </>
  )
}

