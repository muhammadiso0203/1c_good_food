import React from 'react';
import { useMainpage } from '@/pages/dashboard/abzor/service/useMainpage';

interface DivisionRow {
  id: string;
  department: string;
  employees: string | number;
  payroll: string | number;
  average: string | number;
}

const DivisionsDetailsTable: React.FC = () => {
  const { data: mainpageData, isLoading } = useMainpage();

  const parsedData = React.useMemo<DivisionRow[]>(() => {
    if (!mainpageData) return [];

    const results: DivisionRow[] = [];
    let index = 1;

    const search = (currentObj: any) => {
      if (!currentObj || typeof currentObj !== 'object') return;

      for (const key in currentObj) {
        if (key.startsWith('ДетПоПодразд_в45_')) {
          const val = String(currentObj[key]);
          const department = key
            .replace('ДетПоПодразд_в45_', '')
            .replace(/_/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');

          const parts = val.split('_');
          if (parts.length >= 3) {
            const employeesRaw = parseInt(parts[0], 10) || 0;
            const payrollRaw = parseFloat(parts[1].replace(',', '.')) || 0;
            const averageRaw = parseFloat(parts[2].replace(',', '.')) || 0;

            const employees = employeesRaw.toLocaleString('ru-RU');
            const payroll = (payrollRaw / 1_000_000).toLocaleString('ru-RU', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
            const average = (averageRaw / 1_000).toLocaleString('ru-RU', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            results.push({
              id: String(index++),
              department,
              employees,
              payroll,
              average,
            });
          }
        } else if (currentObj[key] && typeof currentObj[key] === 'object') {
          search(currentObj[key]);
        }
      }
    };

    search(mainpageData);
    return results;
  }, [mainpageData]);

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 animate-pulse transition-colors duration-300">
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
          <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded"></div>
          <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded"></div>
          <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  const dataToDisplay = parsedData;

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Детализация по подразделениям
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 ">
              <th className="py-4 px-4 rounded-l-[8px]">ПОДРАЗДЕЛЕНИЕ</th>
              <th className="py-4 px-4 text-center">СОТРУДНИКОВ</th>
              <th className="py-4 px-4 text-center">ФОТ (МЛН СУМ)</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СРЕДНЯЯ ЗП (ТЫС. СУМ)</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((item) => (
              <tr 
                key={item.id} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  {item.department}
                </td>
                <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">
                  {item.employees}
                </td>
                <td className="py-3 px-4 text-center text-blue-600 dark:text-blue-400">
                  {item.payroll}
                </td>
                <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400">
                  {item.average}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DivisionsDetailsTable;
