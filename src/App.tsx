import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import type { DateRange } from "react-day-picker"
import { Toaster } from "sonner"
import { Header } from "./components/Header"
import { DashboardPage } from "./pages/DashboardPage"
import { NelikvidPage } from "./pages/NelikvidPage"
import Login from "./pages/login/login"
import { checkAuth } from "./lib/auth"

export const getDefaultDateRange = (): DateRange => {
  const now = new Date()
  return {
    from: new Date(now.getFullYear(), 0, 1), // 01.01 of current year
    to: now, // today
  }
}

const ProtectedLayout = () => {
  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange)
  const [branch, setBranch] = useState<number>(1)

  if (!checkAuth()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-zinc-100 font-sans flex flex-col">
      <Header
        date={date}
        branch={branch}
        onDateChange={setDate}
        onBranchChange={setBranch}
      />
      <main className="w-full max-w-[2000px] 2xl:max-w-[2560px] 3xl:max-w-[3200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-10 pb-12 flex-1">
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
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App