import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import type { DateRange } from "react-day-picker"
import { Header } from "./components/Header"
import { DashboardPage } from "./pages/DashboardPage"
import { NelikvidPage } from "./pages/NelikvidPage"

const STORAGE_KEY = "selected_date_range"

const getInitialDate = (): DateRange | undefined => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.from) {
        return {
          from: new Date(parsed.from),
          to: parsed.to ? new Date(parsed.to) : undefined,
        }
      }
    }
  } catch (e) {
    console.error("Error reading saved date:", e)
  }
  return {
    from: new Date(2026, 0, 1),
    to: new Date(2026, 11, 4),
  }
}

const App = () => {
  const [date, setDate] = useState<DateRange | undefined>(getInitialDate)

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    if (newDate) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            from: newDate.from ? newDate.from.toISOString() : null,
            to: newDate.to ? newDate.to.toISOString() : null,
          })
        )
      } catch (e) {
        console.error("Error saving date:", e)
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans">
        <Header date={date} onDateChange={handleDateChange} />
        <main className="w-full pb-10">
          <Routes>
            <Route path="/" element={<DashboardPage date={date} />} />
            <Route path="/nelikvid" element={<NelikvidPage date={date} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App