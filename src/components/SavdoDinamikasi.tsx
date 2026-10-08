import type { DateRange } from "react-day-picker"
import { useData } from "../pages/service/useData"
import { useEffect, useMemo, useRef, useState } from "react"

interface ChartDataPoint {
  month: string
  currentYear?: number
  prevYear?: number
}

const MONTHS = [
  { name: "Янв", full: "Январь", aliases: ["янв", "январь", "jan", "january", "01", "1"] },
  { name: "Фев", full: "Февраль", aliases: ["фев", "февраль", "feb", "february", "02", "2"] },
  { name: "Мар", full: "Март", aliases: ["мар", "март", "mar", "march", "03", "3"] },
  { name: "Апр", full: "Апрель", aliases: ["апр", "апрель", "apr", "april", "04", "4"] },
  { name: "Май", full: "Май", aliases: ["май", "may", "05", "5"] },
  { name: "Июн", full: "Июнь", aliases: ["июн", "июнь", "jun", "june", "06", "6"] },
  { name: "Июл", full: "Июль", aliases: ["июл", "июль", "jul", "july", "07", "7"] },
  { name: "Авг", full: "Август", aliases: ["авг", "август", "aug", "august", "08", "8"] },
  { name: "Сен", full: "Сентябрь", aliases: ["сен", "сентябрь", "sep", "september", "09", "9"] },
  { name: "Окт", full: "Октябрь", aliases: ["окт", "октябрь", "oct", "october", "10"] },
  { name: "Ноя", full: "Ноябрь", aliases: ["ноя", "ноябрь", "nov", "november", "11"] },
  { name: "Дек", full: "Декабрь", aliases: ["дек", "декабрь", "dec", "december", "12"] },
]

function SavdoDinamikasiSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full overflow-hidden animate-pulse flex flex-col justify-between">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="h-3 w-48 bg-zinc-700/60 rounded" />
          <div className="flex items-center gap-4">
            <div className="h-2.5 w-20 bg-zinc-700/40 rounded" />
            <div className="h-2.5 w-20 bg-zinc-700/40 rounded" />
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="h-43.75 w-full flex flex-col justify-between pt-2 pb-2">
          <div className="w-full border-b border-zinc-800/30 h-8" />
          <div className="w-full border-b border-zinc-800/30 h-8" />
          <div className="w-full border-b border-zinc-800/30 h-8" />
          <div className="w-full border-b border-zinc-800/30 h-8" />
          <div className="flex justify-between pt-2">
            {["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"].map((m, i) => (
              <span key={i} className="text-[9px] text-zinc-600">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function normalizeValue(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === "") return undefined
  let num = 0
  if (typeof raw === "number") {
    num = raw
  } else {
    const cleaned = String(raw).replace(/\s/g, "").replace(",", ".")
    num = parseFloat(cleaned)
    if (isNaN(num)) return undefined
  }
  if (num < 0) return 0

  // If value is raw sum in billions (e.g. 7_667_390_859.26 sum -> 7.67 billion)
  if (num >= 100_000_000) {
    return Number((num / 1_000_000_000).toFixed(2))
  }
  // If value is in millions (e.g. 7_670_000 -> 7.67 million)
  if (num >= 100_000) {
    return Number((num / 1_000_000).toFixed(2))
  }
  // If value is in thousands (e.g. 7_670 -> 7.67)
  if (num > 100) {
    return Number((num / 1000).toFixed(2))
  }
  return Number(num.toFixed(2))
}

export function SavdoDinamikasi({ date, branch }: { date?: DateRange; branch?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 175 })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const { data: apiData, isLoading } = useData(date, branch)

  const data: ChartDataPoint[] = useMemo(() => {
    // Collect array data if present (e.g. "ДинамикаПродаж")
    const dynamicsArray: unknown[] = []
    if (apiData && typeof apiData === "object") {
      for (const [key, val] of Object.entries(apiData)) {
        const kLower = key.toLowerCase()
        if (Array.isArray(val) && kLower.includes("динамик")) {
          dynamicsArray.push(...val)
        }
      }
    }

    const currentReqYear = date?.from ? date.from.getFullYear() : new Date().getFullYear()

    const items = MONTHS.map((m, i) => {
      const idx = i + 1
      const idxPadded = idx < 10 ? `0${idx}` : `${idx}`

      let currRaw: unknown = undefined
      let prevRaw: unknown = undefined

      // 1. Check in dynamicsArray
      for (const item of dynamicsArray) {
        if (!item || typeof item !== "object") continue
        const row = item as Record<string, unknown>
        const periodStr = String(row.Период ?? row.period ?? row.Date ?? row.date ?? "")
        const nameStr = String(row.Наименование ?? row.name ?? row.Месяц ?? row.month ?? "").toLowerCase().trim()

        const matchYear = periodStr.match(/^(\d{4})/)
        const itemYear = matchYear ? parseInt(matchYear[1], 10) : null

        const isPrev =
          (itemYear !== null && itemYear < currentReqYear) ||
          nameStr.includes("пред") ||
          nameStr.includes("прошл") ||
          nameStr.includes("prev") ||
          nameStr.includes("last") ||
          nameStr.includes(String(currentReqYear - 1))

        let matches = false
        if (periodStr) {
          const matchMonth = periodStr.match(/\d{4}-(\d{2})-/) || periodStr.match(/(\d{2})\.\d{4}/)
          if (matchMonth && parseInt(matchMonth[1], 10) === idx) {
            matches = true
          }
        }
        if (!matches && nameStr) {
          if (m.aliases.some((alias) => nameStr === alias || nameStr.includes(alias))) {
            matches = true
          }
        }

        if (matches) {
          const sumVal = row.Сумма ?? row.summa ?? row.Summa ?? row.СуммаТекущий ?? row.currentYear ?? row.value
          const prevVal =
            row.Сумма_Прошлый ??
            row.СуммаПрошлый ??
            row.Сумма_прошлый ??
            row.Сумма_Предыдущий ??
            row.СуммаПредыдущий ??
            row.prevYear ??
            row.ПрошлыйГод

          if (isPrev) {
            prevRaw = sumVal
          } else {
            if (sumVal !== undefined) {
              currRaw = sumVal
            }
            if (prevVal !== undefined) {
              prevRaw = prevVal
            }
          }
        }
      }

      // 2. Check flat keys fallback if not found in array
      if (currRaw === undefined && prevRaw === undefined && apiData && typeof apiData === "object") {
        for (const [key, raw] of Object.entries(apiData)) {
          const kLower = key.toLowerCase()
          if (!kLower.includes("динамик") || Array.isArray(raw)) continue

          const isPrev =
            kLower.includes("пред") ||
            kLower.includes("прошл") ||
            kLower.includes("prev") ||
            kLower.includes("last")

          const matchesMonth =
            kLower.includes(`_${idx}_`) ||
            kLower.includes(`_${idxPadded}_`) ||
            kLower.endsWith(`_${idx}`) ||
            kLower.endsWith(`_${idxPadded}`) ||
            m.aliases.some((alias) => kLower.includes(`_${alias}_`) || kLower.endsWith(`_${alias}`))

          if (matchesMonth) {
            if (isPrev) {
              if (prevRaw === undefined) prevRaw = raw
            } else {
              if (currRaw === undefined) currRaw = raw
            }
          }
        }
      }

      const currVal = normalizeValue(currRaw)
      const prevVal = normalizeValue(prevRaw)

      return {
        month: m.name,
        currentYear: currVal,
        prevYear: prevVal,
      }
    })

    return items
  }, [apiData, date])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setDimensions({ width: Math.max(entry.contentRect.width, 280), height: 175 })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const yMax = useMemo(() => {
    let max = 0
    data.forEach((d) => {
      if (d.currentYear !== undefined && d.currentYear > max) max = d.currentYear
      if (d.prevYear !== undefined && d.prevYear > max) max = d.prevYear
    })
    if (max === 0) return 10
    return Math.max(Math.ceil(max * 1.25), 10)
  }, [data])

  if (isLoading && !apiData) {
    return <SavdoDinamikasiSkeleton />
  }

  const paddingLeft = 35, paddingRight = dimensions.width < 400 ? 30 : 65, paddingTop = 20, paddingBottom = 25
  const chartWidth = dimensions.width - paddingLeft - paddingRight
  const chartHeight = dimensions.height - paddingTop - paddingBottom

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(yMax * r))

  const getCoords = (index: number, val: number) => ({
    x: paddingLeft + (index / (data.length - 1)) * chartWidth,
    y: paddingTop + chartHeight - (val / yMax) * chartHeight,
  })

  const currentYearPoints = data
    .map((d, i) => (d.currentYear !== undefined ? { ...getCoords(i, d.currentYear), origIdx: i } : null))
    .filter((p): p is { x: number; y: number; origIdx: number } => p !== null)

  const prevYearPoints = data
    .map((d, i) => (d.prevYear !== undefined ? { ...getCoords(i, d.prevYear), origIdx: i } : null))
    .filter((p): p is { x: number; y: number; origIdx: number } => p !== null)

  const getSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length <= 1) return ""
    return pts.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = pts[i - 1]
      const cpX = (p.x - prev.x) * 0.4
      return `${acc} C ${prev.x + cpX} ${prev.y}, ${p.x - cpX} ${p.y}, ${p.x} ${p.y}`
    }, "")
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const idx = Math.max(0, Math.min(data.length - 1, Math.round((e.clientX - rect.left - paddingLeft) / (chartWidth / (data.length - 1)))))
    setHoveredIdx(idx)

    const hoverX = paddingLeft + idx * (chartWidth / (data.length - 1))
    const highestVal = Math.max(data[idx].currentYear ?? 0, data[idx].prevYear ?? 0)
    setTooltipPos({ x: hoverX, y: paddingTop + chartHeight - (highestVal / yMax) * chartHeight - 10 })
  }

  const formatValue = (val: number) =>
    `${val.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} млрд`

  const lastCurr = currentYearPoints.length > 0 ? currentYearPoints[currentYearPoints.length - 1] : null
  const lastPrev = prevYearPoints.length > 0 ? prevYearPoints[prevYearPoints.length - 1] : null

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДИНАМИКА ПРОДАЖ (МЕСЯЦЫ)
          </h2>
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 sm:w-4 h-2 bg-blue-500 block rounded-xs" />
              <span className="text-zinc-300 font-medium text-[11px] sm:text-xs">Текущий год</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex gap-0.5 items-center">
                <span className="w-1 h-0.5 bg-zinc-500 rounded-xs" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-xs" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-xs" />
              </span>
              <span className="text-zinc-400 font-medium text-[11px] sm:text-xs">Прошлый год</span>
            </div>
          </div>
        </div>

        <svg width="100%" height={dimensions.height} className="overflow-visible" onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredIdx(null)}>
          {/* Grids and Y Axis */}
          <g>
            {yTicks.map((tick, i) => {
              const y = paddingTop + chartHeight - (tick / yMax) * chartHeight
              return (
                <g key={i}>
                  {tick > 0 && <line x1={paddingLeft} y1={y} x2={paddingLeft + chartWidth} y2={y} stroke="rgba(63, 63, 70, 0.15)" strokeWidth="1" />}
                  <line x1={paddingLeft - 4} y1={y} x2={paddingLeft} y2={y} stroke="rgba(63, 63, 70, 0.4)" strokeWidth="1" />
                  <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fill="rgba(161, 161, 170, 0.6)" className="text-[10px] font-medium font-sans">{tick}</text>
                </g>
              )
            })}
            <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartHeight} stroke="rgba(63, 63, 70, 0.4)" strokeWidth="1" />
            <line x1={paddingLeft} y1={paddingTop + chartHeight} x2={paddingLeft + chartWidth} y2={paddingTop + chartHeight} stroke="rgba(63, 63, 70, 0.4)" strokeWidth="1" />
          </g>

          {/* Lines */}
          <g>
            {prevYearPoints.length >= 2 && (
              <path d={getSmoothPath(prevYearPoints)} fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-300" />
            )}
            {currentYearPoints.length >= 2 && (
              <path d={getSmoothPath(currentYearPoints)} fill="none" stroke="#3b82f6" strokeWidth="2.5" className="transition-all duration-300" />
            )}
          </g>

          {/* Dots */}
          <g>
            {prevYearPoints.map((p, i) => (
              <circle key={`prev-${i}`} cx={p.x} cy={p.y} r={hoveredIdx === p.origIdx ? 5 : 3.5} fill="#1f2937" stroke="#6b7280" strokeWidth={hoveredIdx === p.origIdx ? 2.5 : 1.5} className="transition-all duration-150 cursor-pointer" />
            ))}
            {currentYearPoints.map((p, i) => (
              <circle key={`curr-${i}`} cx={p.x} cy={p.y} r={hoveredIdx === p.origIdx ? 5.5 : 4} fill="#1f2937" stroke="#3b82f6" strokeWidth={hoveredIdx === p.origIdx ? 3 : 2} className="transition-all duration-150 cursor-pointer" />
            ))}
          </g>

          {/* Dynamic Labels */}
          <g>
            {lastCurr && data[lastCurr.origIdx]?.currentYear !== undefined && (
              <text x={lastCurr.x - 15} y={lastCurr.y - 8} fill="#60a5fa" className="text-[10px] sm:text-[11px] font-bold font-sans">
                {formatValue(data[lastCurr.origIdx].currentYear!)}
              </text>
            )}
            {lastPrev && data[lastPrev.origIdx]?.prevYear !== undefined && (
              <text x={lastPrev.x - 10} y={lastPrev.y - 8} fill="#9ca3af" className="text-[10px] sm:text-[11px] font-bold font-sans">
                {formatValue(data[lastPrev.origIdx].prevYear!)}
              </text>
            )}
          </g>

          {/* Month Labels on X Axis */}
          <g>
            {data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * chartWidth
              const y = paddingTop + chartHeight + 15
              const isHovered = hoveredIdx === i
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill={isHovered ? "#60a5fa" : "rgba(161, 161, 170, 0.7)"}
                  className={`text-[10px] font-medium font-sans cursor-pointer transition-colors ${isHovered ? "font-bold" : ""}`}
                >
                  {d.month}
                </text>
              )
            })}
          </g>
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute pointer-events-none bg-zinc-950/95 border border-zinc-700/80 rounded-lg p-2 sm:p-2.5 shadow-2xl z-20 transition-all duration-75 min-w-32"
            style={{
              left: Math.min(Math.max(tooltipPos.x - 60, 10), dimensions.width - 140),
              top: Math.max(tooltipPos.y - 65, 10),
            }}
          >
            <p className="text-[11px] font-bold text-zinc-200 mb-1 border-b border-zinc-800 pb-0.5">
              {MONTHS[hoveredIdx].full}
            </p>
            {data[hoveredIdx].currentYear !== undefined && (
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="text-blue-400 font-medium">Текущий год:</span>
                <span className="text-zinc-100 font-mono font-bold">
                  {formatValue(data[hoveredIdx].currentYear!)}
                </span>
              </div>
            )}
            {data[hoveredIdx].prevYear !== undefined && (
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="text-zinc-400 font-medium">Прошлый год:</span>
                <span className="text-zinc-300 font-mono font-semibold">
                  {formatValue(data[hoveredIdx].prevYear!)}
                </span>
              </div>
            )}
            {data[hoveredIdx].currentYear === undefined && data[hoveredIdx].prevYear === undefined && (
              <span className="text-zinc-500 text-[10px]">Нет данных</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
