import StatsCards from "../../../components/dashboard/StatsCards";
import FinanceDynamicsChart from "../../../components/charts/FinanceDynamicsChart";
import ExpenseStructureChart from "@/components/charts/ExpenseStructureChart";
import CashFlowWeeklyChart from "@/components/charts/CashFlowWeeklyChart";
import KeyFinanceIndicators from "@/components/dashboard/KeyFinanceIndicators";
import FinancialGoals from "@/components/dashboard/FinancialGoals";
import FinancialForecast from "@/components/dashboard/FinancialForecast";

const Finans = () => {

  return (
    <>
      <div className="mt-5">
        <StatsCards/>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5">
        <FinanceDynamicsChart />
        <ExpenseStructureChart/>
      </div>
      <div className="mt-8">
        <CashFlowWeeklyChart/>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5">
        <KeyFinanceIndicators/>
        <FinancialGoals/>
      </div>
      <div className="mt-8">
        <FinancialForecast/>
      </div>
    </>
  );

};

export default Finans;