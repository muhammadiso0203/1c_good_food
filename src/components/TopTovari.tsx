import { useMemo } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"
import { Loader2 } from "lucide-react"

interface ProductSaleItem {
  name: string
  value: number
}

interface TopTovariProps {
  date?: DateRange
  branch?: number
}

export function TopTovari({ date, branch }: TopTovariProps) {

  const { data: apiData, isLoading } = useData(date, branch)


  const data: ProductSaleItem[] = useMemo(() => {
    if (!apiData) return []

    const extracted: { rank: number; name: string; value: number }[] = []

    for (const key in apiData) {
      const match = key.match(/^Топ10ТоваровПоПрдажам_(\d+)_(.*)$/i)
      if (match) {
        const rank = parseInt(match[1], 10)
        let rawName = match[2]
        // Clean up underscores and extra spaces from dynamic backend keys
        let name = rawName
          .replace(/^_+/, "")
          .replace(/_+$/, "")
          .replace(/__/g, " ")
          .replace(/_/g, " ")
          .replace(/\s+/g, " ")
          .trim()
        const rawVal = apiData[key]
        const value = typeof rawVal === "number" ? rawVal : parseFloat(String(rawVal).replace(/\s/g, "").replace(",", ".")) || 0
        extracted.push({ rank, name, value })
      }
    }

    extracted.sort((a, b) => a.rank - b.rank)
    return extracted.map((item) => ({ name: item.name, value: item.value }))
  }, [apiData])


  const formatSuma = (val: number) => {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const maxValue = useMemo(() => {
    if (data.length === 0) return 1
    return Math.max(...data.map((item) => item.value))
  }, [data])

  return (
    <div className="w-full h-full">
      <div className="relative min-h-[260px] h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-4 select-none flex flex-col justify-between">
        {/* Loading Overlay */}
        {isLoading && !apiData && (
          <div className="absolute inset-0 z-20 bg-gray-900/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center flex-col gap-2 transition-all duration-200">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-xs font-medium text-zinc-300">Загрузка данных...</span>
          </div>
        )}

        {/* Header Title */}
        <div className="pb-2">
          <h2 className="text-[9px] font-semibold text-zinc-400 uppercase">
            ТОП 10 ТОВАРОВ ПО ПРОДАЖАМ (МЕСЯЦ)
          </h2>
        </div>

        {/* Labels for columns */}
        <div className="grid grid-cols-12 gap-3 text-[9px] uppercase text-zinc-500 font-semibold mb-2 border-b border-zinc-800/30">
          <div className="col-span-4">Товар</div>
          <div className="col-span-5">Диаграмма</div>
          <div className="col-span-3 text-right">Продажи, сум</div>
        </div>

        {/* List of items */}
        <div className="flex flex-col gap-1 overflow-y-auto pr-0.5">
          {data.slice(0, 10).map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center rounded-md bg-zinc-800/20 py-[0.5px] px-1 hover:bg-zinc-800/40 transition-colors"
              >
                {/* Rank and Name */}
                <div className="col-span-4 flex items-center gap-1.5 min-w-0">
                  <span className="text-zinc-500 text-[9px] font-semibold w-3.5 text-left shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-zinc-200 font-medium text-[9px] truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>

                {/* Recharts Bar */}
                <div className="col-span-5 h-2.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[{ value: item.value }]}
                      layout="vertical"
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <XAxis type="number" domain={[0, maxValue]} hide />
                      <YAxis type="category" hide />
                      <Bar
                        dataKey="value"
                        fill={"#3b82f6"}
                        radius={[0, 3, 3, 0]}
                        isAnimationActive={true}
                        animationDuration={500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Value */}
                <div className="col-span-3 text-right text-zinc-300 font-semibold text-[9px]">
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
