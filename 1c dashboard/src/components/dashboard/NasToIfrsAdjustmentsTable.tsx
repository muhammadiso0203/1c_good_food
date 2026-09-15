import React from 'react';

interface AdjustmentRow {
  id: string;
  adjustment: string;
  nasValue: string;
  ifrsValue: string;
  difference: string;
  impact: 'Положительное' | 'Отрицательное' | 'Нейтральное';
}

const data: AdjustmentRow[] = [
  { id: 'ADJ-01', adjustment: 'Переоценка основных средств (ОС)', nasValue: '1.25 трлн сум', ifrsValue: '1.40 трлн сум', difference: '+150 млрд сум', impact: 'Положительное' },
  { id: 'ADJ-02', adjustment: 'Обесценение дебиторской задолженности (резерв по Ожил.Кред.Убыткам)', nasValue: '-45 млрд сум', ifrsValue: '-60 млрд сум', difference: '-15 млрд сум', impact: 'Отрицательное' },
  { id: 'ADJ-03', adjustment: 'Дисконтирование долгосрочных обязательств', nasValue: '280 млрд сум', ifrsValue: '255 млрд сум', difference: '-25 млрд сум', impact: 'Положительное' },
  { id: 'ADJ-04', adjustment: 'Признание обязательств по аренде (МСФО 16)', nasValue: '0 сум', ifrsValue: '42 млрд сум', difference: '+42 млрд сум', impact: 'Нейтральное' },
  { id: 'ADJ-05', adjustment: 'Резерв на неиспользованные отпуска', nasValue: '-12 млрд сум', ifrsValue: '-18 млрд сум', difference: '-6 млрд сум', impact: 'Отрицательное' },
];

const NasToIfrsAdjustmentsTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Основные корректировки перехода НСБУ → МСФО
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">КОД</th>
              <th className="py-4 px-4">КОРРЕКТИРОВКА / ОПИСАНИЕ</th>
              <th className="py-4 px-4">НСБУ</th>
              <th className="py-4 px-4">МСФО</th>
              <th className="py-4 px-4">РАЗНИЦА</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">ВЛИЯНИЕ НА ПРИБЫЛЬ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.id}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.adjustment}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.nasValue}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">{item.ifrsValue}</td>
                <td className="py-4 px-4 text-blue-600 dark:text-blue-400 font-semibold">{item.difference}</td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.impact === 'Положительное' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : item.impact === 'Отрицательное' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
                      }`}
                  >
                    {item.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NasToIfrsAdjustmentsTable;
