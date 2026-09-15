import React from 'react';

interface DocumentRow {
  number: string;
  type: string;
  date: string;
  status: 'Зарегистрирован' | 'В обработке';
  amount: string;
}

const data: DocumentRow[] = [
  { number: 'СФ-2026-0847', type: 'Счет-фактура', date: '09.04.2026', status: 'Зарегистрирован', amount: '12,450,000 сум' },
  { number: 'АКТ-2026-0423', type: 'Акт работ', date: '09.04.2026', status: 'Зарегистрирован', amount: '8,900,000 сум' },
  { number: 'НКЛ-2026-1256', type: 'Накладная', date: '08.04.2026', status: 'В обработке', amount: '3,250,000 сум' },
  { number: 'СФ-2026-0846', type: 'Счет-фактура', date: '08.04.2026', status: 'Зарегистрирован', amount: '15,800,000 сум' },
  { number: 'ДГВ-2026-0089', type: 'Договор', date: '07.04.2026', status: 'Зарегистрирован', amount: '45,000,000 сум' },
];

const RecentDocumentsTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-medium text-[18px] text-gray-900 dark:text-white mb-6">
        Последние документы
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">НОМЕР</th>
              <th className="py-4 px-4">ТИП</th>
              <th className="py-4 px-4">ДАТА СОЗДАНИЯ</th>
              <th className="py-4 px-4">СТАТУС</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СУММА</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-2 px-3 text-gray-800 dark:text-gray-200">{item.number}</td>
                <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{item.type}</td>
                <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{item.date}</td>
                <td className="py-2 px-3 ">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px]
                      ${item.status === 'Зарегистрирован' 
                        ? 'bg-[#dcfce7] text-[#0d7534] dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-[#fef3c7] text-[#a87301] dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDocumentsTable;
