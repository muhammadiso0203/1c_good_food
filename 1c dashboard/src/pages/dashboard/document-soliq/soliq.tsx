import { FileText, FileCheck, Clock, AlertTriangle } from "lucide-react";
import { useSoliqData } from "./service/useGetSoliqData";
import StatsCards from "@/components/dashboard/StatsCards";
import SoliqDocumentsChart from "@/components/charts/SoliqDocumentsChart";
import SoliqDocumentTypeChart from "@/components/charts/SoliqDocumentTypeChart";
import DocumentStatusChart from "@/components/charts/DocumentStatusChart";
import AverageProcessingTimeChart from "@/components/charts/AverageProcessingTimeChart";
import RecentDocumentsTable from "@/components/dashboard/RecentDocumentsTable";

const iconMap = {
  "Создано за месяц": FileText,
  "Зарегистрировано": FileCheck,
  "В обработке": Clock,
  "Требуют внимания": AlertTriangle,
};

const Soliq = () => {
  const { data, isLoading } = useSoliqData();

  const mappedStats = data?.map((item) => ({
    title: item.name,
    value: item.value,
    trend: item.desc || "",
    icon: iconMap[item.name as keyof typeof iconMap] || FileText,
  }));

  return (
    <>
      <div className="mt-5">
        <StatsCards stats={mappedStats} isLoading={isLoading} />
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoliqDocumentsChart />
        <SoliqDocumentTypeChart />
      </div>
      <div className="mt-5">
        <DocumentStatusChart />
      </div>
      <div className="mt-5">
        <AverageProcessingTimeChart />
      </div>
      <div className="mt-5">
        <RecentDocumentsTable />
      </div>
    </>
  );
};

export default Soliq;