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
  branch?: number
}

export function DashboardPage({ date, branch = 1 }: DashboardPageProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <StatsCards date={date} branch={branch} />

      {/* Upper Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-2">
        {/* Left Block (3/4 Width on Desktop) */}
        <div className="col-span-1 xl:col-span-3 flex flex-col gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FiliallarSavdosi />
            <SavdoDinamikasi date={date} branch={branch} />
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <OstatkiTovara date={date} branch={branch} />
            <TopTovari date={date} branch={branch} />
            <StatusOstatkov />
          </div>
        </div>

        {/* Right Column (1/4 Width on Desktop) */}
        <div className="col-span-1 xl:col-span-1 flex flex-col gap-4">
          <TrebuyetVnimaniya />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DengiNaSchetax date={date} branch={branch} />
        <DebitorskayaZadoljennost date={date} branch={branch} />
        <CreditorskayaZadoljennost date={date} branch={branch} />
      </div>
    </div>
  )
}

