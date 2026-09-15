import { Activity, TrendingDown, TriangleAlert, Zap } from "lucide-react"
import StatsCards from "../../../components/dashboard/StatsCards"
import EnergyConsumptionChart from "@/components/charts/energyConsumptionChart"
import PlanVsFactChart from "@/components/charts/planVsFactChart"
import DeviceStatusTable from "@/components/dashboard/DeviceStatusTable"
import DashboardWidgets from "@/components/dashboard/DashboardWidgets"


const dashboardStats = [
  {
    title: "Текущее потребление",
    value: "178 МВт·ч",
    trend: "В пределах нормы",
    icon: Zap
  },
  {
    title: "Экономия за месяц",
    value: "55 МВт·ч",
    trend: "-4.2% к плану",
    icon: TrendingDown
  },
  {
    title: "Активных счетчиков",
    value: "403 / 409",
    trend: "В6 требуют внимания",
    icon: Activity
  }, 
  {
    title: "Критических событий",
    value: "6",
    trend: "2 новых за сутки",
    icon: TriangleAlert
  }
]
const Mdmc = () => {
  return (
    <>
      <StatsCards stats={dashboardStats} />
      <div className="grid grid-cols-2  gap-4 mt-5">
        <EnergyConsumptionChart />
        <PlanVsFactChart/>
      </div>
      <div className="mt-5">
        <DeviceStatusTable/>
      </div>
      <div className="mt-5">
        <DashboardWidgets/>
      </div>
    </>
  )
}

export default Mdmc