import type { DateRange } from "react-day-picker"
import { StatsCards } from "../components/StatsCards"
import { FiliallarSavdosi } from "../components/FiliallarSavdosi"
import { SavdoDinamikasi } from "../components/SavdoDinamikasi"
import { OstatkiTovara } from "../components/OstatkiTovara"
import { TopTovari } from "../components/TopTovari"
import { StatusOstatkov } from "../components/StatusOstatkov"
import { DengiNaSchetax } from "../components/DengiNaSchetax"
import { DebitorskayaZadoljennost } from "../components/DebitorskayaZadoljennost"
import { TrebuyetVnimaniya } from "../components/TrebuyetVnimaniya"
import { CreditorskayaZadoljennost } from "../components/creditorskaya"

interface DashboardPageProps {
  date: DateRange | undefined
}

export function DashboardPage({ date }: DashboardPageProps) {
  return (
    <>
      <StatsCards date={date} />

      {/* Upper Main Dashboard Grid */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* Left Block (3/4 Width) */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-4">
            <FiliallarSavdosi />
            <SavdoDinamikasi date={date} />
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-3 gap-4">
            <OstatkiTovara date={date} />
            <TopTovari date={date} />
            <StatusOstatkov />
          </div>
        </div>

        {/* Right Column (1/4 Width) */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <TrebuyetVnimaniya />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <DengiNaSchetax date={date} />
        <DebitorskayaZadoljennost />
        <CreditorskayaZadoljennost />
      </div>
    </>
  )
}
