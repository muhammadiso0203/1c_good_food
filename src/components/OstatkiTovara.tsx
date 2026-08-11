import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface OstatokItem {
  filial: string
  ostatok: number // in sum
  foiz: number    // in percent
  color: string   // hex code
  bgKlass: string // tailwind color utility for bullet
}

const data: OstatokItem[] = [
  {
    filial: "Ташкент",
    ostatok: 10245600000,
    foiz: 55.5,
    color: "#3b82f6", // blue-500
    bgKlass: "bg-blue-500",
  },
  {
    filial: "Самарканд",
    ostatok: 4605200000,
    foiz: 24.9,
    color: "#10b981", // emerald-500
    bgKlass: "bg-emerald-500",
  },
  {
    filial: "Фергана",
    ostatok: 3599200000,
    foiz: 19.6,
    color: "#f59e0b", // amber-500
    bgKlass: "bg-amber-500",
  },
]


export function OstatkiTovara() {

  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const totalOstatok = data.reduce((sum, item) => sum + item.ostatok, 0) // 18 450 000 000

  return (
    <div className="w-full px-3 mt-6">
      <div className="h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none">
        {/* Header Title */}
        <div className="mb-6 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ОСТАТКИ ТОВАРА
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 min-h-40">
          {/* Left Side: Recharts Doughnut Chart */}
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={73}
                  paddingAngle={0}
                  dataKey="ostatok"
                  startAngle={90}
                  endAngle={-270} // Make it go clockwise starting from top
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
              {true ? (
                <>
                  <span className="text-xl font-black text-zinc-100 leading-none">
                    {(data[0].ostatok / 1000000000).toLocaleString("ru-RU", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                    млрд сум
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold mt-1 max-w-21.25 truncate">
                    {data[0].filial}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xl font-black text-zinc-100 leading-none">
                    {(totalOstatok / 1000000000).toLocaleString("ru-RU", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                    млрд сум
                  </span>
                  <span className="text-[9px] text-zinc-500 font-semibold mt-1">
                    общий остаток
                  </span>
                </>
              )}
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
                  className={`grid grid-cols-12 gap-2 py-2.5 items-center transition-all duration-200 rounded-lg px-1.5 -mx-1.5`}
                >
                  <div className="col-span-5 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${item.bgKlass}`} />
                    <span className="text-zinc-200 font-medium text-xs">
                      {item.filial}
                    </span>
                  </div>
                  <div className="col-span-5 text-right text-zinc-300 font-medium text-xs">
                    {formatSuma(item.ostatok)}
                  </div>
                  <div className="col-span-2 text-right text-zinc-400 font-semibold text-xs">
                    {item.foiz}%
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="grid grid-cols-12 gap-2 py-3 mt-1.5 border-t border-zinc-800/40 items-center">
                <div className="col-span-5 text-zinc-400 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                  Итого
                </div>
                <div className="col-span-5 text-right text-zinc-100 font-bold text-xs">
                  {formatSuma(totalOstatok)}
                </div>
                <div className="col-span-2 text-right text-zinc-400 font-bold text-xs">
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
