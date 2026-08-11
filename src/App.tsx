import { Header } from "./components/Header"
import { StatsCards } from "./components/StatsCards"
import { FiliallarSavdosi } from "./components/FiliallarSavdosi"
import { SavdoDinamikasi } from "./components/SavdoDinamikasi"
import { OstatkiTovara } from "./components/OstatkiTovara"
import { TopTovari } from "./components/TopTovari"
import { StatusOstatkov } from "./components/StatusOstatkov"
import { DengiNaSchetax } from "./components/DengiNaSchetax"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans">
      <Header />
      <main className="w-full pb-10">
        <StatsCards />
        <div className="grid grid-cols-2 gap-2">
          <FiliallarSavdosi />
          <SavdoDinamikasi />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <OstatkiTovara />
          <TopTovari />
          <StatusOstatkov />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <DengiNaSchetax />
        </div>
      </main>
    </div>
  )
}

export default App