import { useMemo } from "react"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"

export interface FilialSavdo {
  id?: string
  nomi: string
  bugun: number
  oy: number
  reja: number
  bajarilish: number
}

interface FiliallarSavdosiProps {
  date?: DateRange
  branch?: number
}

const BRANCH_CONFIG: Record<string, { name: string; order: number }> = {
  "3": { name: "Гулистон", order: 1 },
  "2": { name: "Ташкент", order: 2 },
  "4": { name: "Джизак", order: 3 },
  "сырдарья": { name: "Гулистон", order: 1 },
  "гулистон": { name: "Гулистон", order: 1 },
  "ташкент": { name: "Ташкент", order: 2 },
  "джизак": { name: "Джизак", order: 3 },
}

const defaultFallbackData: FilialSavdo[] = [
  {
    id: "3",
    nomi: "Гулистон",
    bugun: 625450000,
    oy: 12450800000,
    reja: 14500000000,
    bajarilish: 86,
  },
  {
    id: "2",
    nomi: "Ташкент",
    bugun: 298120000,
    oy: 6102400000,
    reja: 7500000000,
    bajarilish: 81,
  },
  {
    id: "4",
    nomi: "Джизак",
    bugun: 187330000,
    oy: 4221600000,
    reja: 5000000000,
    bajarilish: 84,
  },
]

function FiliallarSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full flex flex-col justify-between animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40">
          <div className="h-3 w-44 bg-zinc-700/60 rounded" />
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto -mx-1 sm:mx-0 flex-1">
          <table className="w-full min-w-110 border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/30 pb-2">
                <th className="py-2.5 px-2"><div className="h-2.5 w-16 bg-zinc-700/40 rounded" /></th>
                <th className="py-2.5 px-2"><div className="h-2.5 w-20 bg-zinc-700/40 rounded ml-auto" /></th>
                <th className="py-2.5 px-2"><div className="h-2.5 w-20 bg-zinc-700/40 rounded ml-auto" /></th>
                <th className="py-2.5 px-2"><div className="h-2.5 w-18 bg-zinc-700/40 rounded ml-auto" /></th>
                <th className="py-2.5 px-2"><div className="h-2.5 w-24 bg-zinc-700/40 rounded ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/20">
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td className="py-3 px-2"><div className="h-3 w-20 bg-zinc-700/60 rounded" /></td>
                  <td className="py-3 px-2"><div className="h-3 w-20 bg-zinc-700/50 rounded ml-auto" /></td>
                  <td className="py-3 px-2"><div className="h-3 w-22 bg-zinc-700/50 rounded ml-auto" /></td>
                  <td className="py-3 px-2"><div className="h-3 w-22 bg-zinc-700/40 rounded ml-auto" /></td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-3 w-8 bg-zinc-700/50 rounded" />
                      <div className="w-16 sm:w-20 bg-zinc-700/40 h-2.5 sm:h-3 rounded-sm" />
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-zinc-800/60">
                <td className="py-3 px-2"><div className="h-3 w-16 bg-zinc-700/70 rounded" /></td>
                <td className="py-3 px-2"><div className="h-3 w-22 bg-zinc-700/60 rounded ml-auto" /></td>
                <td className="py-3 px-2"><div className="h-3 w-24 bg-zinc-700/60 rounded ml-auto" /></td>
                <td className="py-3 px-2"><div className="h-3 w-24 bg-zinc-700/50 rounded ml-auto" /></td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-3 w-8 bg-zinc-700/60 rounded" />
                    <div className="w-16 sm:w-20 bg-emerald-950/40 h-2.5 sm:h-3 rounded-sm" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function FiliallarSavdosi({ date, branch }: FiliallarSavdosiProps) {
  const { data: apiData, isLoading } = useData(date, branch)

  const parseNum = (s?: string | number): number => {
    if (typeof s === "number") return isNaN(s) ? 0 : s
    if (!s) return 0
    const cleaned = String(s).replace(/\s/g, "").replace(",", ".")
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }

  const items: FilialSavdo[] = useMemo(() => {
    if (!apiData) return defaultFallbackData

    const parsedBranches: FilialSavdo[] = []

    for (const [key, val] of Object.entries(apiData)) {
      if (key.toLowerCase().startsWith("продажипофилиалам_")) {
        const idOrName = key.replace(/^ПродажиПоФилиалам_/i, "").trim()
        const config = BRANCH_CONFIG[idOrName] || BRANCH_CONFIG[idOrName.toLowerCase()]
        const branchName = config?.name || (idOrName.match(/^\d+$/) ? `Филиал ${idOrName}` : idOrName.replace(/_/g, " "))

        if (typeof val === "string") {
          const parts = val.split("_")
          const bugun = parseNum(parts[0])
          const oy = parseNum(parts[1])
          const reja = parseNum(parts[2])
          let bajarilish = parseNum(parts[3])

          if (bajarilish === 0 && reja > 0 && oy > 0) {
            bajarilish = Math.round((oy / reja) * 100)
          }

          parsedBranches.push({
            id: idOrName,
            nomi: branchName,
            bugun,
            oy,
            reja,
            bajarilish,
          })
        }
      }
    }

    if (parsedBranches.length === 0) {
      return defaultFallbackData
    }

    return parsedBranches.sort((a, b) => {
      const orderA = a.id && BRANCH_CONFIG[a.id]?.order ? BRANCH_CONFIG[a.id].order : 99
      const orderB = b.id && BRANCH_CONFIG[b.id]?.order ? BRANCH_CONFIG[b.id].order : 99
      return orderA - orderB
    })
  }, [apiData])

  const jamiBugun = useMemo(() => items.reduce((sum, item) => sum + item.bugun, 0), [items])
  const jamiOy = useMemo(() => items.reduce((sum, item) => sum + item.oy, 0), [items])
  const jamiReja = useMemo(() => items.reduce((sum, item) => sum + item.reja, 0), [items])
  const jamiBajarilish = useMemo(() => {
    if (jamiReja > 0) {
      return Math.round((jamiOy / jamiReja) * 100)
    }
    const withPercent = items.filter((i) => i.bajarilish > 0)
    if (withPercent.length > 0) {
      return Math.round(withPercent.reduce((s, i) => s + i.bajarilish, 0) / withPercent.length)
    }
    return 0
  }, [items, jamiOy, jamiReja])

  if (isLoading && !apiData) {
    return <FiliallarSkeleton />
  }

  const formatSuma = (val: number) => {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const getRangKlassi = (foiz: number) => {
    if (foiz >= 84) {
      return {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
      }
    }
    if (foiz >= 50) {
      return {
        text: "text-amber-500",
        bg: "bg-amber-500",
      }
    }
    if (foiz > 0) {
      return {
        text: "text-rose-500",
        bg: "bg-rose-500",
      }
    }
    return {
      text: "text-zinc-500",
      bg: "bg-zinc-600",
    }
  }

  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full flex flex-col justify-between overflow-hidden">
        {/* Sarlavha qismi */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ПРОДАЖИ ПО ФИЛИАЛАМ
          </h2>
        </div>

        {/* Jadval qismi */}
        <div className="overflow-x-auto -mx-1 sm:mx-0 flex-1">
          <table className="w-full min-w-110 border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/30 text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="py-2.5 px-2">ФИЛИАЛ</th>
                <th className="py-2.5 px-2 text-right">СЕГОДНЯ, СУМ</th>
                <th className="py-2.5 px-2 text-right">МЕСЯЦ, СУМ</th>
                <th className="py-2.5 px-2 text-right">ПЛАН, СУМ</th>
                <th className="py-2.5 px-2 text-right">ВЫПОЛНЕНИЕ, %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/20 text-xs">
              {items.map((item, idx) => {
                const rang = getRangKlassi(item.bajarilish)
                const clampedFoiz = Math.min(Math.max(item.bajarilish, 0), 100)
                return (
                  <tr
                    key={item.id || idx}
                    className="hover:bg-zinc-800/20 transition-colors duration-200"
                  >
                    <td className="py-2.5 px-2 text-zinc-200 font-medium">
                      {item.nomi}
                    </td>
                    <td className="py-2.5 px-2 text-right text-zinc-300 font-mono text-[11px] sm:text-xs">
                      {formatSuma(item.bugun)}
                    </td>
                    <td className="py-2.5 px-2 text-right text-zinc-300 font-mono text-[11px] sm:text-xs">
                      {formatSuma(item.oy)}
                    </td>
                    <td className="py-2.5 px-2 text-right text-zinc-400 font-mono text-[11px] sm:text-xs">
                      {formatSuma(item.reja)}
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`text-xs w-8 text-right font-medium ${rang.text}`}>
                          {item.bajarilish}%
                        </span>
                        <div className="w-16 sm:w-20 bg-gray-700/80 h-2.5 sm:h-3 rounded-sm overflow-hidden shrink-0 border border-zinc-800/60">
                          <div
                            className={`h-full rounded-sm transition-all duration-500 ${rang.bg}`}
                            style={{ width: `${clampedFoiz}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {/* JAMI satri */}
              <tr className="bg-zinc-800/10 border-t-2 border-zinc-800/60 font-semibold">
                <td className="py-2.5 px-2 text-zinc-100 uppercase text-[11px] font-bold tracking-wider">
                  ИТОГО
                </td>
                <td className="py-2.5 px-2 text-right text-zinc-100 font-mono text-[11px] sm:text-xs tracking-tight">
                  {formatSuma(jamiBugun)}
                </td>
                <td className="py-2.5 px-2 text-right text-zinc-100 font-mono text-[11px] sm:text-xs tracking-tight">
                  {formatSuma(jamiOy)}
                </td>
                <td className="py-2.5 px-2 text-right text-zinc-400 font-mono text-[11px] sm:text-xs tracking-tight">
                  {formatSuma(jamiReja)}
                </td>
                <td className="py-2.5 px-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-xs w-8 text-right font-bold ${getRangKlassi(jamiBajarilish).text}`}>
                      {jamiBajarilish}%
                    </span>
                    <div className="w-16 sm:w-20 bg-gray-700/80 h-2.5 sm:h-3 rounded-sm overflow-hidden shrink-0 border border-zinc-800/60">
                      <div
                        className={`h-full rounded-sm transition-all duration-500 ${getRangKlassi(jamiBajarilish).bg}`}
                        style={{ width: `${Math.min(Math.max(jamiBajarilish, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
