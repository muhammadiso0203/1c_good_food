import { Activity, DollarSign, TrendingUp } from "lucide-react"
import { useGetPolucheniya } from "./service/usePolucheniya"
import StatsCards from "@/components/dashboard/StatsCards"
import PurchaseSaleDynamicsChart from "@/components/charts/PurchaseSaleDynamicsChart"
import SupplierStructureChart from "@/components/charts/SupplierStructureChart"
import AveragePricesChart from "@/components/charts/AveragePricesChart"
import RegionConsumptionTable from "@/components/dashboard/RegionConsumptionTable"

const iconMap ={
  "Закуплено за месяц": DollarSign,
  "Реализовано": TrendingUp,
  "Общая стоимость": DollarSign,
  "Активных контрактов": Activity
}

const Polucheniya = () => {
  const { data, isLoading } = useGetPolucheniya()

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc,
    icon: iconMap[item.name as keyof typeof iconMap] || DollarSign,
  }));

  return (
    <>
    <div className="mt-5">
      <StatsCards stats={mappedStats} isLoading={isLoading}/>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-6">
      <PurchaseSaleDynamicsChart />
      <SupplierStructureChart />
    </div>
    <div className="mt-6 grid grid-cols-2 gap-6">
      <AveragePricesChart />
      <RegionConsumptionTable />
    </div>
    </>
  )
}

export default Polucheniya