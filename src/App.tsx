import { Header } from "./components/Header"
import { StatsCards } from "./components/StatsCards"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans">
      <Header />
      <main className="w-full">
        <StatsCards />
      </main>
    </div>
  )
}

export default App