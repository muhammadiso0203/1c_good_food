interface NelikvidItem {
  tovar: string
  filial: string
  ostatok: string
  summa: number
  bezDvijeniya: string
}

const defaultData: NelikvidItem[] = [
  {
    tovar: "Саморез 3.5х13",
    filial: "Ташкент",
    ostatok: "28 450 уп.",
    summa: 124800000,
    bezDvijeniya: "214 дней",
  },
  {
    tovar: "Дюбель 10х100",
    filial: "Самарканд",
    ostatok: "18 200 уп.",
    summa: 98560000,
    bezDvijeniya: "186 дней",
  },
  {
    tovar: "Шуруп универс. 6х100",
    filial: "Фергана",
    ostatok: "14 600 уп.",
    summa: 87420000,
    bezDvijeniya: "173 дней",
  },
  {
    tovar: "Гвозди 40 мм",
    filial: "Ташкент",
    ostatok: "26 000 кг",
    summa: 74100000,
    bezDvijeniya: "141 дней",
  },
  {
    tovar: "Саморез 4.8х127",
    filial: "Самарканд",
    ostatok: "8 350 уп.",
    summa: 68950000,
    bezDvijeniya: "129 дней",
  },
]

// Итого сумма из макета: 1 245 600 000
const totalSumma = 1245600000

export function NelikvidniyTovar() {
  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none h-full flex flex-col justify-between">
        {/* Header Title */}
        <div className="border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            НЕЛИКВИДНЫЙ ТОВАР (БОЛЕЕ 90 ДНЕЙ БЕЗ ДВИЖЕНИЯ)
          </h2>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/30 text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="px-1 text-left">ТОВАР</th>
                <th className="px-1 text-left">ФИЛИАЛ</th>
                <th className="px-1 text-right">ОСТАТОК</th>
                <th className="px-1 text-right">СУММА, СУМ</th>
                <th className="px-1 text-right">БЕЗ ДВИЖЕНИЯ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/10 text-[9px]">
              {defaultData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-800/20 transition-colors duration-200"
                >
                  <td className=" px-1 text-zinc-200">
                    {item.tovar}
                  </td>
                  <td className=" px-1 text-zinc-400">
                    {item.filial}
                  </td>
                  <td className=" px-1 text-right text-zinc-300">
                    {item.ostatok}
                  </td>
                  <td className=" px-1 text-right text-zinc-200">
                    {formatSuma(item.summa)}
                  </td>
                  <td className=" px-1 text-right text-red-500">
                    {item.bezDvijeniya}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Row */}
        <div className="border-t border-zinc-800/40 flex items-center justify-between">
          <span className="text-amber-500 text-xs uppercase tracking-wider">
            ИТОГО
          </span>
          <span className="text-amber-500 text-sm tracking-tight">
            {formatSuma(totalSumma)}
          </span>
        </div>
      </div>
    </div>
  )
}
