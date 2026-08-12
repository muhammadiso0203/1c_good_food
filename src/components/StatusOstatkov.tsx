import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface StatusOstatkovItem {
  status: string
  sku: number
  foiz: number
  color: string
  bgKlass: string
  textKlass: string
}

const data: StatusOstatkovItem[] = [
  {
    status: "Норма запаса",
    sku: 2856,
    foiz: 59,
    color: "#10b981", // emerald-500
    bgKlass: "bg-emerald-500",
    textKlass: "text-emerald-400",
  },
  {
    status: "Мало (<= мин. запаса)",
    sku: 1124,
    foiz: 23,
    color: "#f59e0b", // amber-500
    bgKlass: "bg-amber-500",
    textKlass: "text-amber-400",
  },
  {
    status: "Нет в наличии",
    sku: 846,
    foiz: 18,
    color: "#ef4444", // red-500
    bgKlass: "bg-red-500",
    textKlass: "text-red-400",
  },
]


export function StatusOstatkov() {

  const formatNumber = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const totalSKU = data.reduce((sum, item) => sum + item.sku, 0) // 4826

  return (
    <div className="w-full h-full">
      <div className="h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none">
        {/* Header Title */}
        <div className="mb-6 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            СТАТУС ОСТАТКОВ (SKU)
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 min-h-40">
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
                  dataKey="sku"
                  startAngle={90}
                  endAngle={-270} // Clockwise starting from top
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
              <span className="text-2xl font-black text-zinc-100 leading-none">
                {formatNumber(totalSKU)}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                всего SKU
              </span>
            </div>
          </div>

          {/* Right Side: Data Legend */}
          <div className="w-full flex-1 flex flex-col gap-4">
            {data.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-1.5 -mx-1.5 rounded-lg transition-all duration-200`}
              >
                {/* Colored square indicator */}
                <span className={`w-3 h-3 rounded-[3px] shrink-0 mt-0.5 ${item.bgKlass}`} />

                {/* Text info */}
                <div className="flex flex-col leading-tight">
                  <span className="text-zinc-400 text-[8px] font-semibold">
                    {item.status}
                  </span>
                  <span className="text-zinc-100 text-[8px] font-bold mt-0.5">
                    {formatNumber(item.sku)} ({item.foiz}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
