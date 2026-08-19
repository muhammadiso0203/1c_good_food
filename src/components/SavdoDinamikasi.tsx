import { Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { useData } from "../service/useData"
import { useEffect, useMemo, useRef, useState } from "react"

interface ChartDataPoint {
  month: string
  currentYear?: number
  prevYear: number
}

const MONTHS = [
  { name: "Янв", full: "Январь", defCurr: 7.67, defPrev: 4.72 },
  { name: "Фев", full: "Февраль", defCurr: 8.43, defPrev: 5.60 },
  { name: "Мар", full: "Март", defCurr: 9.57, defPrev: 5.78 },
  { name: "Апр", full: "Апрель", defCurr: 8.42, defPrev: 6.97 },
  { name: "Май", full: "Май", defCurr: 8.27, defPrev: 6.97 },
  { name: "Июн", full: "Июнь", defCurr: 8.68, defPrev: 5.78 },
  { name: "Июл", full: "Июль", defCurr: 7.64, defPrev: 6.33 },
  { name: "Авг", full: "Август", defCurr: 0.0009, defPrev: 6.33 },
  { name: "Сен", full: "Сентябрь", defCurr: undefined, defPrev: 9.55 },
  { name: "Окт", full: "Октябрь", defCurr: undefined, defPrev: 10.85 },
  { name: "Ноя", full: "Ноябрь", defCurr: undefined, defPrev: 10.54 },
  { name: "Дек", full: "Декабрь", defCurr: undefined, defPrev: 0 },
]

export function SavdoDinamikasi({ date }: { date?: DateRange }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 175 })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const { data: apiData, isLoading, isFetching } = useData(date)

  const data: ChartDataPoint[] = useMemo(() => {
    return MONTHS.map((m, i) => {
      const idx = i + 1
      let currRaw: number | undefined
      let prevRaw: number | undefined

      if (apiData) {
        for (const k in apiData) {
          if (k.startsWith(`ДинамикаПродаж_${idx}_`)) currRaw = apiData[k]
          else if (k.startsWith(`ДинамикаПродажПредыдущий_${idx}_`) || k.startsWith(`ДинамикаПродажПредудущий_${idx}_`)) {
            prevRaw = apiData[k]
          }
        }
      }

      const parseVal = (val: number | undefined, def: number | undefined) =>
        val !== undefined ? (val > 0 ? Number((val > 100 ? val / 1000 : val).toFixed(2)) : undefined) : def

      return {
        month: m.name,
        currentYear: parseVal(currRaw, m.defCurr),
        prevYear: parseVal(prevRaw, m.defPrev) ?? m.defPrev,
      }
    })
  }, [apiData])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setDimensions({ width: Math.max(entry.contentRect.width, 300), height: 175 })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const paddingLeft = 40, paddingRight = 65, paddingTop = 20, paddingBottom = 25
  const chartWidth = dimensions.width - paddingLeft - paddingRight
  const chartHeight = dimensions.height - paddingTop - paddingBottom

  const yMax = useMemo(() => {
    let max = 12
    data.forEach((d) => {
      if (d.currentYear && d.currentYear > max) max = d.currentYear
      if (d.prevYear && d.prevYear > max) max = d.prevYear
    })
    return Math.ceil(max)
  }, [data])

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(yMax * r))

  const getCoords = (index: number, val: number) => ({
    x: paddingLeft + (index / (data.length - 1)) * chartWidth,
    y: paddingTop + chartHeight - (val / yMax) * chartHeight,
  })

  const currentYearPoints = data
    .map((d, i) => (d.currentYear !== undefined ? { ...getCoords(i, d.currentYear), origIdx: i } : null))
    .filter((p): p is { x: number; y: number; origIdx: number } => p !== null)

  const prevYearPoints = data.map((d, i) => ({ ...getCoords(i, d.prevYear), origIdx: i }))

  const getSmoothPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return ""
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
    const highestVal = Math.max(data[idx].currentYear ?? 0, data[idx].prevYear)
    setTooltipPos({ x: hoverX, y: paddingTop + chartHeight - (highestVal / yMax) * chartHeight - 10 })
  }

  const formatValue = (val: number) => `${val.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} млн`

  const lastCurr = currentYearPoints.slice(-1)[0]
  const lastPrev = prevYearPoints[10] ?? prevYearPoints.slice(-1)[0]

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none h-full">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 z-20 bg-gray-900/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-xs font-medium text-zinc-300">Загрузка данных...</span>
          </div>
        )}

        <div className="flex flex-col gap-3 mb-5">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДИНАМИКА ПРОДАЖ (МЕСЯЦЫ)
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-2 bg-blue-500 block" />
              <span className="text-zinc-300 font-medium">Текущий год</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex gap-0.5 items-center">
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
              </span>
              <span className="text-zinc-400 font-medium">Прошлый год</span>
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
            <path d={getSmoothPath(prevYearPoints)} fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-300" />
            <path d={getSmoothPath(currentYearPoints)} fill="none" stroke="#3b82f6" strokeWidth="2.5" className="transition-all duration-300" />
          </g>

          {/* Dots */}
          <g>
            {prevYearPoints.map((p, i) => (
              <circle key={`prev-${i}`} cx={p.x} cy={p.y} r={hoveredIdx === i ? 5 : 3.5} fill="#1f2937" stroke="#6b7280" strokeWidth={hoveredIdx === i ? 2.5 : 1.5} className="transition-all duration-150 cursor-pointer" />
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
                {formatValue(data[lastPrev.origIdx].prevYear)}
              </text>
            )}
          </g>

          {/* X Axis Labels */}
          <g>
            {data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * chartWidth
              return (
                <g key={i}>
                  <line x1={x} y1={paddingTop + chartHeight} x2={x} y2={paddingTop + chartHeight + 4} stroke="rgba(63, 63, 70, 0.4)" strokeWidth="1" />
                  <text x={x} y={paddingTop + chartHeight + 18} textAnchor="middle" fill="rgba(161, 161, 170, 0.6)" className="text-[9px] sm:text-[10px] font-medium font-sans">{d.month}</text>
                </g>
              )
            })}
          </g>

          {/* Hover Line */}
          {hoveredIdx !== null && (
            <line x1={paddingLeft + (hoveredIdx / (data.length - 1)) * chartWidth} y1={paddingTop} x2={paddingLeft + (hoveredIdx / (data.length - 1)) * chartWidth} y2={paddingTop + chartHeight} stroke="rgba(147, 197, 253, 0.25)" strokeWidth="1.5" strokeDasharray="2 2" className="pointer-events-none animate-fade-in" />
          )}
        </svg>

        {/* Tooltip */}
        {hoveredIdx !== null && (
          <div className="absolute z-10 p-2.5 bg-gray-950/90 border border-zinc-700/50 rounded-lg pointer-events-none text-xs flex flex-col gap-1 transition-all duration-75" style={{ left: `${Math.min(Math.max(tooltipPos.x - 70, 10), dimensions.width - 150)}px`, top: `${Math.max(tooltipPos.y - 75, 10)}px` }}>
            <div className="font-bold text-zinc-300 border-b border-zinc-800 pb-1 mb-1">{data[hoveredIdx].month}</div>
            {data[hoveredIdx].currentYear !== undefined && (
              <div className="flex items-center justify-between gap-4 text-blue-400">
                <span className="font-medium text-zinc-400">Текущий:</span>
                <span className="font-bold">{formatValue(data[hoveredIdx].currentYear!)}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-4 text-zinc-400">
              <span className="font-medium text-zinc-400">Прошлый:</span>
              <span className="font-bold text-zinc-300">{formatValue(data[hoveredIdx].prevYear)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
