import * as XLSX from "xlsx"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import type { StatsCard } from "../pages/service/interface"

export interface ExcelColumn<T = any> {
  header: string
  key: keyof T | string
  width?: number
  format?: (value: any, item: T) => any
}

export function exportToExcel<T extends Record<string, any>>({
  filename,
  sheetName = "Sheet1",
  columns,
  data,
}: {
  filename: string
  sheetName?: string
  columns: ExcelColumn<T>[]
  data: T[]
}) {
  const headerRow = columns.map((col) => col.header)
  const rows = data.map((item, index) => {
    return columns.map((col) => {
      if (col.key === "__index__") {
        return index + 1
      }
      const rawVal = item[col.key as keyof T]
      if (col.format) {
        return col.format(rawVal, item)
      }
      return rawVal ?? ""
    })
  })

  const worksheetData = [headerRow, ...rows]
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

  const colWidths = columns.map((col) => {
    if (col.width) return { wch: col.width }
    const maxLen = Math.max(
      col.header.length,
      ...data.map((item) => {
        const val = col.format
          ? String(col.format(item[col.key as keyof T], item) ?? "")
          : String(item[col.key as keyof T] ?? "")
        return val.length
      })
    )
    return { wch: Math.min(Math.max(maxLen + 3, 10), 50) }
  })
  worksheet["!cols"] = colWidths

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  const finalFileName = filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`
  XLSX.writeFile(workbook, finalFileName)
}

function parseNumeric(val: unknown): number {
  if (val === undefined || val === null) return 0
  if (typeof val === "number") return isNaN(val) ? 0 : val
  if (typeof val === "string") {
    const cleaned = val.replace(/\s/g, "").replace(",", ".")
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

/**
 * Dashboard (Bosh sahifa) ma'lumotlarini to'liq Excel kitobiga eksport qilish
 */
export function exportDashboardToExcel(
  apiData: StatsCard | undefined,
  dateRange?: DateRange,
  branchName: string = "Все филиалы"
) {
  const workbook = XLSX.utils.book_new()
  const dateFromStr = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : "—"
  const dateToStr = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : dateFromStr

  // 1-SHEET: KPI va Asosiy ko'rsatkichlar
  const kpiData: (string | number)[][] = [
    ["ОТЧЕТ ПО ПОКАЗАТЕЛЯМ ДАШБОРДА (GOOD FOOD)"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    ["Филиал:", branchName],
    ["Дата выгрузки:", format(new Date(), "dd.MM.yyyy HH:mm")],
    [],
    ["№", "Показатель", "Значение (сум / кол-во)"],
    [1, "Продажи сегодня", parseNumeric(apiData?.ПродажиСегодня)],
    [2, "Продажи за выбранный период", parseNumeric(apiData?.ПродажиПериод)],
    [3, "Валовая прибыль", parseNumeric(apiData?.ВаловаяПрибыль)],
    [4, "Остаток товара на складах", parseNumeric(apiData?.ОстатокТовара)],
    [5, "Деньги на расчётных счетах", parseNumeric(apiData?.ДеньгиНаСчетах)],
    [6, "Деньги в кассах", parseNumeric(apiData?.ДеньгиВКассах)],
    [7, "Дебиторская задолженность (всего)", parseNumeric(apiData?.ДебиторскаяЗадолженность)],
    [8, "Просроченная дебиторская задолженность", parseNumeric(apiData?.ПросроченнаяДебиторка)],
    [9, "Неликвидный товар (>30 дней)", parseNumeric(apiData?.НеликвидныйТовар_30дней)],
  ]

  const wsKpi = XLSX.utils.aoa_to_sheet(kpiData)
  wsKpi["!cols"] = [{ wch: 6 }, { wch: 45 }, { wch: 25 }]
  XLSX.utils.book_append_sheet(workbook, wsKpi, "Основные показатели")

  // 2-SHEET: Qoldiqlar (Остатки товара по филиалам)
  const branches = [
    { key: "ОстаткиТовара_Сырдарьинская_область", name: "Гулистан" },
    { key: "ОстаткиТовара_Ташкентская_область", name: "Ташкент" },
    { key: "ОстаткиТовара_Джизакская_область", name: "Джизак" },
  ]
  const branchRows: (string | number)[][] = [
    ["ОСТАТКИ ТОВАРА ПО ФИЛИАЛАМ"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    [],
    ["№", "Филиал", "Остаток (сум)"],
  ]
  let branchTotal = 0
  branches.forEach((b, idx) => {
    let val = 0
    if (apiData) {
      for (const [k, v] of Object.entries(apiData)) {
        const kLower = k.toLowerCase()
        if (
          k === b.key ||
          (kLower.includes("остат") &&
            (kLower.includes(b.key.toLowerCase()) ||
              kLower.includes(b.name.toLowerCase()) ||
              (b.name === "Гулистан" && (kLower.includes("сырдар") || kLower.includes("сурдар") || kLower.includes("гулис"))) ||
              (b.name === "Ташкент" && (kLower.includes("ташкент") || kLower.includes("тошкент"))) ||
              (b.name === "Джизак" && (kLower.includes("джизак") || kLower.includes("жиззах")))))
        ) {
          val = parseNumeric(v)
        }
      }
    }
    branchTotal += val
    branchRows.push([idx + 1, b.name, val])
  })
  branchRows.push(["", "ИТОГО", branchTotal])

  const wsBranches = XLSX.utils.aoa_to_sheet(branchRows)
  wsBranches["!cols"] = [{ wch: 6 }, { wch: 25 }, { wch: 25 }]
  XLSX.utils.book_append_sheet(workbook, wsBranches, "Остатки по филиалам")

  // SHEET: Продажи по филиалам
  const salesBranchRows: (string | number)[][] = [
    ["ПРОДАЖИ ПО ФИЛИАЛАМ"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    [],
    ["№", "Филиал", "Сегодня (сум)", "За период (сум)", "План (сум)", "Выполнение (%)"],
  ]
  const branchNameMapping: Record<string, string> = {
    "3": "Гулистон",
    "2": "Ташкент",
    "4": "Джизак",
  }
  let sTodayTotal = 0
  let sMonthTotal = 0
  let sPlanTotal = 0
  let sRowIdx = 1

  if (apiData) {
    for (const [k, v] of Object.entries(apiData)) {
      if (k.toLowerCase().startsWith("продажипофилиалам_") && typeof v === "string") {
        const id = k.replace(/^ПродажиПоФилиалам_/i, "").trim()
        const fName = branchNameMapping[id] || `Филиал ${id}`
        const parts = v.split("_")
        const today = parseNumeric(parts[0])
        const month = parseNumeric(parts[1])
        const plan = parseNumeric(parts[2])
        let percent = parseNumeric(parts[3])
        if (percent === 0 && plan > 0 && month > 0) {
          percent = Math.round((month / plan) * 100)
        }
        sTodayTotal += today
        sMonthTotal += month
        sPlanTotal += plan
        salesBranchRows.push([sRowIdx++, fName, today, month, plan, `${percent}%`])
      }
    }
  }
  const totalPercent = sPlanTotal > 0 ? Math.round((sMonthTotal / sPlanTotal) * 100) : 0
  salesBranchRows.push(["", "ИТОГО", sTodayTotal, sMonthTotal, sPlanTotal, `${totalPercent}%`])

  const wsSalesBranches = XLSX.utils.aoa_to_sheet(salesBranchRows)
  wsSalesBranches["!cols"] = [{ wch: 6 }, { wch: 20 }, { wch: 20 }, { wch: 22 }, { wch: 20 }, { wch: 18 }]
  XLSX.utils.book_append_sheet(workbook, wsSalesBranches, "Продажи по филиалам")

  // SHEET: Статус остатков (SKU)
  const skuRows: (string | number)[][] = [
    ["СТАТУС ОСТАТКОВ (SKU)"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    [],
    ["№", "Категория", "Количество (SKU)", "Доля (%)"],
  ]
  const parseSkuVal = (val: unknown) => {
    if (typeof val === "string") {
      const parts = val.split("_")
      return { sku: parseNumeric(parts[0]), foiz: parseNumeric(parts[1]) }
    }
    return { sku: parseNumeric(val), foiz: 0 }
  }
  const skuNorm = parseSkuVal(apiData?.СтатусОстатков_вопрос_14_НормаЗапаса)
  const skuMalo = parseSkuVal(apiData?.СтатусОстатков_вопрос_14_Мало)
  const skuNet = parseSkuVal(apiData?.СтатусОстатков_вопрос_14_НетВНаличии)
  const totalSkuSum = skuNorm.sku + skuMalo.sku + skuNet.sku
  const getFoiz = (item: { sku: number; foiz: number }) => {
    if (item.foiz > 0) return item.foiz
    if (totalSkuSum > 0 && item.sku > 0) return Math.round((item.sku / totalSkuSum) * 100)
    return 0
  }
  skuRows.push([1, "Норма запаса", skuNorm.sku, `${getFoiz(skuNorm)}%`])
  skuRows.push([2, "Мало (<= мин. запаса)", skuMalo.sku, `${getFoiz(skuMalo)}%`])
  skuRows.push([3, "Нет в наличии", skuNet.sku, `${getFoiz(skuNet)}%`])
  skuRows.push(["", "ВСЕГО SKU", totalSkuSum, "100%"])

  const wsSku = XLSX.utils.aoa_to_sheet(skuRows)
  wsSku["!cols"] = [{ wch: 6 }, { wch: 30 }, { wch: 20 }, { wch: 15 }]
  XLSX.utils.book_append_sheet(workbook, wsSku, "Статус остатков (SKU)")

  // 3-SHEET: Debitorlik va Kreditorlik qarzdorlik
  const debtPeriods = [
    { label: "до 15 дней", debKey: "15", credKey: "15" },
    { label: "от 15 до 30 дней", debKey: "15_30", credKey: "15_30" },
    { label: "от 30 до 60 дней", debKey: "30_60", credKey: "30_60" },
    { label: "от 60 до 90 дней", debKey: "60_90", credKey: "60_90" },
    { label: "более 90 дней", debKey: "90", credKey: "90" },
  ]

  const getDebtVal = (type: string, isDebitor: boolean) => {
    if (!apiData) return 0
    for (const [key, value] of Object.entries(apiData)) {
      const k = key.toLowerCase().trim()
      const matchWord = isDebitor ? k.includes("дебитор") : k.includes("кредитор")
      if (!matchWord) continue
      if (type === "15" && /(?:_|\b)15$/.test(k) && !k.includes("15_30")) return parseNumeric(value)
      if (type === "15_30" && /(?:_|\b)15_30$/.test(k)) return parseNumeric(value)
      if (type === "30_60" && /(?:_|\b)30_60$/.test(k)) return parseNumeric(value)
      if (type === "60_90" && /(?:_|\b)60_90$/.test(k)) return parseNumeric(value)
      if (type === "90" && /(?:_|\b)90$/.test(k) && !k.includes("60_90")) return parseNumeric(value)
    }
    return 0
  }

  const debtRows: (string | number)[][] = [
    ["ЗАДОЛЖЕННОСТЬ (ДЕБИТОРСКАЯ И КРЕДИТОРСКАЯ)"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    [],
    ["№", "Срок задолженности", "Дебиторская (сум)", "Кредиторская (сум)"],
  ]
  let debTotal = 0
  let credTotal = 0
  debtPeriods.forEach((p, idx) => {
    const deb = getDebtVal(p.debKey, true)
    const cred = getDebtVal(p.credKey, false)
    debTotal += deb
    credTotal += cred
    debtRows.push([idx + 1, p.label, deb, cred])
  })
  debtRows.push(["", "ИТОГО", debTotal, credTotal])

  const wsDebt = XLSX.utils.aoa_to_sheet(debtRows)
  wsDebt["!cols"] = [{ wch: 6 }, { wch: 25 }, { wch: 25 }, { wch: 25 }]
  XLSX.utils.book_append_sheet(workbook, wsDebt, "Задолженность")

  // 4-SHEET: Hisoblar va Kassadagi pullar
  const moneyRows: (string | number)[][] = [
    ["ДЕНЬГИ НА СЧЕТАХ И В КАССАХ"],
    ["Период:", `${dateFromStr} — ${dateToStr}`],
    [],
    ["№", "Тип", "Наименование", "Остаток (сум)"],
  ]
  let mIdx = 1
  let moneyTotal = 0
  if (apiData) {
    for (const [key, value] of Object.entries(apiData)) {
      if (
        key.startsWith("РасчётныйСчёт_") ||
        key.startsWith("РасчетныйСчет_") ||
        key.startsWith("Касса_") ||
        key.toLowerCase().includes("счет") ||
        key.toLowerCase().includes("счёт") ||
        key.toLowerCase().includes("касса")
      ) {
        const val = parseNumeric(value)
        if (val > 0) {
          const isKassa = key.toLowerCase().includes("касса")
          const type = isKassa ? "Касса" : "Расчётный счёт"
          const cleanName = key
            .replace(/^(?:РасчётныйСчёт_|РасчетныйСчет_|Касса_)/i, "")
            .replace(/_+/g, " ")
          moneyRows.push([mIdx++, type, cleanName, val])
          moneyTotal += val
        }
      }
    }
  }
  moneyRows.push(["", "", "ИТОГО", moneyTotal])

  const wsMoney = XLSX.utils.aoa_to_sheet(moneyRows)
  wsMoney["!cols"] = [{ wch: 6 }, { wch: 18 }, { wch: 35 }, { wch: 25 }]
  XLSX.utils.book_append_sheet(workbook, wsMoney, "Деньги на счетах и кассах")

  // Faylni yuklab olish
  const nowStr = format(new Date(), "yyyy-MM-dd")
  const fileName = `Dashboard_Otchet_${nowStr}.xlsx`
  XLSX.writeFile(workbook, fileName)
}
