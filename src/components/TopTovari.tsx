import { useMemo } from "react"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"

interface ProductSaleItem {
  name: string
  value: number
}

interface TopTovariProps {
  date?: DateRange
  branch?: number
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

function TopTovariSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between h-full animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2.5 mb-2.5">
          <div className="h-3 w-48 bg-zinc-700/60 rounded" />
          <div className="h-2.5 w-16 bg-zinc-700/40 rounded" />
        </div>

        {/* Labels for columns */}
        <div className="grid grid-cols-12 gap-3 mb-2 border-b border-zinc-800/20 pb-1">
          <div className="col-span-5 h-2 w-14 bg-zinc-700/40 rounded" />
          <div className="col-span-4 h-2 w-16 bg-zinc-700/40 rounded mx-auto" />
          <div className="col-span-3 flex justify-end">
            <div className="h-2 w-16 bg-zinc-700/40 rounded" />
          </div>
        </div>

        {/* List skeleton */}
        <div className="flex flex-col gap-1.5 flex-1 justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-3 items-center rounded-lg px-2 py-1 bg-zinc-800/10"
            >
              <div className="col-span-5 flex items-center gap-2 min-w-0">
                <div className="w-4 h-4 rounded bg-zinc-700/60 shrink-0" />
                <div className="h-2.5 w-28 bg-zinc-700/50 rounded" />
              </div>
              <div className="col-span-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-900/40 rounded-full"
                  style={{ width: `${Math.max(15, 100 - i * 9)}%` }}
                />
              </div>
              <div className="col-span-3 flex justify-end">
                <div className="h-2.5 w-16 bg-zinc-700/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TopTovari({ date, branch }: TopTovariProps) {
  const { data: apiData, isLongLoading, isLoading } = useData(date, branch)

  const data: ProductSaleItem[] = useMemo(() => {
    if (!apiData) return []

    // 1. Check array format
    for (const [key, val] of Object.entries(apiData)) {
      const kLower = key.toLowerCase()
      if (
        (kLower.includes("топ10") ||
          kLower.includes("топ_10") ||
          kLower.includes("топтоваров")) &&
        Array.isArray(val) &&
        val.length > 0
      ) {
        return val
          .map((row) => {
            const r = row as Record<string, unknown>
            const name = String(
              r.Товар ??
                r.Наименование ??
                r.Номенклатура ??
                r.name ??
                r.product ??
                ""
            ).trim()
            const value = parseNumeric(
              r.Сумма ?? r.summa ?? r.Продажи ?? r.amount ?? r.value
            )
            return { name, value }
          })
          .filter((it) => it.name && it.value > 0)
      }
    }

    // 2. Check flat keys format
    const extracted: { rank: number; name: string; value: number }[] = []

    for (const key in apiData) {
      const match =
        key.match(/^Топ10Товаров(?:По)?Пр[о]?дажам_(\d+)_(.*)$/i) ||
        key.match(/^Топ10Товаров.*?(\d+)_(.*)$/i)
      if (match) {
        const rank = parseInt(match[1], 10)
        const rawName = match[2]
        const name = rawName
          .replace(/^_+/, "")
          .replace(/_+$/, "")
          .replace(/__/g, " ")
          .replace(/_/g, " ")
          .replace(/\s+/g, " ")
          .trim()
        const rawVal = (apiData as Record<string, unknown>)[key]
        const value = parseNumeric(rawVal)
        extracted.push({ rank, name, value })
      }
    }

    extracted.sort((a, b) => a.rank - b.rank)
    return extracted.map((item) => ({ name: item.name, value: item.value }))
  }, [apiData])

  const maxValue = useMemo(() => {
    if (data.length === 0) return 1
    return Math.max(...data.map((item) => item.value))
  }, [data])

  if ((isLongLoading || isLoading) && data.length === 0) {
    return <TopTovariSkeleton />
  }

  const formatSuma = (val: number) => {
    return Math.round(val)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs"
    }
    if (rank === 2) {
      return "bg-slate-400/20 text-slate-200 border border-slate-400/40"
    }
    if (rank === 3) {
      return "bg-amber-700/20 text-amber-400 border border-amber-700/40"
    }
    return "bg-zinc-800/80 text-zinc-400 border border-zinc-700/40"
  }

  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between h-full overflow-hidden">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2.5 mb-2.5">
          <h2 className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ТОП 10 ТОВАРОВ ПО ПРОДАЖАМ (МЕСЯЦ)
          </h2>
          {data.length > 0 && (
            <span className="text-[10px] text-zinc-500 font-medium">
              {Math.min(data.length, 10)} товаров
            </span>
          )}
        </div>

        {/* Labels for columns */}
        <div className="grid grid-cols-12 gap-3 text-[9px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5 pb-1 border-b border-zinc-800/20">
          <div className="col-span-5 truncate">ТОВАР</div>
          <div className="col-span-4 text-center truncate">ДИАГРАММА</div>
          <div className="col-span-3 text-right truncate">ПРОДАЖИ, СУМ</div>
        </div>

        {/* List of items */}
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(113,113,122,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {data.slice(0, 10).map((item, index) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0
            const rank = index + 1

            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center rounded-lg px-1.5 py-1 hover:bg-zinc-800/30 transition-all duration-150"
              >
                {/* Rank and Name */}
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <span
                    className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center shrink-0 font-mono ${getRankBadge(
                      rank
                    )}`}
                  >
                    {rank}
                  </span>
                  <span
                    className="text-zinc-200 font-medium text-xs truncate"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Gradient Progress Bar */}
                <div className="col-span-4 flex items-center">
                  <div className="w-full bg-zinc-900/80 h-2 rounded-full overflow-hidden border border-zinc-800/60 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-700 ease-out shadow-xs"
                      style={{ width: `${Math.max(4, percentage)}%` }}
                    />
                  </div>
                </div>

                {/* Value */}
                <div className="col-span-3 text-right text-zinc-100 font-mono font-semibold text-xs truncate">
                  {formatSuma(item.value)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
