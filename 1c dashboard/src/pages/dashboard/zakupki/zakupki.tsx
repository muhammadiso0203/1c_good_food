import { ShoppingBag, Banknote, FileCheck, Landmark } from "lucide-react";
import { useGetZakupki } from "./service/useZakupki";
import StatsCards from "@/components/dashboard/StatsCards";
import TopSuppliersChart from "@/components/charts/TopSuppliersChart";
import PurchasesByMethodChart from "@/components/charts/PurchasesByMethodChart";
import CurrentTendersTable from "@/components/dashboard/CurrentTendersTable";

const iconMap = {
  "Всего закупок": ShoppingBag,
  "Сумма закупок": Banknote,
  "Активные контракты": FileCheck,
  "Экономия": Landmark,
};

const Zakupki = () => {
  const { data, isLoading } = useGetZakupki();

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc || "",
    icon: iconMap[item.name as keyof typeof iconMap] || ShoppingBag,
  }));

  return (
    <>
      <div className="mt-5">
        <StatsCards stats={mappedStats} isLoading={isLoading} />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSuppliersChart />
        <PurchasesByMethodChart />
      </div>
      <div className="mt-5">
        <CurrentTendersTable />
      </div>
    </>
  );
};

export default Zakupki;

