import type { StatsCard } from "../pages/service/interface"
import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"

interface DebitorItem {
  name: string
  summa: number
  foiz: number
  color: string
}

interface DebitorskayaProps {
  date?: DateRange
  branch?: number
}

const PALETTE = [
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#ec4899",
  "#a855f7",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
  "#8b5cf6",
  "#ef4444",
]

const BRANCH_ALIASES: Record<number, string[]> = {
  2: ["ташкент", "тошкент", "tashkent", "toshkent"],
  3: ["гулистан", "гулистон", "сырдар", "сурдар", "gulistan", "sirdaryo"],
  4: ["джизак", "жиззах", "jizzax", "dzhizak"],
}

function parseNumeric(val: unknown): number {
  if (val === undefined || val === null) return 0
  if (typeof val === "number") return isNaN(val) ? 0 : val
  if (typeof val === "string") {
    const cleaned = val.replace(/\s/g, "").replace(",", ".")
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function getDebitorVal(
  apiData: StatsCard | undefined,
  type: "15" | "15_30" | "30_60" | "60_90" | "90" | "itogo"
): number {
  if (!apiData || typeof apiData !== "object") return 0

  for (const [key, value] of Object.entries(apiData)) {
    const k = key.toLowerCase().trim()
    if (!k.includes("деб")) continue

    if (type === "15" && /(?:_|\b)15$/.test(k) && !k.includes("15_30")) {
      return parseNumeric(value)
    }
    if (type === "15_30" && /(?:_|\b)15_30$/.test(k)) {
      return parseNumeric(value)
    }
    if (type === "30_60" && /(?:_|\b)30_60$/.test(k)) {
      return parseNumeric(value)
    }
    if (type === "60_90" && /(?:_|\b)60_90$/.test(k)) {
      return parseNumeric(value)
    }
    if (type === "90" && /(?:_|\b)90$/.test(k) && !k.includes("60_90")) {
      return parseNumeric(value)
    }
    if (type === "itogo" && (k.includes("итог") || k.includes("всего"))) {
      return parseNumeric(value)
    }
  }
  return 0
}

function DebitorskayaSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between h-full animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2.5 sm:pb-3 mb-3">
          <div className="h-3 w-44 bg-zinc-700/60 rounded" />
          <div className="h-2.5 w-16 bg-zinc-700/40 rounded" />
        </div>

        {/* Content Layout Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-h-44 flex-1">
          {/* Left Side: Doughnut Skeleton */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-32 h-32 rounded-full border-8 border-zinc-700/50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-4 w-12 bg-zinc-700/70 rounded" />
                <div className="h-2 w-10 bg-zinc-700/40 rounded" />
              </div>
            </div>
          </div>

          {/* Right Side: Rows Skeleton */}
          <div className="w-full flex-1 flex flex-col gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-xs bg-zinc-700/60 shrink-0" />
                  <div className="h-2.5 w-24 bg-zinc-700/60 rounded" />
                </div>
                <div className="h-2.5 w-20 bg-zinc-700/40 rounded" />
                <div className="h-2.5 w-8 bg-zinc-700/40 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DebitorskayaZadoljennost({ date, branch }: DebitorskayaProps) {
  const { data: apiData, isLongLoading, isLoading } = useData(date, branch)

  const formatSuma = (val: number) => {
    const rounded = Math.round(val)
    const isNeg = rounded < 0
    const absFormatted = Math.abs(rounded)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return isNeg ? `-${absFormatted}` : absFormatted
  }

  const { items, totalSumma, chartData } = useMemo(() => {
    if (!apiData || typeof apiData !== "object") {
      return {
        items: [],
        totalSumma: 0,
        chartData: [{ name: "Нет данных", summa: 1, foiz: 0, color: "#3f3f46" }],
      }
    }

    // 1. Check for brand-based debtor array: "Дебеторсы_ПоБрэндам", "Дебиторы_ПоБрэндам", etc.
    let brandArray: unknown[] | null = null
    for (const [key, val] of Object.entries(apiData)) {
      const kLower = key.toLowerCase()
      if (kLower.includes("деб") && Array.isArray(val) && val.length > 0) {
        brandArray = val
        break
      }
    }

    if (brandArray && brandArray.length > 0) {
      // If a specific branch is selected, check if items contain branch name/suffix
      let targetItems = brandArray
      if (branch && branch !== 1 && BRANCH_ALIASES[branch]) {
        const aliases = BRANCH_ALIASES[branch]
        const matched = brandArray.filter((item) => {
          if (!item || typeof item !== "object") return false
          const row = item as Record<string, unknown>
          const name = String(row.Категория ?? row.Брэнд ?? row.Бренд ?? row.Наименование ?? "").toLowerCase()
          return aliases.some((a) => name.includes(a))
        })
        if (matched.length > 0) {
          targetItems = matched
        }
      }

      let rawTotal = 0
      const brandItems: DebitorItem[] = []

      targetItems.forEach((item, idx) => {
        if (!item || typeof item !== "object") return
        const row = item as Record<string, unknown>
        const name = String(
          row.Категория ??
          row.Брэнд ??
          row.Бренд ??
          row.Наименование ??
          row.name ??
          row.brand ??
          row.category ??
          `Бренд ${idx + 1}`
        ).trim()
        const summa = parseNumeric(row.Сумма ?? row.summa ?? row.amount ?? row.value)
        rawTotal += summa
        brandItems.push({
          name,
          summa,
          foiz: 0,
          color: PALETTE[idx % PALETTE.length],
        })
      })

      if (rawTotal === 0 && (apiData.ДебиторскаяЗадолженность || apiData.ДебеторскаяЗадолженность)) {
        rawTotal = parseNumeric(apiData.ДебиторскаяЗадолженность ?? apiData.ДебеторскаяЗадолженность)
      }

      const calculatedItems = brandItems.map((item) => ({
        ...item,
        foiz: rawTotal !== 0 ? Math.round((item.summa / rawTotal) * 100) : 0,
      }))

      const validChartItems = calculatedItems.filter((it) => it.summa > 0)
      const fallbackChart = [{ name: "Нет данных", summa: 1, foiz: 0, color: "#3f3f46" }]

      return {
        items: calculatedItems,
        totalSumma: rawTotal,
        chartData: validChartItems.length > 0 ? validChartItems : fallbackChart,
      }
    }

    // 2. Fallback to period-based debtors
    const do15 = getDebitorVal(apiData, "15")
    const ot15do30 = getDebitorVal(apiData, "15_30")
    const ot30do60 = getDebitorVal(apiData, "30_60")
    const ot60do90 = getDebitorVal(apiData, "60_90")
    const bolee90 = getDebitorVal(apiData, "90")

    const do30 = do15 + ot15do30
    let rawTotal = do30 + ot30do60 + ot60do90 + bolee90

    if (rawTotal === 0) {
      const itogo = getDebitorVal(apiData, "itogo")
      if (itogo > 0) {
        rawTotal = itogo > 100_000 ? itogo : itogo * 1_000_000
      } else if (apiData.ДебиторскаяЗадолженность || apiData.ДебеторскаяЗадолженность) {
        rawTotal = parseNumeric(apiData.ДебиторскаяЗадолженность ?? apiData.ДебеторскаяЗадолженность)
      }
    }

    const rawItems = [
      {
        name: "До 30 дней",
        summa: do30,
        color: "#22c55e",
      },
      {
        name: "30 - 60 дней",
        summa: ot30do60,
        color: "#eab308",
      },
      {
        name: "60 - 90 дней",
        summa: ot60do90,
        color: "#f97316",
      },
      {
        name: "Более 90 дней",
        summa: bolee90,
        color: "#ef4444",
      },
    ]

    const calculatedItems: DebitorItem[] = rawItems.map((item) => ({
      ...item,
      foiz: rawTotal > 0 ? Math.round((item.summa / rawTotal) * 100) : 0,
    }))

    const validChartItems = calculatedItems.filter((item) => item.summa > 0)
    const fallbackChart = [
      {
        name: "Нет данных",
        summa: 1,
        foiz: 0,
        color: "#3f3f46",
      },
    ]

    return {
      items: calculatedItems,
      totalSumma: rawTotal,
      chartData: validChartItems.length > 0 ? validChartItems : fallbackChart,
    }
  }, [apiData, branch])

  if ((isLongLoading || isLoading) && !apiData) {
    return <DebitorskayaSkeleton />
  }

  const absTotal = Math.abs(totalSumma)
  const isNegativeTotal = totalSumma < 0
  const prefix = isNegativeTotal ? "-" : ""

  const totalFormatted =
    absTotal >= 1_000_000_000
      ? prefix + (absTotal / 1_000_000_000).toLocaleString("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : absTotal >= 1_000_000
      ? prefix + (absTotal / 1_000_000).toLocaleString("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : totalSumma.toLocaleString("ru-RU")

  const unit =
    absTotal >= 1_000_000_000
      ? "млрд сум"
      : absTotal >= 1_000_000
      ? "млн сум"
      : "сум"

  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between h-full overflow-hidden">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2.5 sm:pb-3 mb-3">
          <h2 className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ
          </h2>
          {items.length > 0 && (
            <span className="text-[10px] text-zinc-500 font-medium">
              {items.length} {items.length === 1 ? "категория" : "категорий"}
            </span>
          )}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-h-44 flex-1">
          {/* Left Side: Chart */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={64}
                  paddingAngle={chartData.length > 1 ? 1 : 0}
                  dataKey="summa"
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

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
              <span className="text-lg sm:text-xl font-extrabold text-zinc-100 leading-none">
                {totalFormatted}
              </span>
              <span className="text-[8.5px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                {unit}
              </span>
              <span className="text-[8.5px] text-zinc-500 font-medium mt-0.5 leading-none">
                всего
              </span>
            </div>
          </div>

          {/* Right Side: Data Legend Table */}
          <div className="w-full flex-1 min-w-0 flex flex-col justify-between h-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 text-[9px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5 pb-1 border-b border-zinc-800/30">
              <div className="col-span-6 truncate">КАТЕГОРИЯ</div>
              <div className="col-span-4 text-right truncate">Сумма, сум</div>
              <div className="col-span-2 text-right">%</div>
            </div>

            {/* Scrollable Items */}
            <div className="flex flex-col divide-y divide-zinc-800/15 max-h-48 sm:max-h-52 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(113,113,122,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 py-1.5 items-center hover:bg-zinc-800/20 transition-all duration-200 rounded px-1 -mx-1"
                >
                  <div className="col-span-6 flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-zinc-200 font-medium text-xs truncate" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-4 text-right text-zinc-300 font-mono text-xs font-semibold">
                    {formatSuma(item.summa)}
                  </div>
                  <div className="col-span-2 text-right text-zinc-400 font-mono text-xs font-medium">
                    {item.foiz}%
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            {items.length > 0 && (
              <div className="grid grid-cols-12 gap-2 py-1.5 mt-1 border-t border-zinc-800/60 font-semibold items-center">
                <div className="col-span-6 text-zinc-300 font-semibold text-[11px] uppercase tracking-wide">
                  ИТОГО
                </div>
                <div className="col-span-4 text-right text-zinc-100 font-mono text-xs font-bold">
                  {formatSuma(totalSumma)}
                </div>
                <div className="col-span-2 text-right text-zinc-400 font-mono text-xs font-bold">
                  100%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
