import React, { useState, useRef, useEffect } from "react"

interface ChartDataPoint {
  month: string
  currentYear?: number // in млрд сум
  prevYear: number    // in млрд сум
}

const data: ChartDataPoint[] = [
  { month: "Янв", currentYear: 9.2, prevYear: 6.5 },
  { month: "Фев", currentYear: 15.5, prevYear: 10.2 },
  { month: "Мар", currentYear: 17.0, prevYear: 12.0 },
  { month: "Апр", currentYear: 18.8, prevYear: 13.0 },
  { month: "Май", currentYear: 17.2, prevYear: 14.8 },
  { month: "Июн", currentYear: 16.5, prevYear: 12.2 },
  { month: "Июл", currentYear: 18.5, prevYear: 13.5 },
  { month: "Авг", currentYear: 18.8, prevYear: 14.2 },
  { month: "Сен", currentYear: 20.5, prevYear: 16.0 },
  { month: "Окт", currentYear: 22.0, prevYear: 17.5 },
  { month: "Ноя", currentYear: 22.8, prevYear: 19.1 },
  { month: "Дек", currentYear: 24.3, prevYear: 20.5 },
]

export function SavdoDinamikasi() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 320 })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect
        // Keep a minimum width of 300, height responsive but bounded
        setDimensions({
          width: Math.max(width, 300),
          height: 320,
        })
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Padding inside the SVG
  const paddingLeft = 40
  const paddingRight = 65
  const paddingTop = 40
  const paddingBottom = 40

  const chartWidth = dimensions.width - paddingLeft - paddingRight
  const chartHeight = dimensions.height - paddingTop - paddingBottom

  // Y-axis values scale from 0 to 25
  const yMax = 25
  const yTicks = [0, 5, 10, 15, 20, 25]

  // Convert data points to SVG coordinates
  const getCoords = (index: number, val: number) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth
    const y = paddingTop + chartHeight - (val / yMax) * chartHeight
    return { x, y }
  }

  // Generate lists of coordinates for both lines
  const currentYearPoints = data
    .map((d, i) => (d.currentYear !== undefined ? getCoords(i, d.currentYear) : null))
    .filter((p): p is { x: number; y: number } => p !== null)

  const prevYearPoints = data
    .map((d, i) => getCoords(i, d.prevYear))

  // Generate smooth cubic bezier paths
  const getSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return ""
    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      // Control points for a smooth curve
      const cpX1 = p0.x + (p1.x - p0.x) * 0.4
      const cpY1 = p0.y
      const cpX2 = p1.x - (p1.x - p0.x) * 0.4
      const cpY2 = p1.y
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
    }
    return path
  }

  const currentYearPath = getSmoothPath(currentYearPoints)
  const prevYearPath = getSmoothPath(prevYearPoints)

  // Handle mouse move to display tooltips
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - paddingLeft
    
    // Find closest index based on mouse position
    const stepWidth = chartWidth / (data.length - 1)
    let idx = Math.round(mouseX / stepWidth)
    idx = Math.max(0, Math.min(data.length - 1, idx))

    setHoveredIdx(idx)

    // Tooltip position (just above the highest point of the hovered month)
    const hoverX = paddingLeft + idx * stepWidth
    const currentVal = data[idx].currentYear
    const prevVal = data[idx].prevYear
    const highestVal = currentVal !== undefined ? Math.max(currentVal, prevVal) : prevVal
    const hoverY = paddingTop + chartHeight - (highestVal / yMax) * chartHeight

    setTooltipPos({
      x: hoverX,
      y: hoverY - 10,
    })
  }

  const handleMouseLeave = () => {
    setHoveredIdx(null)
  }

  // Formatting utility for tooltip
  const formatValue = (val: number) => {
    return val.toLocaleString("ru-RU", { minimumFractionDigits: 1 }) + " млрд"
  }

  return (
    <div className="w-full px-3 mt-6">
      <div
        ref={containerRef}
        className="relative bg-gray-800/40 border border-zinc-800/60 rounded-xl p-5 select-none"
      >
        {/* Header Title */}
        <div className="flex flex-col gap-3 mb-5">
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ДИНАМИКА ПРОДАЖ (МЕСЯЦЫ)
          </h2>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-2 bg-blue-500 block" />
              <span className="text-zinc-300 font-medium">Текущий год</span>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Dashed line representation */}
              <span className="flex gap-0.5 items-center">
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
                <span className="w-1 h-0.5 bg-zinc-500 rounded-sm" />
              </span>
              <span className="text-zinc-400 font-medium">Прошлый год</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <svg
          width="100%"
          height={dimensions.height}
          className="overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grids and Axes */}
          <g>
            {yTicks.map((tick, i) => {
              const y = paddingTop + chartHeight - (tick / yMax) * chartHeight
              return (
                <g key={i}>
                  {/* Grid Lines */}
                  {tick > 0 && (
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={paddingLeft + chartWidth}
                      y2={y}
                      stroke="rgba(63, 63, 70, 0.15)"
                      strokeWidth="1"
                    />
                  )}
                  {/* Y Axis Tick Mark */}
                  <line
                    x1={paddingLeft - 4}
                    y1={y}
                    x2={paddingLeft}
                    y2={y}
                    stroke="rgba(63, 63, 70, 0.4)"
                    strokeWidth="1"
                  />
                  {/* Y Axis Label */}
                  <text
                    x={paddingLeft - 8}
                    y={y + 3}
                    textAnchor="end"
                    fill="rgba(161, 161, 170, 0.6)"
                    className="text-[10px] font-medium font-sans"
                  >
                    {tick}
                  </text>
                </g>
              )
            })}

            {/* Left Y-Axis line */}
            <line
              x1={paddingLeft}
              y1={paddingTop}
              x2={paddingLeft}
              y2={paddingTop + chartHeight}
              stroke="rgba(63, 63, 70, 0.4)"
              strokeWidth="1"
            />

            {/* Bottom X-Axis line */}
            <line
              x1={paddingLeft}
              y1={paddingTop + chartHeight}
              x2={paddingLeft + chartWidth}
              y2={paddingTop + chartHeight}
              stroke="rgba(63, 63, 70, 0.4)"
              strokeWidth="1"
            />
          </g>

          {/* Paths */}
          <g>
            {/* Previous Year - Dashed Grey Line */}
            <path
              d={prevYearPath}
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="transition-all duration-300"
            />

            {/* Current Year - Solid Blue Line */}
            <path
              d={currentYearPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />
          </g>

          {/* Dots and interactive points */}
          <g>
            {/* Previous Year Dots */}
            {prevYearPoints.map((p, i) => {
              const isHovered = hoveredIdx === i
              return (
                <circle
                  key={`prev-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : 3.5}
                  fill="#1f2937"
                  stroke="#6b7280"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-150 cursor-pointer"
                />
              )
            })}

            {/* Current Year Dots */}
            {currentYearPoints.map((p, i) => {
              const isHovered = hoveredIdx === i
              return (
                <circle
                  key={`curr-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#1f2937"
                  stroke="#3b82f6"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150 cursor-pointer"
                />
              )
            })}
          </g>

          {/* Last Data Labels (At November / point index 10) */}
          <g>
            {/* Current Year Value Label */}
            {currentYearPoints.length > 10 && (
              <g>
                <text
                  x={currentYearPoints[10].x + 10}
                  y={currentYearPoints[10].y + 3}
                  fill="#60a5fa"
                  className="text-[10px] sm:text-[11px] font-bold font-sans"
                >
                  22,8 млрд
                </text>
              </g>
            )}

            {/* Previous Year Value Label */}
            {prevYearPoints.length > 10 && (
              <g>
                <text
                  x={prevYearPoints[10].x + 10}
                  y={prevYearPoints[10].y + 3}
                  fill="#9ca3af"
                  className="text-[10px] sm:text-[11px] font-bold font-sans"
                >
                  19,1 млрд
                </text>
              </g>
            )}
          </g>

          {/* X Axis Labels and Tick Marks */}
          <g>
            {data.map((d, i) => {
              const x = paddingLeft + (i / (data.length - 1)) * chartWidth
              return (
                <g key={i}>
                  {/* X Axis Tick Mark */}
                  <line
                    x1={x}
                    y1={paddingTop + chartHeight}
                    x2={x}
                    y2={paddingTop + chartHeight + 4}
                    stroke="rgba(63, 63, 70, 0.4)"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={paddingTop + chartHeight + 18}
                    textAnchor="middle"
                    fill="rgba(161, 161, 170, 0.6)"
                    className="text-[9px] sm:text-[10px] font-medium font-sans"
                  >
                    {d.month}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Hover Vertical Line */}
          {hoveredIdx !== null && (
            <line
              x1={paddingLeft + (hoveredIdx / (data.length - 1)) * chartWidth}
              y1={paddingTop}
              x2={paddingLeft + (hoveredIdx / (data.length - 1)) * chartWidth}
              y2={paddingTop + chartHeight}
              stroke="rgba(147, 197, 253, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              className="pointer-events-none animate-fade-in"
            />
          )}
        </svg>

        {/* HTML Tooltip positioned absolute above the SVG */}
        {hoveredIdx !== null && (
          <div
            className="absolute z-10 p-2.5 bg-gray-950/90 border border-zinc-700/50 rounded-lg pointer-events-none text-xs flex flex-col gap-1 transition-all duration-75"
            style={{
              left: `${Math.min(
                Math.max(tooltipPos.x - 70, 10),
                dimensions.width - 150
              )}px`,
              top: `${Math.max(tooltipPos.y - 75, 10)}px`,
            }}
          >
            <div className="font-bold text-zinc-300 border-b border-zinc-800 pb-1 mb-1">
              {data[hoveredIdx].month}
            </div>
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
