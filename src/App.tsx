import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import type { DateRange } from "react-day-picker"
import { Toaster } from "sonner"
import { Header } from "./components/Header"
import { DashboardPage } from "./pages/DashboardPage"
import { NelikvidPage } from "./pages/NelikvidPage"
import Login from "./pages/login/login"
import { checkAuth } from "./lib/auth"

const STORAGE_KEY = "selected_date_range"
const BRANCH_STORAGE_KEY = "selected_branch"

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

const getInitialBranch = (): number => {
  try {
    const saved = localStorage.getItem(BRANCH_STORAGE_KEY)
    if (saved) {
      const parsed = Number(saved)
      if (!isNaN(parsed) && [1, 2, 3, 4].includes(parsed)) {
        return parsed
      }
    }
  } catch (e) {
    console.error("Error reading saved branch:", e)
  }
  return 1
}

const ProtectedLayout = ({
  date,
  branch,
  onDateChange,
  onBranchChange,
}: {
  date: DateRange | undefined
  branch: number
  onDateChange: (date: DateRange | undefined) => void
  onBranchChange: (branch: number) => void
}) => {
  if (!checkAuth()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans flex flex-col">
      <Header
        date={date}
        branch={branch}
        onDateChange={onDateChange}
        onBranchChange={onBranchChange}
      />
      <main className="w-full max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-10 flex-1">
        <Routes>
          <Route path="/" element={<DashboardPage date={date} branch={branch} />} />
          <Route path="/dashboard" element={<DashboardPage date={date} branch={branch} />} />
          <Route path="/nelikvid" element={<NelikvidPage date={date} branch={branch} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

const App = () => {
  const [date, setDate] = useState<DateRange | undefined>(getInitialDate)
  const [branch, setBranch] = useState<number>(getInitialBranch)

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

  const handleBranchChange = (newBranch: number) => {
    setBranch(newBranch)
    try {
      localStorage.setItem(BRANCH_STORAGE_KEY, String(newBranch))
    } catch (e) {
      console.error("Error saving branch:", e)
    }
  }

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedLayout
              date={date}
              branch={branch}
              onDateChange={handleDateChange}
              onBranchChange={handleBranchChange}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App