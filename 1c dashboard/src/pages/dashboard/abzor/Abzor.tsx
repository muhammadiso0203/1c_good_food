import FinancialChart from "../../../components/charts/financialChart"
import ExpenseChart from "../../../components/charts/struktursChart"
import EfficiencyChart from "../../../components/charts/operatsionniyChart"
import SimpleDashboardChart from "../../../components/charts/personalChart"
import OperationsByModuleChart from "../../../components/charts/operationsByModuleChart"
import ModuleIndicatorsChart from "../../../components/charts/moduleIndicatorsChart"
import ErpEfficiencyChart from "../../../components/charts/erpEfficiencyChart"
import ModuleSummaryCards from "../../../components/dashboard/ModuleSummaryCards"
import StatsCards from "../../../components/dashboard/StatsCards"
import UzbekistanInteractiveMap from "../../../components/dashboard/UzbekistanInteractiveMap"

const Abzor = () => {
  return (
    <>
      <div className="w-full bg-blue-600 dark:bg-blue-700 rounded-[12px] p-6 text-white transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-blue-100 text-[14px] font-medium">
              Всего модулей
            </p>
            <h2 className="text-3xl md:text-4xl font-bold my-1">
              14
            </h2>
            <span className="text-blue-200 text-[12px] opacity-80">
              Все активны
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-blue-100 text-[14px] font-medium">
              Общая эффективность
            </p>
            <h2 className="text-3xl md:text-4xl font-bold my-1">
              94.8%
            </h2>
            <span className="text-blue-200 text-[12px] opacity-80">
              +2.3% к прошлому месяцу
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-blue-100 text-[14px] font-medium">
              Операций за месяц
            </p>
            <h2 className="text-3xl md:text-4xl font-bold my-1">
              12,847
            </h2>
            <span className="text-blue-200 text-[12px] opacity-80">
              +15.2% к прошлому месяцу
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-blue-100 text-[14px] font-medium">
              Экономия от автоматизации
            </p>
            <h2 className="text-3xl md:text-4xl font-bold my-1">
              47 <span className="text-xl md:text-2xl font-bold">млн сум</span>
            </h2>
            <span className="text-blue-200 text-[12px] opacity-80">
              За текущий квартал
            </span>
          </div>
        </div>
      </div>

      <StatsCards gridCols={5} />

      <div className="w-full mt-9">
        <UzbekistanInteractiveMap />
      </div>


      <div className="w-full grid grid-cols-2 gap-9 mt-5">
        <FinancialChart />
        <ExpenseChart />
      </div>
      <div className="w-full grid grid-cols-2 gap-9 mt-5">
        <EfficiencyChart />
        <SimpleDashboardChart />
      </div>
      <div className="w-full grid grid-cols-2 gap-9 mt-5">
        <OperationsByModuleChart />
        <ModuleIndicatorsChart />
      </div>


      <div className="w-full mt-9">
        <ErpEfficiencyChart />
      </div>
      <div className="w-full mt-9">
        <ModuleSummaryCards />
      </div>
    </>
  )
}

export default Abzor
