import { Users, UserPlus, UserMinus, Briefcase } from "lucide-react";
import { useKadr } from "@/pages/dashboard/kadri/service/useKadr";
import StatsCards from "@/components/dashboard/StatsCards";
import PersonnelMovementChart from "@/components/charts/PersonnelMovementChart";
import GenderDistributionChart from "@/components/charts/GenderDistributionChart";
import EducationLevelChart from "@/components/charts/EducationLevelChart";
import AgeDistributionVerticalChart from "@/components/charts/AgeDistributionVerticalChart";
import TenureSeniorityChart from "@/components/charts/TenureSeniorityChart";
import DepartmentSickLeavesChart from "@/components/charts/DepartmentSickLeavesChart";
import DepartmentVacationsChart from "@/components/charts/DepartmentVacationsChart";
import EmployeeProfilesList from "@/components/dashboard/EmployeeProfilesList";
import WorkSchedulesTable from "@/components/dashboard/WorkSchedulesTable";

const Kadri = () => {
  const { data, isLoading } = useKadr();

  const totalEmployees = data?.Totalemployees || 1247;
  const totalEmployeesChange = data?.Totalemployeeschange || 23;
  const hiringEmployees = data?.HiringEmployees || 28;
  const hiringEmployeesChange = data?.ChangesInHiring || 12;
  const dismissalEmployees = data?.DismissalOfEmployees || 8;
  const dismissalEmployeesChange = data?.ChangesInDismissal || -40;
  
  const employeeStats = [
    {
      title: "Всего сотрудников",
      value: `${totalEmployees.toLocaleString()} чел.`,
      trend: `+${totalEmployeesChange} за месяц`,
      icon: Users,
    },
    {
      title: "Принято за месяц",
      value: `${hiringEmployees.toLocaleString()} чел.`,
      trend: `+${hiringEmployeesChange}% к прошлому месяцу`,
      icon: UserPlus,
    },
    {
      title: "Уволено за месяц",
      value: `${dismissalEmployees.toLocaleString()} чел.`,
      trend: `${dismissalEmployeesChange}% к прошлому месяцу`,
      icon: UserMinus,
    },
    {
      title: "Открытых вакансий",
      value: "17",
      trend: "В активном поиске",
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <StatsCards stats={employeeStats} isLoading={isLoading} />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonnelMovementChart />
        <GenderDistributionChart />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EducationLevelChart />
        <AgeDistributionVerticalChart />
      </div>

      {/* Row 3 */}
      <div>
        <TenureSeniorityChart />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentSickLeavesChart />
        <DepartmentVacationsChart />
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-2">
        <EmployeeProfilesList />
      </div>
      <div>
        <WorkSchedulesTable />
      </div>
    </div>
  );
};

export default Kadri;
