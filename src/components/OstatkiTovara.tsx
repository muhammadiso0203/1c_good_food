import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"

interface BrandItem {
  name: string
  ostatok: number // in sum
  foiz: number    // in percent
  color: string   // hex code
  bgKlass: string // tailwind color utility for bullet
}

interface OstatkiTovaraProps {
  date?: DateRange
  branch?: number
}

interface BranchConfig {
  id: number
  nomi: string
  aliases: string[]
}

const BRAND_PALETTE = [
  { color: "#3b82f6", bgKlass: "bg-blue-500" },
  { color: "#10b981", bgKlass: "bg-emerald-500" },
  { color: "#f59e0b", bgKlass: "bg-amber-500" },
  { color: "#8b5cf6", bgKlass: "bg-purple-500" },
  { color: "#ec4899", bgKlass: "bg-pink-500" },
  { color: "#06b6d4", bgKlass: "bg-cyan-500" },
  { color: "#f97316", bgKlass: "bg-orange-500" },
  { color: "#14b8a6", bgKlass: "bg-teal-500" },
  { color: "#6366f1", bgKlass: "bg-indigo-500" },
  { color: "#a855f7", bgKlass: "bg-violet-500" },
]

const BRANCH_CONFIGS: BranchConfig[] = [
  {
    id: 2,
    nomi: "Ташкент",
    aliases: ["ташкент", "тошкент", "tashkent", "toshkent", "2"],
  },
  {
    id: 3,
    nomi: "Гулистан",
    aliases: ["гулистан", "гулистон", "сырдар", "сурдар", "gulistan", "guliston", "sirdaryo", "сирдарё", "сирдарья", "3"],
  },
  {
    id: 4,
    nomi: "Джизак",
    aliases: ["джизак", "жиззах", "jizzax", "dzhizak", "4"],
  },
]

function stripBranchFromName(rawName: string): string {
  if (!rawName) return ""
  return rawName
    .replace(/[-_(\s]+(?:Ташкент|Тошкент|Tashkent|Toshkent|Гулистан|Гулистон|Сырдарья|Сырдар|Gulistan|Guliston|Джизак|Жиззах|Jizzax|Dzhizak)[-_).\s]*$/i, "")
    .replace(/^(?:Ташкент|Тошкент|Tashkent|Toshkent|Гулистан|Гулистон|Сырдарья|Сырдар|Gulistan|Guliston|Джизак|Жиззах|Jizzax|Dzhizak)[-_)\s]+/i, "")
    .replace(/[-_()]+$/, "")
    .trim()
}

function getBranchFromRow(row: Record<string, unknown>, rawName: string): number | null {
  const branchVal =
    row.ID ?? row.id ?? row.Филиал ?? row.filial ?? row.Filial ??
    row.Регион ?? row.region ?? row.Region ?? row.Склад ?? row.warehouse ??
    row.branchId ?? row.BranchID ?? row.branch ?? row.Branch

  if (branchVal !== undefined && branchVal !== null && branchVal !== "") {
    const num = Number(branchVal)
    if (!isNaN(num) && [2, 3, 4].includes(num)) return num
    const str = String(branchVal).toLowerCase().trim()
    for (const b of BRANCH_CONFIGS) {
      if (b.aliases.some((a) => str === a || str.includes(a))) return b.id
    }
  }

  const s = rawName.toLowerCase().trim()
  for (const b of BRANCH_CONFIGS) {
    if (b.aliases.filter((a) => a.length > 2).some((a) => s.includes(a))) return b.id
  }

  return null
}

function parseNum(val: unknown): number {
  if (val === undefined || val === null) return 0
  if (typeof val === "number") return isNaN(val) ? 0 : val
  const str = String(val).replace(/\s/g, "").replace(",", ".")
  const parsed = parseFloat(str)
  return isNaN(parsed) ? 0 : parsed
}

function OstatkiSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full flex flex-col justify-between animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40">
          <div className="h-3 w-48 bg-zinc-700/60 rounded" />
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

          {/* Table Skeleton */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-12 gap-2 mb-2 pb-2 border-b border-zinc-800/30">
              <div className="col-span-6 h-2.5 w-16 bg-zinc-700/40 rounded" />
              <div className="col-span-4 flex justify-end">
                <div className="h-2.5 w-20 bg-zinc-700/40 rounded" />
              </div>
              <div className="col-span-2 flex justify-end">
                <div className="h-2.5 w-6 bg-zinc-700/40 rounded" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-2 py-1 items-center">
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-zinc-700/60 shrink-0" />
                    <div className="h-2.5 w-24 bg-zinc-700/50 rounded" />
                  </div>
                  <div className="col-span-4 flex justify-end">
                    <div className="h-2.5 w-20 bg-zinc-700/60 rounded" />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <div className="h-2.5 w-8 bg-zinc-700/40 rounded" />
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 py-2 mt-1 border-t border-zinc-800/40 items-center">
                <div className="col-span-6 h-2.5 w-12 bg-zinc-700/50 rounded" />
                <div className="col-span-4 flex justify-end">
                  <div className="h-2.5 w-20 bg-zinc-700/60 rounded" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="h-2.5 w-8 bg-zinc-700/40 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OstatkiTovara({ date, branch }: OstatkiTovaraProps) {
  const { data: apiData, isLoading } = useData(date, branch)

  const brandData: BrandItem[] = useMemo(() => {
    const rawItems: Array<{
      rawName: string
      sum: number
      percent: number
      itemBranch: number | null
    }> = []

    if (apiData && typeof apiData === "object") {
      // 1. Array-based extraction from apiData
      for (const [k, v] of Object.entries(apiData)) {
        const kLower = k.toLowerCase()
        if (
          Array.isArray(v) &&
          (kLower.includes("остат") ||
            kLower.includes("брэнд") ||
            kLower.includes("бренд") ||
            kLower.includes("brand") ||
            kLower.includes("товар") ||
            kLower === "items" ||
            kLower === "data") &&
          !kLower.includes("статус") &&
          !kLower.includes("динамик") &&
          !kLower.includes("деньги") &&
          !kLower.includes("топ10") &&
          !kLower.includes("топ") &&
          !kLower.includes("неликвид")
        ) {
          for (const item of v) {
            if (item && typeof item === "object") {
              const row = item as Record<string, unknown>
              const name = String(
                row.БРЭНД ?? row.Бренд ?? row.брэнд ?? row.бренд ?? row.Brand ?? row.brand ??
                row.brand_name ?? row.brandName ?? row.Brend ?? row.brend ??
                row.Марка ?? row.марка ?? row.Производитель ?? row.производитель ??
                row.Группа ?? row.группа ?? row.Категория ?? row.категория ??
                row.Товар ?? row.товар ?? row.Наименование ?? row.наименование ??
                row.ТоварНаименование ?? row.Номенклатура ?? row.номенклатура ??
                row.name ?? row.Name ?? row.title ?? row.label ?? row.Nomi ?? row.nomi ?? ""
              ).trim()

              let sum = parseNum(
                row.Сумма ?? row.summa ?? row.Summa ?? row.sum ?? row.Sum ??
                row.Остаток ?? row.ostatok ?? row.Ostatok ?? row.amount ?? row.Amount ??
                row.value ?? row.Value ?? row.СуммаОстатка ?? row.сумма_остатка ??
                row.Стоимость ?? row.стоимость ?? row.Cost ?? row.cost ??
                row.Итого ?? row.итого ?? row.Total ?? row.total
              )

              let percent = parseNum(
                row.Процент ?? row.процент ?? row.percent ?? row.Percent ??
                row.Foiz ?? row.foiz ?? row.Доля ?? row.доля ?? row.share ?? row.Share
              )

              if (typeof row.Сумма === "string" && row.Сумма.includes("_")) {
                const parts = row.Сумма.split("_")
                const parsedSum = parseNum(parts[0])
                const parsedPercent = parseNum(parts[1])
                if (parsedSum > 0) sum = parsedSum
                if (parsedPercent > 0 && percent === 0) percent = parsedPercent
              }
              if (typeof row.Остаток === "string" && row.Остаток.includes("_")) {
                const parts = row.Остаток.split("_")
                const parsedSum = parseNum(parts[0])
                const parsedPercent = parseNum(parts[1])
                if (parsedSum > 0) sum = parsedSum
                if (parsedPercent > 0 && percent === 0) percent = parsedPercent
              }

              if (name && (sum > 0 || percent > 0)) {
                const itemBranch = getBranchFromRow(row, name)
                rawItems.push({ rawName: name, sum, percent, itemBranch })
              }
            }
          }
        }
      }

      // 2. Flat keys fallback if no array items found
      if (rawItems.length === 0) {
        for (const [key, value] of Object.entries(apiData)) {
          const kLower = key.toLowerCase()
          if (
            (kLower.startsWith("остаткипобрэндам_") ||
              kLower.startsWith("остаткипобрендам_") ||
              kLower.startsWith("остатки_бренд_") ||
              kLower.startsWith("остатки_брэнд_") ||
              kLower.startsWith("бренд_") ||
              kLower.startsWith("брэнд_") ||
              kLower.startsWith("brand_") ||
              kLower.startsWith("остатокпобренду_") ||
              kLower.startsWith("остатокпобрэнду_") ||
              (kLower.includes("бренд") && !kLower.includes("статус") && !kLower.includes("топ"))) &&
            !kLower.includes("динамик") &&
            !kLower.includes("статусостатков")
          ) {
            const cleanKeyName = key
              .replace(/^(?:ОстаткиПоБрэндам_|ОстаткиПоБрендам_|Остатки_Бренд_|Остатки_Брэнд_|Бренд_|Брэнд_|Brand_|ОстатокПоБренду_|ОстатокПоБрэнду_)/i, "")
              .replace(/^(\d+)_/i, "")
              .replace(/_+/g, " ")
              .trim()

            let sum = 0
            let percent = 0
            if (typeof value === "string") {
              const parts = value.split("_")
              sum = parseNum(parts[0])
              percent = parts.length > 1 ? parseNum(parts[1]) : 0
            } else {
              sum = parseNum(value)
            }

            if (cleanKeyName && (sum > 0 || percent > 0)) {
              const itemBranch = getBranchFromRow({}, key)
              rawItems.push({ rawName: cleanKeyName, sum, percent, itemBranch })
            }
          }
        }
      }
    }

    // 3. Smart Branch Filtering
    let filteredItems: typeof rawItems = []

    if (branch && branch !== 1) {
      // A. Check if any items explicitly match the selected branch (e.g. 3 for Guliston)
      const exactMatches = rawItems.filter((item) => item.itemBranch === branch)

      if (exactMatches.length > 0) {
        filteredItems = exactMatches
      } else {
        // B. If items don't have explicit branch tags (backend was queried with ID: branchId),
        // include items that do NOT explicitly belong to another known branch
        const nonConflicting = rawItems.filter(
          (item) => item.itemBranch === null || item.itemBranch === branch
        )
        filteredItems = nonConflicting.length > 0 ? nonConflicting : rawItems
      }
    } else {
      filteredItems = rawItems
    }

    // 4. Clean brand names (remove branch parts) and aggregate
    const aggregatedMap = new Map<string, { sum: number; percent: number }>()

    for (const item of filteredItems) {
      const cleanName = stripBranchFromName(item.rawName) || item.rawName
      const existing = aggregatedMap.get(cleanName)
      if (existing) {
        existing.sum += item.sum
        existing.percent += item.percent
      } else {
        aggregatedMap.set(cleanName, { sum: item.sum, percent: item.percent })
      }
    }

    const aggregatedList = Array.from(aggregatedMap.entries()).map(([name, val]) => ({
      name,
      sum: val.sum,
      percent: val.percent,
    }))

    // Sort descending by amount
    aggregatedList.sort((a, b) => b.sum - a.sum)

    const totalSum = aggregatedList.reduce((s, i) => s + i.sum, 0)

    return aggregatedList.map((item, idx) => {
      const pal = BRAND_PALETTE[idx % BRAND_PALETTE.length]
      const computedPercent =
        totalSum > 0 ? Number(((item.sum / totalSum) * 100).toFixed(1)) : item.percent
      return {
        name: item.name,
        ostatok: Math.round(item.sum),
        foiz: computedPercent,
        color: pal.color,
        bgKlass: pal.bgKlass,
      }
    })
  }, [apiData, branch])

  const totalOstatok = useMemo(() => {
    return brandData.reduce((sum, item) => sum + item.ostatok, 0)
  }, [brandData])

  const chartData = useMemo(() => {
    if (brandData.length === 0) {
      return [{ name: "Нет данных", value: 1, color: "#374151" }]
    }
    return brandData.map((b) => ({
      name: b.name,
      value: b.ostatok,
      color: b.color,
    }))
  }, [brandData])

  const mainBrand = useMemo(() => {
    if (brandData.length === 0) return null
    return brandData.reduce((max, item) => (item.ostatok > max.ostatok ? item : max), brandData[0])
  }, [brandData])

  if (isLoading && !apiData) {
    return <OstatkiSkeleton />
  }

  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full flex flex-col justify-between overflow-hidden">
        {/* Header Title */}
        <div className="mb-4 pb-2.5 sm:mb-5 sm:pb-3 border-b border-zinc-800/40 flex items-center justify-between">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ОСТАТКИ ТОВАРА ПО БРЭНДАМ
          </h2>
          {brandData.length > 0 && (
            <span className="text-[10px] font-semibold text-zinc-500 font-mono">
              {brandData.length} брэндов
            </span>
          )}
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
                  paddingAngle={chartData.length > 1 ? 1 : 0}
                  dataKey="value"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
              <span className="text-base sm:text-lg font-black text-zinc-100 leading-none">
                {(totalOstatok / 1000000000).toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-[8px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                млрд сум
              </span>
              <span className="text-[8px] text-zinc-400 font-medium mt-0.5 truncate max-w-20">
                {mainBrand ? mainBrand.name.split("-")[0] : "всего"}
              </span>
            </div>
          </div>

          {/* Right Side: Data Legend Table */}
          <div className="w-full flex-1 min-w-0">
            {/* Headers */}
            <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2 pb-1.5 border-b border-zinc-800/30">
              <div className="col-span-6 truncate">БРЭНД</div>
              <div className="col-span-4 text-right">Остаток, сум</div>
              <div className="col-span-2 text-right">%</div>
            </div>

            {/* Rows list (scrollable if > 4 items) */}
            <div className="flex flex-col divide-y divide-zinc-800/10 max-h-48 sm:max-h-52 overflow-y-auto pr-1.5 custom-scrollbar">
              {brandData.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-zinc-800/20 transition-all duration-200 rounded px-1 -mx-1"
                >
                  <div className="col-span-6 flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${item.bgKlass}`} />
                    <span className="text-zinc-200 font-medium text-[11px] sm:text-xs truncate" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-4 text-right text-zinc-300 font-mono text-[11px] sm:text-xs">
                    {formatSuma(item.ostatok)}
                  </div>
                  <div className="col-span-2 text-right text-zinc-400 font-mono text-[11px] sm:text-xs font-semibold">
                    {item.foiz}%
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-12 gap-2 py-2 mt-1.5 border-t border-zinc-800/60 font-semibold items-center">
              <div className="col-span-6 text-zinc-300 font-semibold text-[11px] uppercase tracking-wide">
                ИТОГО
              </div>
              <div className="col-span-4 text-right text-zinc-100 font-mono text-xs font-bold">
                {formatSuma(totalOstatok)}
              </div>
              <div className="col-span-2 text-right text-zinc-400 font-mono text-xs font-bold">
                100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
