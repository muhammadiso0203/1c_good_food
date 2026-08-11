import { Landmark, Coins } from "lucide-react"

interface AccountData {
  filial: string
  schet: number
  kassa: number
}

const data: AccountData[] = [
  {
    filial: "Ташкент",
    schet: 1452300000,
    kassa: 35450000,
  },
  {
    filial: "Самарканд",
    schet: 612750000,
    kassa: 22180000,
  },
  {
    filial: "Фергана",
    schet: 320700000,
    kassa: 17850000,
  },
]

export function DengiNaSchetax() {
  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const totalSchet = data.reduce((sum, item) => sum + item.schet, 0) // 2 385 750 000
  const totalKassa = data.reduce((sum, item) => sum + item.kassa, 0) // 75 480 000

  return (
    <div className="w-full px-3 mt-6">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none">
        {/* Header Title */}
        <div className="mb-5 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДЕНЬГИ НА СЧЕТАХ И В КАССАХ
          </h2>
        </div>

        {/* Content Columns Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Left Column: НА РАСЧЕТНЫХ СЧЕТАХ */}
          <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4">
            {/* Sub Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-wider text-zinc-200 uppercase">
                НА РАСЧЕТНЫХ СЧЕТАХ
              </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wider text-zinc-500 mb-2 pb-2 border-b border-zinc-800/30">
              <div className="col-span-5">Филиал</div>
              <div className="col-span-7 text-right">Сумма, сум</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-zinc-800/10">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 py-2.5 items-center px-1.5 -mx-1.5 hover:bg-zinc-800/10 rounded-lg transition-colors"
                >
                  <div className="col-span-5 text-zinc-200 text-sm">
                    {item.filial}
                  </div>
                  <div className="col-span-7 text-right text-zinc-300 text-sm">
                    {formatSuma(item.schet)}
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-12 gap-2 py-3 mt-1 border-t border-zinc-800/40 items-center">
                <div className="col-span-5 text-zinc-400 text-sm uppercase tracking-wide">
                  Итого
                </div>
                <div className="col-span-7 text-right text-emerald-400 text-sm">
                  {formatSuma(totalSchet)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: В КАССАХ */}
          <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4">
            {/* Sub Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-wider text-zinc-200 uppercase">
                В КАССАХ
              </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wider text-zinc-500 mb-2 pb-2 border-b border-zinc-800/30">
              <div className="col-span-5">Филиал</div>
              <div className="col-span-7 text-right">Сумма, сум</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-zinc-800/10">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-2 py-2.5 items-center px-1.5 -mx-1.5 hover:bg-zinc-800/10 rounded-lg transition-colors"
                >
                  <div className="col-span-5 text-zinc-200 text-sm">
                    {item.filial}
                  </div>
                  <div className="col-span-7 text-right text-zinc-300 text-sm">
                    {formatSuma(item.kassa)}
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-12 gap-2 py-3 mt-1 border-t border-zinc-800/40 items-center">
                <div className="col-span-5 text-zinc-400 text-sm uppercase tracking-wide">
                  Итого
                </div>
                <div className="col-span-7 text-right text-purple-400 text-sm">
                  {formatSuma(totalKassa)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

