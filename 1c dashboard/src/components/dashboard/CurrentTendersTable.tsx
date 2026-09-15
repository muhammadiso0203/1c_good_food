import React from 'react';

interface TenderRow {
  id: string;
  title: string;
  price: string;
  status: 'Прием предложений' | 'Оценка' | 'Завершен';
  endDate: string;
  offers: number;
}

const data: TenderRow[] = [
  { id: 'TND-2026-0045', title: 'Закупка силовых трансформаторов 110 кВ', price: '1,200,000,000 сум', status: 'Прием предложений', endDate: '15.06.2026', offers: 4 },
  { id: 'TND-2026-0046', title: 'Модернизация серверной инфраструктуры АМИ', price: '450,000,000 сум', status: 'Оценка', endDate: '08.06.2026', offers: 6 },
  { id: 'TND-2026-0047', title: 'Поставка медного кабеля сечением 50мм²', price: '380,000,000 сум', status: 'Прием предложений', endDate: '20.06.2026', offers: 2 },
  { id: 'TND-2026-0048', title: 'Поставка офисной мебели для филиалов', price: '95,000,000 сум', status: 'Завершен', endDate: '30.05.2026', offers: 5 },
  { id: 'TND-2026-0049', title: 'Закупка спецодежды для технического персонала', price: '120,000,000 сум', status: 'Прием предложений', endDate: '18.06.2026', offers: 3 },
];

const CurrentTendersTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Текущие активные тендеры
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">ID ТЕНДЕРА</th>
              <th className="py-4 px-4">НАИМЕНОВАНИЕ ЗАКУПКИ</th>
              <th className="py-4 px-4">СТАРТОВАЯ СУММА</th>
              <th className="py-4 px-4">ДАТА ОКОНЧАНИЯ</th>
              <th className="py-4 px-4">ЗАЯВОК</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СТАТУС</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.id}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.title}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300 font-semibold">{item.price}</td>
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.endDate}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.offers} предл.</td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.status === 'Прием предложений' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                        : item.status === 'Оценка' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
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
  );
};

export default CurrentTendersTable;
