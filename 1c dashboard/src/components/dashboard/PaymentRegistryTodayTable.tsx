import React from 'react';

interface PaymentRow {
  id: string;
  recipient: string;
  purpose: string;
  amount: string;
  priority: 'Высокий' | 'Средний' | 'Низкий';
  status: 'Согласован' | 'К оплате' | 'На согласовании';
}

const data: PaymentRow[] = [
  { id: 'PAY-0892', recipient: 'АО Узбекэнерго', purpose: 'Оплата за электроэнергию по договору №442', amount: '450,000,000 сум', priority: 'Высокий', status: 'К оплате' },
  { id: 'PAY-0893', recipient: 'ООО ТехноСнаб', purpose: 'Поставка серверного оборудования', amount: '180,000,000 сум', priority: 'Средний', status: 'Согласован' },
  { id: 'PAY-0894', recipient: 'ГНК Республики Узбекистан', purpose: 'Налог на добавленную стоимость за 1-й квартал', amount: '360,000,000 сум', priority: 'Высокий', status: 'К оплате' },
  { id: 'PAY-0895', recipient: 'ИП Каримов Р.', purpose: 'Аренда складских помещений', amount: '25,000,000 сум', priority: 'Низкий', status: 'На согласовании' },
  { id: 'PAY-0896', recipient: 'ООО СтройСервис', purpose: 'Строительно-монтажные работы по филиалу', amount: '120,000,000 сум', priority: 'Средний', status: 'Согласован' },
];

const PaymentRegistryTodayTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Реестр платежей на сегодня
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">ID ЗАЯВКИ</th>
              <th className="py-4 px-4">ПОЛУЧАТЕЛЬ</th>
              <th className="py-4 px-4">НАЗНАЧЕНИЕ ПЛАТЕЖА</th>
              <th className="py-4 px-4">СУММА</th>
              <th className="py-4 px-4">ПРИОРИТЕТ</th>
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
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.recipient}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300 max-w-[250px] truncate">{item.purpose}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-semibold">{item.amount}</td>
                <td className="py-4 px-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium
                      ${item.priority === 'Высокий' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                        : item.priority === 'Средний' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
                      }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.status === 'К оплате' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : item.status === 'Согласован' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
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

export default PaymentRegistryTodayTable;
