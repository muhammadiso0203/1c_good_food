import { Warehouse, Layers, RefreshCw, AlertTriangle } from "lucide-react";
import { useGetSklat } from "./service/useSklat";
import StatsCards from "@/components/dashboard/StatsCards";
import WarehouseUtilizationChart from "@/components/charts/WarehouseUtilizationChart";
import ReceiptsShipmentsDynamicsChart from "@/components/charts/ReceiptsShipmentsDynamicsChart";
import LowStockItemsTable from "@/components/dashboard/LowStockItemsTable";

const iconMap = {
  "Товарные запасы": Warehouse,
  "Количество позиций": Layers,
  "Оборачиваемость": RefreshCw,
  "Дефицитные позиции": AlertTriangle,
};

const Sklat = () => {
  const { data, isLoading } = useGetSklat();

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc || "",
    icon: iconMap[item.name as keyof typeof iconMap] || Warehouse,
  }));

  return (
    <>
      <div className="mt-5">
        <StatsCards stats={mappedStats} isLoading={isLoading} />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WarehouseUtilizationChart />
        <ReceiptsShipmentsDynamicsChart />
      </div>
      <div className="mt-5">
        <LowStockItemsTable />
      </div>
    </>
  );
};

export default Sklat;