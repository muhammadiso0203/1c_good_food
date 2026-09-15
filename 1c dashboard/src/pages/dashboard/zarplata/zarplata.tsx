import React from 'react';
import { DollarSign, TrendingUp, Users, Building2 } from 'lucide-react';
import TaxArticlesPayrollChart from '@/components/charts/TaxArticlesPayrollChart';
import StructuralDivisionsChart from '@/components/charts/StructuralDivisionsChart';
import YearlyPayrollDynamicsChart from '@/components/charts/YearlyPayrollDynamicsChart';
import NonPayrollPaymentsChart from '@/components/charts/NonPayrollPaymentsChart';
import GroupedPaymentsByTypeChart from '@/components/charts/GroupedPaymentsByTypeChart';
import DivisionsDetailsTable from '@/components/dashboard/DivisionsDetailsTable';
import { useMainpage } from '@/pages/dashboard/abzor/service/useMainpage';

const Zarplata: React.FC = () => {
  const { data: mainpageData } = useMainpage();

  // Extract variables with case-insensitive fallback mapping
  const rawData = mainpageData?.totalrevenue ?? mainpageData?.metrics ?? mainpageData;
  const fotValue = rawData?.ФОТ;
  const vneFotValue = rawData?.ВнеФОТ;
  const averageSalary = rawData?.СредняяЗарплата;

  // Format functions
  const formatMlnSum = (val?: number, fallback: string = '') => {
    if (val === undefined || val === null) return fallback;
    return Math.round(val / 1_000_000).toLocaleString('ru-RU') + ' млн сум';
  };

  const formatThousSum = (val?: number, fallback: string = '') => {
    if (val === undefined || val === null) return fallback;
    return Math.round(val / 1_000).toLocaleString('ru-RU') + ' тыс. сум';
  };

  const fotDisplay = formatMlnSum(fotValue, '3 266 млн сум');
  const vneFotDisplay = formatMlnSum(vneFotValue, '188 млн сум');
  const avgDisplay = formatThousSum(averageSalary, '437 тыс. сум');

  return (
    <div className="space-y-6">
      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: ФОТ за полугодие 2026 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 flex justify-between items-start transition-all hover:shadow-sm duration-300">
          <div className="space-y-2">
            <span className="text-[13px] text-slate-500 dark:text-slate-400">
              ФОТ за полугодие
            </span>
            <div className="flex items-baseline">
              <h2 className="text-[28px] text-slate-900 dark:text-white leading-none">
                {fotDisplay}
              </h2>
            </div>
            <span className="text-[14px] text-emerald-600 dark:text-emerald-400 block pt-1">
              +12.7% к 2025 году
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Card 2: Выплаты вне ФОТ */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 flex justify-between items-start transition-all hover:shadow-sm duration-300">
          <div className="space-y-2">
            <span className="text-[13px] text-slate-500 dark:text-slate-400">
              Выплаты вне ФОТ
            </span>
            <div className="flex items-baseline">
              <h2 className="text-[28px] text-slate-900 dark:text-white leading-none">
                {vneFotDisplay}
              </h2>
            </div>
            <span className="text-[14px] text-emerald-600 dark:text-emerald-400 block pt-1">
              +14.6% к 2025 году
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Card 3: Средняя зарплата */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 flex justify-between items-start transition-all hover:shadow-sm duration-300">
          <div className="space-y-2">
            <span className="text-[13px] text-slate-500 dark:text-slate-400">
              Средняя зарплата
            </span>
            <div className="flex items-baseline">
              <h2 className="text-[28px] text-slate-900 dark:text-white leading-none">
                {avgDisplay}
              </h2>
            </div>
            <span className="text-[14px] text-emerald-600 dark:text-emerald-400 block pt-1">
              +8.5% к прошлому году
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
            <Users size={22} />
          </div>
        </div>

        {/* Card 4: Сотрудников */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 flex justify-between items-start transition-all hover:shadow-sm duration-300">
          <div className="space-y-2">
            <span className="text-[13px] text-slate-500 dark:text-slate-400">
              Сотрудников
            </span>
            <div className="flex items-baseline">
              <h2 className="text-[28px] text-slate-900 dark:text-white leading-none">
                1247
              </h2>
            </div>
            <span className="text-[14px] text-slate-600 dark:text-slate-500 block pt-1">
              В фонде оплаты
            </span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
            <Building2 size={22} />
          </div>
        </div>
      </div>

      {/* Grouped Tax Articles Bar Chart */}
      <div className="w-full">
        <TaxArticlesPayrollChart />
      </div>

      {/* Structural Divisions and Yearly Dynamics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StructuralDivisionsChart />
        <YearlyPayrollDynamicsChart />
      </div>

      {/* Non-Payroll Payments Chart */}
      <div className="w-full">
        <NonPayrollPaymentsChart />
      </div>

      {/* Grouped Payments By Type Chart */}
      <div className="w-full">
        <GroupedPaymentsByTypeChart />
      </div>

      {/* Divisions Details Table */}
      <div className="w-full">
        <DivisionsDetailsTable />
      </div>
    </div>
  );
};

export default Zarplata;
