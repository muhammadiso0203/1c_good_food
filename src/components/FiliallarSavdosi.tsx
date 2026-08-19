
export interface FilialSavdo {
  nomi: string
  bugun: number
  oy: number
  reja: number
  bajarilish: number    
}

const defaultData: FilialSavdo[] = [
  {
    nomi: "Гулистан",
    bugun: 625450000,
    oy: 12450800000,
    reja: 14500000000,
    bajarilish: 86,
  },
  {
    nomi: "Ташкент",
    bugun: 298120000,
    oy: 6102400000,
    reja: 7500000000,
    bajarilish: 81,
  },
  {
    nomi: "Джизак",
    bugun: 187330000,
    oy: 4221600000,
    reja: 5000000000,
    bajarilish: 84,
  },
]

export function FiliallarSavdosi() {
  const formatSuma = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  // Jami hisoblash
  const jamiBugun = defaultData.reduce((sum, item) => sum + item.bugun, 0)
  const jamiOy = defaultData.reduce((sum, item) => sum + item.oy, 0)
  const jamiReja = defaultData.reduce((sum, item) => sum + item.reja, 0)
  // Bajarilish foizi jami uchun
  const jamiBajarilish = Math.round((jamiOy / jamiReja) * 100)

  // Progress bar va foiz rangi uchun
  const getRangKlassi = (foiz: number) => {
    if (foiz >= 84) {
      return {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
      }
    }
    return {
      text: "text-amber-500",
      bg: "bg-amber-500",
    }
  }

  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5">
        {/* Sarlavha qismi */}
        <div className="mb-5 pb-3 border-b border-zinc-800/40">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ПРОДАЖИ ПО ФИЛИАЛАМ
          </h2>
        </div>

        {/* Jadval qismi */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/30 text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="py-3 px-2">ФИЛИАЛ</th>
                <th className="py-3 px-2 text-right">СЕГОДНЯ, СУМ</th>
                <th className="py-3 px-2 text-right">МЕСЯЦ, СУМ</th>
                <th className="py-3 px-2 text-right">ПЛАН, СУМ</th>
                <th className="py-3 px-2 text-right">ВЫПОЛНЕНИЕ, %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/20 text-xs">
              {defaultData.map((item, idx) => {
                const rang = getRangKlassi(item.bajarilish)
                return (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-800/20 transition-colors duration-250"
                  >
                    <td className="py-3 px-2 text-zinc-200 font-medium">
                      {item.nomi}
                    </td>
                    <td className="py-3 px-2 text-right text-zinc-300">
                      {formatSuma(item.bugun)}
                    </td>
                    <td className="py-3 px-2 text-right text-zinc-300">
                      {formatSuma(item.oy)}
                    </td>
                    <td className="py-3 px-2 text-right text-zinc-400">
                      {formatSuma(item.reja)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`text-xs w-8 text-right font-medium ${rang.text}`}>
                          {item.bajarilish}%
                        </span>
                        <div className="w-16 sm:w-20 bg-gray-700 h-3 rounded-sm overflow-hidden shrink-0 border border-zinc-800/60">
                          <div
                            className={`h-full rounded-sm transition-all duration-500 ${rang.bg}`}
                            style={{ width: `${item.bajarilish}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {/* JAMI satri */}
              <tr className="bg-zinc-800/10 border-t-2 border-zinc-800/60">
                <td className="py-3 px-2 text-zinc-100 uppercase text-[11px] font-bold tracking-wider">
                  ИТОГО
                </td>
                <td className="py-3 px-2 text-right text-zinc-100 font-semibold text-xs tracking-tight">
                  {formatSuma(jamiBugun)}
                </td>
                <td className="py-3 px-2 text-right text-zinc-100 font-semibold text-xs tracking-tight">
                  {formatSuma(jamiOy)}
                </td>
                <td className="py-3 px-2 text-right text-zinc-400 font-semibold text-xs tracking-tight">
                  {formatSuma(jamiReja)}
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-xs w-8 text-right font-bold ${getRangKlassi(jamiBajarilish).text}`}>
                      {jamiBajarilish}%
                    </span>
                    <div className="w-16 sm:w-20 bg-gray-700 h-3 rounded-sm overflow-hidden shrink-0 border border-zinc-800/60">
                      <div
                        className={`h-full rounded-sm transition-all duration-500 ${getRangKlassi(jamiBajarilish).bg}`}
                        style={{ width: `${jamiBajarilish}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
