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
