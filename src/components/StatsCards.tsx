import {
  ShoppingCart,
  BarChart3,
  Target,
  TrendingUp,
  Package,
  Landmark,
  Coins,
  UserCheck,
  Clock,
  PackageMinus,
  type LucideIcon
} from "lucide-react"
import { cn } from "../lib/utils"
import { useData } from "../service/useData"
import type { DateRange } from "react-day-picker"


export interface StatCardProps {
  title: string
  value: string
  unit?: string
  progress?: number
  trend: {
    value: string
    label: string
    isPositive: boolean
    isUp: boolean
  }
  icon: LucideIcon
  iconColor: string
}



const formatNumber = (val?: number) => {
  if (val === undefined || val === null) return "0"
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(val / 1000)
}

const formatTrend = (val?: number, label = "за период", invertPositive = false) => {
  if (val === undefined || val === null) {
    return { value: "0%", label, isPositive: true, isUp: true }
  }
  const isUp = val >= 0
  const isPositive = invertPositive ? val <= 0 : val >= 0
  return {
    value: `${val > 0 ? "+" : ""}${val}%`,
    label,
    isPositive,
    isUp
  }
}

const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between p-4 bg-gray-800 border border-zinc-800/40 rounded-xl animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-full bg-zinc-700/60 shrink-0" />

        <div className="flex flex-col gap-1.5 pt-1 w-full">
          <div className="h-2 w-3/4 bg-zinc-700/60 rounded" />
          <div className="h-2 w-1/2 bg-zinc-700/60 rounded" />
        </div>
      </div>

      {/* Value */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="h-4 w-4/5 bg-zinc-700/60 rounded" />
        <div className="h-2 w-1/3 bg-zinc-700/40 rounded" />
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1">
        <div className="h-2 w-5 bg-zinc-700/60 rounded" />
        <div className="h-2 w-8 bg-zinc-700/60 rounded" />
        <div className="h-2 w-14 bg-zinc-700/40 rounded" />
      </div>
    </div>
  )
}

export function StatsCards({ date }: { date?: DateRange }) {
  const { data, isLoading } = useData(date)

 

  const defaultStats: StatCardProps[] = [
    {
      title: "ПРОДАЖИ СЕГОДНЯ",
      value: formatNumber(data?.ПродажиСегодня),
      unit: "тыс. сум",
      trend: formatTrend(data?.ПродажиИзменениеДень, "к вчера"),
      icon: ShoppingCart,
      iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    },
    {
      title: "ПРОДАЖИ ЗА ПЕРИОД",
      value: formatNumber(data?.ПродажиПериод),
      unit: "тыс. сум",
      trend: formatTrend(data?.ПродажиИзменениеПериод, "за период"),
      icon: BarChart3,
      iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    },
    {
      title: "ВЫПОЛНЕНИЕ ПЛАНА",
      value: "86%",
      progress: 86,
      trend: { value: "6 п.п.", label: "за период", isPositive: true, isUp: true },
      icon: Target,
      iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    },
    {
      title: "ВАЛОВАЯ ПРИБЫЛЬ",
      value: formatNumber(data?.ВаловаяПрибыль),
      unit: "тыс. сум",
      trend: formatTrend(data?.ВаловаяПрибыльИзменение, "за период"),
      icon: TrendingUp,
      iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
    },
    {
      title: "ОСТАТОК ТОВАРА",
      value: formatNumber(data?.ОстатокТовара),
      unit: "тыс. сум",
      trend: formatTrend(data?.ОстатокТовараИзменение, "за период"),
      icon: Package,
      iconColor: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
    },
    {
      title: "ДЕНЬГИ НА СЧЕТАХ",
      value: formatNumber(data?.ДеньгиНаСчетах),
      unit: "тыс. сум",
      trend: formatTrend(data?.ДеньгиНаСчетахИзменение, "за период"),
      icon: Landmark,
      iconColor: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
    },
    {
      title: "ДЕНЬГИ В КАССАХ",
      value: formatNumber(data?.ДеньгиВКассах),
      unit: "тыс. сум",
      trend: formatTrend(data?.ДеньгиВКассахИзменение, "за период"),
      icon: Coins,
      iconColor: "bg-purple-950/40 text-purple-400 border border-purple-500/20",
    },
    {
      title: "ДЕБИТОРСКАЯ ЗАДОЛЖ.",
      value: formatNumber(data?.ДебиторскаяЗадолженность),
      unit: "тыс. сум",
      trend: formatTrend(data?.ДебиторскаяЗадолженностьИзменение, "за период"),
      icon: UserCheck,
      iconColor: "bg-amber-950/40 text-amber-400 border border-amber-500/20",
    },
    {
      title: "ПРОСРОЧЕННАЯ ДЕБИТОРКА",
      value: formatNumber(540350000),
      unit: "тыс. сум",
      trend: { value: "7.5%", label: "за период", isPositive: true, isUp: true },
      icon: Clock,
      iconColor: "bg-rose-950/40 text-rose-400 border border-rose-500/20",
    },
    {
      title: "НЕЛИКВИДНЫЙ ТОВАР",
      value: formatNumber(1245600000),
      unit: "тыс. сум",
      trend: { value: "-2.1%", label: "за период", isPositive: false, isUp: false },
      icon: PackageMinus,
      iconColor: "bg-orange-950/40 text-orange-400 border border-orange-500/20",
    },
  ]

  return (
    <div className="w-full grid grid-cols-10 gap-3 px-3 mt-6">
      {isLoading ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />) : defaultStats.map((stat, idx) => {
        const IconComponent = stat.icon
        return (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 bg-gray-800 border border-zinc-800/40 hover:border-zinc-700/60 rounded-xl transition-all duration-300"
          >
            {/* Header: Icon + Title */}
            <div className="flex items-start gap-2.5 mb-4">
              <div className={cn("p-1.5 rounded-full shrink-0 flex items-center justify-center", stat.iconColor)}>
                <IconComponent className="h-4 w-4" />
              </div>
              <h3 className="text-[9px] font-bold tracking-wide text-zinc-400 leading-tight">
                {stat.title}
              </h3>
            </div>

            {/* Content: Value + Unit / Progress */}
            <div className="flex flex-col gap-1 mb-3">
              <div className="text-sm xl:text-[15px] font-extrabold text-zinc-100 tracking-tight leading-none">
                {stat.value}
              </div>
              {stat.progress !== undefined ? (
                <div className="w-full bg-zinc-800 h-2.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                <span className="text-[10px] text-zinc-500 font-medium">
                  {stat.unit}
                </span>
              )}
            </div>

            {/* Footer: Trend */}
            <div
              className={cn(
                "flex items-center gap-1 text-[10px] font-bold mt-auto shrink-0",
                stat.trend.isPositive ? "text-emerald-500" : "text-rose-500"
              )}
            >
              <span>{stat.trend.isUp ? "▲" : "▼"}</span>
              <span className="text-[9px]">{stat.trend.value}</span>
              <span className="text-zinc-500 font-medium font-sans text-[9px]">
                {stat.trend.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
