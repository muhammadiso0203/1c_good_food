import { Header } from "./components/Header"
import { StatsCards } from "./components/StatsCards"
import { FiliallarSavdosi } from "./components/FiliallarSavdosi"
import { SavdoDinamikasi } from "./components/SavdoDinamikasi"
import { OstatkiTovara } from "./components/OstatkiTovara"
import { TopTovari } from "./components/TopTovari"
import { StatusOstatkov } from "./components/StatusOstatkov"
import { DengiNaSchetax } from "./components/DengiNaSchetax"
import { NelikvidniyTovar } from "./components/NelikvidniyTovar"
import { DebitorskayaZadoljennost } from "./components/DebitorskayaZadoljennost"
import { TrebuyetVnimaniya } from "./components/TrebuyetVnimaniya"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans">
      <Header />
      <main className="w-full pb-10 px-4">
        <StatsCards />

        {/* Upper Main Dashboard Grid */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {/* Left Block (3/4 Width) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Top Row */}
            <div className="grid grid-cols-2 gap-4">
              <FiliallarSavdosi />
              <SavdoDinamikasi />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-3 gap-4">
              <OstatkiTovara />
              <TopTovari />
              <StatusOstatkov />
            </div>
          </div>

          {/* Right Column (1/4 Width) */}
          <div className="xl:col-span-1 flex flex-col gap-4">
            <TrebuyetVnimaniya />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <DengiNaSchetax />
          <NelikvidniyTovar />
          <DebitorskayaZadoljennost />
        </div>
      </main>
    </div>
  )
}

export default App