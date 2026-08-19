import { useMemo } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { DateRange } from "react-day-picker"
import { useData } from "../service/useData"
import { Loader2 } from "lucide-react"

interface OstatokItem {
  filial: string
  ostatok: number // in sum
  foiz: number    // in percent
  color: string   // hex code
  bgKlass: string // tailwind color utility for bullet
}

interface OstatkiTovaraProps {
  date?: DateRange
}

const DEFAULT_BRANCHES = [
  { key: "ОстаткиТовара_Гулистан", filial: "Гулистан", defaultVal: 7608731562.59, color: "#3b82f6", bgKlass: "bg-blue-500" },
  { key: "ОстаткиТовара_Ташкент", filial: "Ташкент", defaultVal: 660373429.79, color: "#10b981", bgKlass: "bg-emerald-500" },
  { key: "ОстаткиТовара_Жиззах", filial: "Джизак", defaultVal: 357826997.38, color: "#f59e0b", bgKlass: "bg-amber-500" },
]

export function OstatkiTovara({ date }: OstatkiTovaraProps) {
  const { data: apiData, isLoading, isFetching } = useData(date)

  const data: OstatokItem[] = useMemo(() => {
    let rawItems = DEFAULT_BRANCHES.map((b) => {
      let val = b.defaultVal
      if (apiData && apiData[b.key] !== undefined && typeof apiData[b.key] === "number") {
        val = apiData[b.key]
      }
      return {
        filial: b.filial,
        ostatok: Math.round(val),
        color: b.color,
        bgKlass: b.bgKlass,
      }
    })

    const total = rawItems.reduce((sum, item) => sum + item.ostatok, 0) || 1

    return rawItems.map((item) => ({
      ...item,
      foiz: Number(((item.ostatok / total) * 100).toFixed(1)),
    }))
  }, [apiData])

  const totalOstatok = useMemo(() => {
    return data.reduce((sum, item) => sum + item.ostatok, 0)
  }, [data])

  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const mainBranch = data.reduce((max, item) => (item.ostatok > max.ostatok ? item : max), data[0])

  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none">
        {/* Loading Overlay */}
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 z-20 bg-gray-900/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center flex-col gap-2 transition-all duration-200">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-xs font-medium text-zinc-300">Загрузка данных...</span>
          </div>
        )}

        {/* Header Title */}
        <div className="mb-6 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ОСТАТКИ ТОВАРА
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 min-h-40">
          {/* Left Side: Recharts Doughnut Chart */}
          <div className="relative w-30 h-30 flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="ostatok"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((item, index) => (
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
              <span className="text-xl font-black text-zinc-100 leading-none">
                {(mainBranch.ostatok / 1000000000).toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-[8px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                млрд сум
              </span>
              <span className="text-[8px] text-zinc-500 font-semibold mt-1 max-w-21.25 truncate">
                {mainBranch.filial}
              </span>
            </div>
          </div>

          {/* Right Side: Data Legend Table */}
          <div className="w-full flex-1">
            {/* Headers */}
            <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2 pb-2 border-b border-zinc-800/30">
              <div className="col-span-5">Филиал</div>
              <div className="col-span-7 text-right">Остаток, сум</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-zinc-800/10">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 py-2.5 items-center transition-all duration-200 rounded-lg px-1.5 -mx-1.5"
                >
                  <div className="col-span-5 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${item.bgKlass}`} />
                    <span className="text-zinc-200 font-medium text-[8px]">
                      {item.filial}
                    </span>
                  </div>
                  <div className="col-span-5 text-right text-zinc-300 font-medium text-[8px]">
                    {formatSuma(item.ostatok)}
                  </div>
                  <div className="col-span-2 text-right text-zinc-400 font-semibold text-[8px]">
                    {item.foiz}%
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-12 gap-2 py-3 mt-1.5 border-t border-zinc-800/40 items-center">
                <div className="col-span-5 text-zinc-400 font-semibold text-[10px] uppercase tracking-wide">
                  Итого
                </div>
                <div className="col-span-5 text-right text-zinc-100 font-bold text-[9px]">
                  {formatSuma(totalOstatok)}
                </div>
                <div className="col-span-2 text-right text-zinc-400 font-bold text-[10px]">
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
