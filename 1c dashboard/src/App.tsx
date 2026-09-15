import { Route, Routes } from "react-router"
import MainLayout from "./layout/MainLayout"
import Login from "./pages/auth/login/login"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main-layout" element={<MainLayout />} />
    </Routes>
    </>
  )
}

export default App