import { Landmark, Coins, Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useData } from "../service/useData"
import { useMemo } from "react"

interface AccountData {
  filial: string
  schet: number
  kassa: number
}

const REGIONS = [
  { key: "Джизакская_область", name: "Джизак" },
  { key: "Сурдарьинская_область_", name: "Сырдарья" },
  { key: "Ташкентская_область", name: "Ташкент" },
]

export function DengiNaSchetax({ date }: { date?: DateRange }) {
  const { data: apiData, isLoading, isFetching } = useData(date)

  const data: AccountData[] = useMemo(() => {
    return REGIONS.map((reg) => {
      let schet = 0
      let kassa = 0

      if (apiData) {
        // Look up dynamically by matching key or fallback
        for (const key in apiData) {
          if (key.startsWith(`РасчётныйСчёт_${reg.key}`)) {
            schet = apiData[key] || 0
          }
          if (key.startsWith(`Касса_${reg.key}`)) {
            kassa = apiData[key] || 0
          }
        }
      }

      return {
        filial: reg.name,
        schet,
        kassa,
      }
    })
  }, [apiData])

  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const totalSchet = useMemo(() => data.reduce((sum, item) => sum + item.schet, 0), [data])
  const totalKassa = useMemo(() => data.reduce((sum, item) => sum + item.kassa, 0), [data])

  return (
    <div className="w-full h-full relative">
      <div className="h-full flex flex-col justify-between bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3 select-none relative">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 z-20 bg-gray-900/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-xs font-medium text-zinc-300">Загрузка данных...</span>
          </div>
        )}
        {/* Header Title */}
        <div className="pb-3 border-b border-zinc-800/40 mb-2">
          <h2 className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДЕНЬГИ НА СЧЕТАХ И В КАССАХ
          </h2>
        </div>

        {/* Content Columns Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Left Column: НА РАСЧЕТНЫХ СЧЕТАХ */}
          <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3">
            {/* Sub Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Landmark className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-medium tracking-wider text-zinc-200 uppercase truncate">
                НА РАСЧЕТНЫХ СЧЕТАХ
              </span>
            </div>

            {/* Table Header */}
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-2 pb-1.5 border-b border-zinc-800/30">
              <span>Филиал</span>
              <span>Сумма, сум</span>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-1.5">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-1 py-0.5 hover:bg-zinc-800/20 rounded transition-colors text-[12px]"
                >
                  <span className="text-zinc-200 truncate pr-2">
                    {item.filial}
                  </span>
                  <span className="text-zinc-300 font-mono text-right shrink-0">
                    {formatSuma(item.schet)}
                  </span>
                </div>
              ))}

              {/* Total Row */}
              <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-zinc-800/40 text-[12px]">
                <span className="text-zinc-400 text-[11px] uppercase tracking-wide">
                  Итого
                </span>
                <span className="text-emerald-400 font-medium font-mono text-right shrink-0">
                  {formatSuma(totalSchet)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: В КАССАХ */}
          <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3">
            {/* Sub Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-medium tracking-wider text-zinc-200 uppercase truncate">
                В КАССАХ
              </span>
            </div>

            {/* Table Header */}
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-2 pb-1.5 border-b border-zinc-800/30">
              <span>Филиал</span>
              <span>Сумма, сум</span>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-1.5">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-1 py-0.5 hover:bg-zinc-800/20 rounded transition-colors text-[12px]"
                >
                  <span className="text-zinc-200 truncate pr-2">
                    {item.filial}
                  </span>
                  <span className="text-zinc-300 font-mono text-right shrink-0">
                    {formatSuma(item.kassa)}
                  </span>
                </div>
              ))}

              {/* Total Row */}
              <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-zinc-800/40 text-[12px]">
                <span className="text-zinc-400 text-[11px] uppercase tracking-wide">
                  Итого
                </span>
                <span className="text-purple-400 font-medium font-mono text-right shrink-0">
                  {formatSuma(totalKassa)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
