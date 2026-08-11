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

const defaultStats: StatCardProps[] = [
  {
    title: "ПРОДАЖИ СЕГОДНЯ",
    value: "625 450 000",
    unit: "сум",
    trend: { value: "12.4%", label: "к вчера", isPositive: true, isUp: true },
    icon: ShoppingCart,
    iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
  },
  {
    title: "ПРОДАЖИ МЕСЯЦА",
    value: "12 450 800 000",
    unit: "сум",
    trend: { value: "8.7%", label: "к апрелю", isPositive: true, isUp: true },
    icon: BarChart3,
    iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
  },
  {
    title: "ВЫПОЛНЕНИЕ ПЛАНА",
    value: "86%",
    progress: 86,
    trend: { value: "6 п.п.", label: "к апрелю", isPositive: true, isUp: true },
    icon: Target,
    iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
  },
  {
    title: "ВАЛОВАЯ ПРИБЫЛЬ",
    value: "2 145 680 000",
    unit: "сум",
    trend: { value: "9.1%", label: "к апрелю", isPositive: true, isUp: true },
    icon: TrendingUp,
    iconColor: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20",
  },
  {
    title: "ОСТАТОК ТОВАРА",
    value: "18 450 000 000",
    unit: "сум",
    trend: { value: "3.2%", label: "к апрелю", isPositive: true, isUp: true },
    icon: Package,
    iconColor: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
  },
  {
    title: "ДЕНЬГИ НА СЧЕТАХ",
    value: "2 385 750 000",
    unit: "сум",
    trend: { value: "5.3%", label: "к апрелю", isPositive: true, isUp: true },
    icon: Landmark,
    iconColor: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
  },
  {
    title: "ДЕНЬГИ В КАССАХ",
    value: "75 480 000",
    unit: "сум",
    trend: { value: "-1.2%", label: "к апрелю", isPositive: false, isUp: false },
    icon: Coins,
    iconColor: "bg-purple-950/40 text-purple-400 border border-purple-500/20",
  },
  {
    title: "ДЕБИТОРСКАЯ ЗАДОЛЖ.",
    value: "3 240 560 000",
    unit: "сум",
    trend: { value: "4.8%", label: "к апрелю", isPositive: true, isUp: true },
    icon: UserCheck,
    iconColor: "bg-amber-950/40 text-amber-400 border border-amber-500/20",
  },
  {
    title: "ПРОСРОЧЕННАЯ ДЕБИТОРКА",
    value: "540 350 000",
    unit: "сум",
    // Receivable increase is styled as red (negative impact)
    trend: { value: "7.5%", label: "к апрелю", isPositive: false, isUp: true },
    icon: Clock,
    iconColor: "bg-rose-950/40 text-rose-400 border border-rose-500/20",
  },
  {
    title: "НЕЛИКВИДНЫЙ ТОВАР",
    value: "1 245 600 000",
    unit: "сум",
    trend: { value: "-2.1%", label: "к апрелю", isPositive: false, isUp: false },
    icon: PackageMinus,
    iconColor: "bg-orange-950/40 text-orange-400 border border-orange-500/20",
  },
]

export function StatsCards({ stats = defaultStats }: { stats?: StatCardProps[] }) {
  return (
    <div className="w-full grid grid-cols-10 gap-3 px-3 mt-6">
      {stats.map((stat, idx) => {
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
              <span>{stat.trend.value}</span>
              <span className="text-zinc-500 font-medium font-sans">
                {stat.trend.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
