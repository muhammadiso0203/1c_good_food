import { Calculator, CheckSquare, Percent, AlertCircle } from "lucide-react";
import { useGetByudjetirovaniya } from "./service/useByudjetirovaniya";
import StatsCards from "@/components/dashboard/StatsCards";
import PlanVsFactChart from "@/components/charts/planVsFactChart";
import BudgetStructureChart from "@/components/charts/BudgetStructureChart";
import DepartmentBudgetExecutionChart from "@/components/charts/DepartmentBudgetExecutionChart";
import H2ForecastChart from "@/components/charts/H2ForecastChart";
import ApprovalRequestsList from "@/components/dashboard/ApprovalRequestsList";

const iconMap = {
  "Плановый бюджет": Calculator,
  "Исполнено": CheckSquare,
  "Процент исполнения": Percent,
  "Остаток лимита": AlertCircle,
};

const Byudjetirovaniya = () => {
  const { data, isLoading } = useGetByudjetirovaniya();

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc || "",
    icon: iconMap[item.name as keyof typeof iconMap] || Calculator,
  }));

  return (
    <div className="w-full space-y-6">
      <div className="mt-5">
        <StatsCards stats={mappedStats} isLoading={isLoading} />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanVsFactChart />
        <BudgetStructureChart />
      </div>
      <div className="mt-5">
        <DepartmentBudgetExecutionChart />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <H2ForecastChart />
        <ApprovalRequestsList />
      </div>
    </div>
  );
};

export default Byudjetirovaniya;
