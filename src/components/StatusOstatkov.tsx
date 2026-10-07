import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"

interface StatusOstatkovItem {
  status: string
  sku: number
  foiz: number
  color: string
  bgKlass: string
  textKlass: string
}

interface StatusOstatkovProps {
  date?: DateRange
  branch?: number
}

const defaultFallbackData: StatusOstatkovItem[] = [
  {
    status: "Норма запаса",
    sku: 2856,
    foiz: 59,
    color: "#10b981", // emerald-500
    bgKlass: "bg-emerald-500",
    textKlass: "text-emerald-400",
  },
  {
    status: "Мало (<= мин. запаса)",
    sku: 1124,
    foiz: 23,
    color: "#f59e0b", // amber-500
    bgKlass: "bg-amber-500",
    textKlass: "text-amber-400",
  },
  {
    status: "Нет в наличии",
    sku: 846,
    foiz: 18,
    color: "#ef4444", // red-500
    bgKlass: "bg-red-500",
    textKlass: "text-red-400",
  },
]

function StatusOstatkovSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40">
          <div className="h-3 w-40 bg-zinc-700/60 rounded" />
        </div>

        {/* Content Layout Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 min-h-40 flex-1">
          {/* Doughnut Skeleton */}
          <div className="w-28 h-28 sm:w-30 sm:h-30 rounded-full border-8 border-zinc-700/50 flex items-center justify-center shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div className="h-4 w-12 bg-zinc-700/70 rounded" />
              <div className="h-2 w-10 bg-zinc-700/40 rounded" />
            </div>
          </div>

          {/* Right Side: Data Legend Skeleton */}
          <div className="w-full flex-1 flex flex-col gap-3.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-1.5 -mx-1.5">
                <div className="w-3 h-3 rounded-[3px] bg-zinc-700/60 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="h-2.5 w-24 bg-zinc-700/60 rounded" />
                  <div className="h-2 w-16 bg-zinc-700/40 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatusOstatkov({ date, branch }: StatusOstatkovProps) {
  const { data: apiData, isLoading } = useData(date, branch)

  const parseStatusVal = (val: unknown): { sku: number; foiz: number } => {
    if (val === undefined || val === null) return { sku: 0, foiz: 0 }
    if (typeof val === "number") return { sku: isNaN(val) ? 0 : val, foiz: 0 }
    if (typeof val === "string") {
      const parts = val.split("_")
      const sku = parseFloat(parts[0].replace(/\s/g, "").replace(",", ".")) || 0
      const foiz = parts[1] !== undefined ? parseFloat(parts[1].replace(/\s/g, "").replace(",", ".")) || 0 : 0
      return { sku: Math.round(sku), foiz: Math.round(foiz) }
    }
    return { sku: 0, foiz: 0 }
  }

  const data: StatusOstatkovItem[] = useMemo(() => {
    if (!apiData) return defaultFallbackData

    let rawNorma: unknown
    let rawMalo: unknown
    let rawNet: unknown
    let hasMatchingKey = false

    for (const [key, value] of Object.entries(apiData)) {
      const kLower = key.toLowerCase()
      if (
        kLower.includes("статусостатков") ||
        kLower.includes("нормазапаса") ||
        kLower.includes("мало") ||
        kLower.includes("нетвналичии")
      ) {
        if (kLower.includes("нормазапаса") || kLower.includes("norma")) {
          rawNorma = value
          hasMatchingKey = true
        } else if (kLower.includes("мало") || kLower.includes("malo")) {
          rawMalo = value
          hasMatchingKey = true
        } else if (kLower.includes("нетвналичии") || kLower.includes("netvnalichii") || kLower.includes("нет_в_наличии")) {
          rawNet = value
          hasMatchingKey = true
        }
      }
    }

    if (!hasMatchingKey) {
      return defaultFallbackData
    }

    const norm = parseStatusVal(rawNorma)
    const malo = parseStatusVal(rawMalo)
    const net = parseStatusVal(rawNet)

    const total = norm.sku + malo.sku + net.sku

    const calcFoiz = (item: { sku: number; foiz: number }) => {
      if (item.foiz > 0) return item.foiz
      if (total > 0 && item.sku > 0) return Math.round((item.sku / total) * 100)
      return 0
    }

    return [
      {
        status: "Норма запаса",
        sku: norm.sku,
        foiz: calcFoiz(norm),
        color: "#10b981",
        bgKlass: "bg-emerald-500",
        textKlass: "text-emerald-400",
      },
      {
        status: "Мало (<= мин. запаса)",
        sku: malo.sku,
        foiz: calcFoiz(malo),
        color: "#f59e0b",
        bgKlass: "bg-amber-500",
        textKlass: "text-amber-400",
      },
      {
        status: "Нет в наличии",
        sku: net.sku,
        foiz: calcFoiz(net),
        color: "#ef4444",
        bgKlass: "bg-red-500",
        textKlass: "text-red-400",
      },
    ]
  }, [apiData])

  const totalSKU = useMemo(() => {
    return data.reduce((sum, item) => sum + item.sku, 0)
  }, [data])

  const chartData = useMemo(() => {
    if (totalSKU === 0) {
      return [{ status: "Нет данных", sku: 1, color: "#374151" }]
    }
    return data
  }, [data, totalSKU])

  if (isLoading && !apiData) {
    return <StatusOstatkovSkeleton />
  }

  const formatNumber = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className="w-full h-full">
      <div className="relative h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between overflow-hidden">
        {/* Header Title */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            СТАТУС ОСТАТКОВ (SKU)
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 min-h-40 flex-1">
          {/* Left Side: Recharts Doughnut Chart */}
          <div className="relative w-28 h-28 sm:w-30 sm:h-30 flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="sku"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={item.color}
                      stroke="none"
                      style={{ outline: "none" }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Doughnut Center Info Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-2xl font-black text-zinc-100 leading-none">
                {formatNumber(totalSKU)}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                всего SKU
              </span>
            </div>
          </div>

          {/* Right Side: Data Legend */}
          <div className="w-full flex-1 flex flex-col gap-3.5">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-lg hover:bg-zinc-800/20 transition-all duration-200"
              >
                {/* Colored square indicator */}
                <span className={`w-3 h-3 rounded-[3px] shrink-0 mt-0.5 ${item.bgKlass}`} />

                {/* Text info */}
                <div className="flex flex-col leading-tight">
                  <span className="text-zinc-400 text-[9px] sm:text-[10px] font-semibold">
                    {item.status}
                  </span>
                  <span className="text-zinc-100 text-[10px] sm:text-[11px] font-bold mt-0.5 font-mono">
                    {formatNumber(item.sku)} ({item.foiz}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
