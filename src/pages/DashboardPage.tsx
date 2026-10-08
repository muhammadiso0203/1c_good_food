import type { DateRange } from "react-day-picker"
import { StatsCards } from "../components/StatsCards"
import { FiliallarSavdosi } from "../components/FiliallarSavdosi"
import { SavdoDinamikasi } from "../components/SavdoDinamikasi"
import { OstatkiTovara } from "../components/OstatkiTovara"
import { TopTovari } from "../components/TopTovari"
import { DengiNaSchetax } from "../components/DengiNaSchetax"
import { DebitorskayaZadoljennost } from "../components/DebitorskayaZadoljennost"
import { CreditorskayaZadoljennost } from "../components/creditorskaya"

interface DashboardPageProps {
  date: DateRange | undefined
  branch?: number
}

export function DashboardPage({ date, branch = 1 }: DashboardPageProps) {
  return (
    <div className="w-full flex flex-col gap-4 2xl:gap-5 3xl:gap-6">
      <StatsCards date={date} branch={branch} />

      {/* Top Row: Sales by Branches & Sales Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-5 3xl:gap-6 mt-1 sm:mt-2">
        <FiliallarSavdosi date={date} branch={branch} />
        <SavdoDinamikasi date={date} branch={branch} />
      </div>

      {/* Middle Row: Goods Remaining & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-5 3xl:gap-6">
        <OstatkiTovara date={date} branch={branch} />
        <TopTovari date={date} branch={branch} />
      </div>

      {/* Bottom Row: Cash/Bank Accounts & Debtor/Creditor Debt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-5 3xl:gap-6">
        <DengiNaSchetax date={date} branch={branch} />
        <DebitorskayaZadoljennost date={date} branch={branch} />
        <CreditorskayaZadoljennost date={date} branch={branch} />
      </div>
    </div>
  )
}


