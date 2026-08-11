import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"

interface ProductSaleItem {
  name: string
  value: number
}

const data: ProductSaleItem[] = [
  { name: "Саморез 3.5х25", value: 2145800000 },
  { name: "Саморез 4.2х75", value: 1856200000 },
  { name: "Дюбель 8х60", value: 1542300000 },
  { name: "Анкерный болт 10х100", value: 1235460000 },
  { name: "Саморез 4.2х16", value: 985600000 },
  { name: "Гвозди 70 мм", value: 745500000 },
  { name: "Шуруп универс. 5х70", value: 632450000 },
  { name: "Стяжка мебельная", value: 456800000 },
  { name: "Болт М8х30", value: 423100000 },
  { name: "Гайка М10", value: 398900000 },
]

export function TopTovari() {

  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  // Find the maximum value to use as the upper limit of the XAxis domain
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full px-3 mt-6">
      <div className="h-full bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none flex flex-col">
        {/* Header Title */}
        <div className="pb-2">
          <h2 className="text-[9px] font-semibold  text-zinc-400 uppercase leading-none">
            ТОП 10 ТОВАРОВ ПО ПРОДАЖАМ (МЕСЯЦ)
          </h2>
        </div>

        {/* Labels for columns */}
        <div className="grid grid-cols-12 gap-3 text-[9px] uppercase  text-zinc-500 font-semibold mb-2 border-b border-zinc-800/30">
          <div className="col-span-4">Товар</div>
          <div className="col-span-5">Диаграмма</div>
          <div className="col-span-3">Продажи, сум</div>
        </div>

        {/* List of items */}
        <div className="flex flex-col">
          {data.slice(0, 10).map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 py-2 items-center rounded-md bg-zinc-800/20"
              >
                {/* Rank and Name */}
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-zinc-500 text-[9px] font-semibold w-4 text-left">
                    {index + 1}
                  </span>
                  <span className="text-zinc-200 font-medium text-[9px]" title={item.name}>
                    {item.name}
                  </span>
                </div>

                {/* Recharts Bar */}
                <div className="col-span-5 h-3">
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
