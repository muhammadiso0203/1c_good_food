import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"
import { Loader2 } from "lucide-react"

interface CreditorItem {
  period: string
  summa: number
  foiz: number
  color: string
  bgKlass: string
}

interface CreditorskayaProps {
  date?: DateRange
  branch?: number
}

function parseNumeric(val: any): number {
  if (val === undefined || val === null) return 0
  if (typeof val === "number") return isNaN(val) ? 0 : val
  if (typeof val === "string") {
    const cleaned = val.replace(/\s/g, "").replace(",", ".")
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function getCreditorVal(
  apiData: any,
  type: "15" | "15_30" | "30_60" | "60_90" | "90" | "itogo"
): number {
  if (!apiData || typeof apiData !== "object") return 0

  for (const [key, value] of Object.entries(apiData)) {
    const k = key.toLowerCase().trim()
    if (!k.includes("кредитор")) continue

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

export function CreditorskayaZadoljennost({ date, branch }: CreditorskayaProps) {
  const { data: apiData, isLoading } = useData(date, branch)

  const formatSuma = (val: number) => {
    return Math.round(val)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const { items, totalSumma, chartData } = useMemo(() => {
    const do15 = getCreditorVal(apiData, "15")
    const ot15do30 = getCreditorVal(apiData, "15_30")
    const ot30do60 = getCreditorVal(apiData, "30_60")
    const ot60do90 = getCreditorVal(apiData, "60_90")
    const bolee90 = getCreditorVal(apiData, "90")

    const do30 = do15 + ot15do30
    let rawTotal = do30 + ot30do60 + ot60do90 + bolee90

    // Agar har bir davr 0 bo'lsa-yu, lekin Itogo mavjud bo'lsa
    if (rawTotal === 0) {
      const itogo = getCreditorVal(apiData, "itogo")
      if (itogo > 0) {
        rawTotal = itogo > 100_000 ? itogo : itogo * 1_000_000
      }
    }

    const rawItems = [
      {
        period: "До 30 дней",
        summa: do30,
        color: "#22c55e",
        bgKlass: "bg-emerald-500",
      },
      {
        period: "30 - 60 дней",
        summa: ot30do60,
        color: "#eab308",
        bgKlass: "bg-yellow-500",
      },
      {
        period: "60 - 90 дней",
        summa: ot60do90,
        color: "#f97316",
        bgKlass: "bg-orange-500",
      },
      {
        period: "Более 90 дней",
        summa: bolee90,
        color: "#ef4444",
        bgKlass: "bg-red-500",
      },
    ]

    const calculatedItems: CreditorItem[] = rawItems.map((item) => ({
      ...item,
      foiz: rawTotal > 0 ? Math.round((item.summa / rawTotal) * 100) : 0,
    }))

    const validChartItems = calculatedItems.filter((item) => item.summa > 0)
    const fallbackChart = [
      {
        period: "Нет данных",
        summa: 1,
        foiz: 0,
        color: "#3f3f46",
        bgKlass: "bg-zinc-700",
      },
    ]

    return {
      items: calculatedItems,
      totalSumma: rawTotal,
      chartData: validChartItems.length > 0 ? validChartItems : fallbackChart,
    }
  }, [apiData])


  const totalFormatted =
    totalSumma >= 1_000_000_000
      ? (totalSumma / 1_000_000_000).toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : (totalSumma / 1_000_000).toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

  const unit = totalSumma >= 1_000_000_000 ? "млрд сум" : "млн сум"

  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col justify-between h-full relative">
        {/* Header Title */}
        <div className="mb-3.5 pb-2.5 sm:mb-4 sm:pb-3 border-b border-zinc-800/40 flex items-center justify-between">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            КРЕДИТОРСКАЯ ЗАДОЛЖЕННОСТЬ
          </h2>
          {isLoading && !apiData && (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-500" />
          )}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-h-44 flex-1">
          {/* Left Side: Chart and Button */}
          <div className="flex flex-col items-center shrink-0">
            {/* Doughnut Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={0}
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
                <span className="text-[9px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                  {unit}
                </span>
                <span className="text-[9px] text-zinc-500 font-medium mt-0.5 leading-none">
                  всего
                </span>
              </div>
            </div>

            {/* Подробнее Button */}
            <button className="mt-3 px-5 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-zinc-100 text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer">
              Подробнее
            </button>
          </div>

          {/* Right Side: Data Legend */}
          <div className="w-full flex-1 flex flex-col justify-center gap-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                {/* Color Box */}
                <span
                  className={`w-3 h-3 rounded-[2px] shrink-0 mt-0.5 ${item.bgKlass}`}
                />

                {/* Info */}
                <div className="flex flex-col leading-tight">
                  <span className="text-zinc-300 text-xs font-normal">
                    {item.period}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-zinc-100 text-xs font-semibold">
                      {formatSuma(item.summa)}
                    </span>
                    <span className="text-zinc-400 text-xs font-normal">
                      ({item.foiz}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

