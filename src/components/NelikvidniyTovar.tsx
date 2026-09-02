import { useState, useMemo } from "react"
import { useData } from "../pages/service/useData"
import type { DateRange } from "react-day-picker"
import { Loader2, Search } from "lucide-react"

interface NelikvidItem {
  tovar: string
  filial: string
  ostatok: string
  summa: number
  summaFormatted: string
  bezDvijeniya: string
  days: number
}

/**
 * Backenddan kelgan ma'lumotlarni parse qilish.
 * Kalit formati:  "НеликвидныйТовар_<tovar_nomi>"
 * Qiymat formati: "<filial>_<ostatok>_<summa>_<bez_dvijeniya>"
 */
function parseNelikvidData(data: Record<string, any> | undefined): NelikvidItem[] {
  if (!data) return []

  const prefix = "НеslikvidnийТовар_"
  const prefix2 = "НеликвидныйТовар_"

  const items: NelikvidItem[] = []

  for (const [key, value] of Object.entries(data)) {
    let tovarName = ""
    if (key.startsWith(prefix)) {
      tovarName = key.slice(prefix.length)
    } else if (key.startsWith(prefix2)) {
      tovarName = key.slice(prefix2.length)
    } else {
      continue
    }

    // Tovar nomini tozalash: ___ -> " ", __ -> " ", _ -> " "
    tovarName = tovarName
      .replace(/___/g, " ")
      .replace(/__/g, " ")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    if (typeof value !== "string") continue

    const parts = value.split("_")
    if (parts.length < 4) continue

    const bezDvijeniyaStr = parts[parts.length - 1].trim()
    const summaStr = parts[parts.length - 2].trim()
    const ostatok = parts[parts.length - 3].trim()
    const filial = parts.slice(0, parts.length - 3).join(" ").trim()

    const rawNum = parseInt(summaStr.replace(/\s/g, ""), 10) || 0
    const days = parseInt(bezDvijeniyaStr.replace(/\D/g, ""), 10) || 0

    items.push({
      tovar: tovarName,
      filial,
      ostatok,
      summa: rawNum,
      summaFormatted: rawNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      bezDvijeniya: `${days} дн.`,
      days,
    })
  }

  // Eng ko'p to'xtab qolganlari bo'yicha saralash
  return items.sort((a, b) => b.days - a.days)
}

function getSeverity(days: number) {
  if (days >= 200) {
    return {
      bar: "bg-rose-500",
      text: "text-rose-400",
      badge: "bg-rose-950/50 text-rose-400 border-rose-500/20",
    }
  }
  if (days >= 150) {
    return {
      bar: "bg-orange-500",
      text: "text-orange-400",
      badge: "bg-orange-950/50 text-orange-400 border-orange-500/20",
    }
  }
  return {
    bar: "bg-amber-500",
    text: "text-amber-400",
    badge: "bg-amber-950/50 text-amber-400 border-amber-500/20",
  }
}

interface NelikvidniyTovarProps {
  date?: DateRange
  branch?: number
}

export function NelikvidniyTovar({ date, branch }: NelikvidniyTovarProps) {
  const { data, isLoading, isFetching } = useData(date, branch)

  const [searchTerm, setSearchTerm] = useState("")

  const allItems = useMemo(() => parseNelikvidData(data), [data])

  // Qidiruv va filtr
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchSearch =
        searchTerm === "" ||
        item.tovar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filial.toLowerCase().includes(searchTerm.toLowerCase())
      return matchSearch
    })
  }, [allItems, searchTerm])

  // Umumiy statistika
  const totalSumma = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.summa, 0)
  }, [filteredItems])

  const totalSummaFormatted = useMemo(() => {
    return totalSumma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }, [totalSumma])

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Asosiy jadval bloki */}
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none flex flex-col min-h-120 mt-4">
        {/* Loading holati */}
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 z-30 bg-gray-900/70 backdrop-blur-[2px] rounded-xl flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-xs font-medium text-zinc-300">Загрузка данных...</span>
          </div>
        )}

        {/* Sarlavha va filtrlar qatori */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 sm:pb-4 sm:mb-4 border-b border-zinc-800/40">
          <div>
            <h2 className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
              НЕЛИКВИДНЫЙ ТОВАР (БОЛЕЕ 90 ДНЕЙ БЕЗ ДВИЖЕНИЯ)
            </h2>
          </div>

          {/* Qidiruv va filial filtri */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Qidiruv input */}
            <div className="relative w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск товара или филиала..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 h-8 pl-8 pr-3 bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 rounded-lg focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Jadval */}
        <div className="overflow-x-auto -mx-1 sm:mx-0">
          <table className="w-full min-w-[580px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/40 text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="py-2.5 px-3 text-center w-12 font-medium">№</th>
                <th className="py-2.5 px-3 font-medium">Товар</th>
                <th className="py-2.5 px-3 font-medium">Филиал</th>
                <th className="py-2.5 px-3 text-right font-medium">Остаток</th>
                <th className="py-2.5 px-3 text-right font-medium">Сумма, сум</th>
                <th className="py-2.5 px-3 text-right font-medium">Без движения</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/20 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 text-xs">
                    {allItems.length === 0
                      ? "Данные не найдены"
                      : "По выбранному фильтру товары не найдены"}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => {
                  const severity = getSeverity(item.days)
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-zinc-800/20 transition-colors duration-150"
                    >
                      <td className="py-2.5 px-3 text-center text-zinc-500 font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 text-zinc-200 font-medium max-w-xs truncate">
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${severity.bar}`}
                          />
                          <span title={item.tovar}>{item.tovar}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-zinc-400 font-normal">
                        {item.filial}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-zinc-300">
                        {item.ostatok}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-zinc-100">
                        {item.summaFormatted}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-mono font-medium ${severity.badge}`}
                        >
                          {item.bezDvijeniya}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Jami pastki qator */}
        {filteredItems.length > 0 && (
          <div className="mt-4 pt-3 border-t-2 border-zinc-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                ИТОГО
              </span>
              <span className="text-zinc-500 font-normal">
                ({filteredItems.length} позиций)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Сумма:</span>
              <span className="text-sm font-extrabold text-amber-400 font-mono tracking-tight">
                {totalSummaFormatted} <span className="text-xs font-normal text-zinc-400">сум</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}