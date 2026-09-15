import { Activity, Building2, Users, Landmark } from "lucide-react";
import { useGetBugxalteriya } from "./service/useBugxalteriya";
import StatsCards from "@/components/dashboard/StatsCards";
import ProcessedOperationsChart from "@/components/charts/ProcessedOperationsChart";
import CostSavingsDynamicsChart from "@/components/charts/CostSavingsDynamicsChart";
import BranchEfficiencyChart from "@/components/charts/BranchEfficiencyChart";
import AccountingBottomSection from "@/components/dashboard/AccountingBottomSection";

const iconMap = {
  "Обработано операций": Activity,
  "Филиалов в системе": Building2,
  "Бухгалтеров": Users,
  "Экономия за квартал": Landmark,
};

const Bugxalteriya = () => {
  const { data, isLoading } = useGetBugxalteriya();

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc || "",
    icon: iconMap[item.name as keyof typeof iconMap] || Activity,
  }));

  return (
    <>
      <div className="mt-5">
        <StatsCards stats={mappedStats} isLoading={isLoading} />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProcessedOperationsChart />
        <CostSavingsDynamicsChart />
      </div>
      <div className="mt-5">
        <BranchEfficiencyChart />
      </div>
      <div className="mt-5">
        <AccountingBottomSection />
      </div>
    </>
  );
};

export default Bugxalteriya;
