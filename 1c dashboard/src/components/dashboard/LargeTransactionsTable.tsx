import React from 'react';

interface TransactionRow {
  date: string;
  type: 'Поступление' | 'Выплата';
  category: string;
  contractor: string;
  amount: string;
}

const data: TransactionRow[] = [
  { date: '05.05.2026', type: 'Поступление', category: 'Оплата за эл.энергию', contractor: 'ООО Ташкент-Сити', amount: '+1,200,000,000 сум' },
  { date: '04.05.2026', type: 'Выплата', category: 'Налоги и сборы', contractor: 'ГНК Республики Узбекистан', amount: '-360,000,000 сум' },
  { date: '03.05.2026', type: 'Выплата', category: 'Фонд Оплаты Труда (ФОТ)', contractor: 'Сотрудники (реестр зарплат)', amount: '-1,600,000,000 сум' },
  { date: '02.05.2026', type: 'Поступление', category: 'Авансовый платеж по договору', contractor: 'АО Самаркандский Химзавод', amount: '+850,000,000 сум' },
  { date: '01.05.2026', type: 'Выплата', category: 'Закупка ТМЦ (Трансформаторы)', contractor: 'ООО Чирчикский Трансформаторный', amount: '-450,000,000 сум' },
];

const LargeTransactionsTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Крупные операции за период
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">ДАТА</th>
              <th className="py-4 px-4">ТИП ОПЕРАЦИИ</th>
              <th className="py-4 px-4">КАТЕГОРИЯ / СТАТЬЯ ДС</th>
              <th className="py-4 px-4">КОНТРАГЕНТ</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СУММА</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.date}</td>
                <td className="py-4 px-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium
                      ${item.type === 'Поступление' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.category}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.contractor}</td>
                <td className={`py-4 px-4 text-right font-bold 
                  ${item.type === 'Поступление' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LargeTransactionsTable;
