import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface CreditorItem {
  period: string
  summa: number
  foiz: number
  color: string
  bgKlass: string
}

const data: CreditorItem[] = [
  {
    period: "До 30 дней",
    summa: 1245600000,
    foiz: 38,
    color: "#22c55e", // emerald-500 / green
    bgKlass: "bg-emerald-500",
  },
  {
    period: "30 - 60 дней",
    summa: 856200000,
    foiz: 26,
    color: "#eab308", // yellow-500
    bgKlass: "bg-yellow-500",
  },
  {
    period: "60 - 90 дней",
    summa: 598450000,
    foiz: 18,
    color: "#f97316", // orange-500
    bgKlass: "bg-orange-500",
  },
  {
    period: "Более 90 дней",
    summa: 540350000,
    foiz: 18,
    color: "#ef4444", // red-500
    bgKlass: "bg-red-500",
  },
]

export function CreditorskayaZadoljennost() {
  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const totalSumma = data.reduce((sum, item) => sum + item.summa, 0) // 3 240 600 000
  const totalMbrd = (totalSumma / 1000000000).toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none flex flex-col justify-between">
        {/* Header Title */}
        <div className="mb-4 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            КРЕДИТОРСКАЯ ЗАДОЛЖЕННОСТЬ
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 min-h-44">
          {/* Left Side: Chart and Button */}
          <div className="flex flex-col items-center shrink-0">
            {/* Doughnut Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={0}
                    dataKey="summa"
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

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-xl font-extrabold text-zinc-100 leading-none">
                  {totalMbrd}
                </span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase mt-1 leading-none">
                  млрд сум
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
            {data.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                {/* Color Box */}
                <span
                  className={`w-3 h-3 rounded-xs shrink-0 mt-0.5 ${item.bgKlass}`}
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
