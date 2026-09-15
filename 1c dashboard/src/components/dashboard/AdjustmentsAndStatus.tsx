import React from 'react';

interface DifferenceItem {
  name: string;
  value: string;
  percentage: string;
}

interface StatusItem {
  name: string;
  dueDate: string;
  status: 'Готово' | 'В работе' | 'Ожидание';
}

const differences: DifferenceItem[] = [
  { name: 'Амортизация основных средств', value: '+7 млн сум', percentage: '+13.5%' },
  { name: 'Резервы по сомнительным долгам', value: '+5 млн сум', percentage: '+17.8%' },
  { name: 'Признание выручки', value: '+4 млн сум', percentage: '+5.1%' },
  { name: 'Оценка финансовых инструментов', value: '+2 млн сум', percentage: '+5.9%' },
];

const statuses: StatusItem[] = [
  { name: 'Баланс (МСФО)', dueDate: '01.07.2026', status: 'Готово' },
  { name: 'Отчет о прибылях и убытках', dueDate: '01.07.2026', status: 'Готово' },
  { name: 'Отчет о движении денежных средств', dueDate: '03.07.2026', status: 'В работе' },
  { name: 'Примечания к отчетности', dueDate: '05.07.2026', status: 'Ожидание' },
];

const AdjustmentsAndStatus: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Left Card: Основные различия */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700/60 transition-colors duration-300">
        <h3 className="text-[16px] text-gray-900 dark:text-white mb-6">
          Основные различия
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {differences.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 text-[14px] text-gray-800 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-4 text-[14px] text-black dark:text-white">
                    {item.value}
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-[12px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                      {item.percentage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Card: Статус отчетности */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700/60 transition-colors duration-300">
        <h3 className="text-[16px] text-gray-900 dark:text-white mb-6">
          Статус отчетности
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-150 dark:border-slate-700 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Модуль</th>
                <th className="pb-3">Срок сдачи</th>
                <th className="pb-3 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {statuses.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 text-[14px] text-gray-800 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-4 text-[14px] text-gray-500 dark:text-gray-400">
                    {item.dueDate}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] border
                        ${item.status === 'Готово'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40'
                          : item.status === 'В работе'
                          ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/40'
                          : 'bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700/40'
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentsAndStatus;
