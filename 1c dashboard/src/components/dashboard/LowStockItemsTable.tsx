import React from 'react';

interface StockRow {
  name: string;
  category: string;
  stock: string;
  minLevel: string;
  warehouse: string;
  status: 'Дефицит' | 'Заказано';
}

const data: StockRow[] = [
  { name: 'Кабель силовой АПвПг-10 3х150', category: 'Кабельная продукция', stock: '150 м', minLevel: '1,000 м', warehouse: 'Главный склад', status: 'Дефицит' },
  { name: 'Трансформатор ТМГ-250/10', category: 'Трансформаторы', stock: '1 ед.', minLevel: '3 ед.', warehouse: 'Склад №2 (Восточный)', status: 'Заказано' },
  { name: 'Опора железобетонная СВ-95', category: 'Опоры ЛЭП', stock: '12 ед.', minLevel: '50 ед.', warehouse: 'Склад №1 (Северный)', status: 'Дефицит' },
  { name: 'Изолятор стеклянный ПС-70Е', category: 'Запчасти / ХозТМЦ', stock: '80 ед.', minLevel: '300 ед.', warehouse: 'Главный склад', status: 'Заказано' },
  { name: 'Муфта соединительная 3ПОЛ-10', category: 'Запчасти / ХозТМЦ', stock: '5 ед.', minLevel: '25 ед.', warehouse: 'Склад №2 (Восточный)', status: 'Дефицит' },
];

const LowStockItemsTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Дефицитные товарные позиции (критичный остаток)
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">НОМЕНКЛАТУРНОЕ ИМЯ</th>
              <th className="py-4 px-4">КАТЕГОРИЯ</th>
              <th className="py-4 px-4">ТЕКУЩИЙ ОСТАТОК</th>
              <th className="py-4 px-4">МИН. РЕЗЕРВ</th>
              <th className="py-4 px-4">СКЛАД ХРАНЕНИЯ</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СТАТУС</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.name}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.category}</td>
                <td className="py-4 px-4 text-red-600 dark:text-red-400 font-bold">{item.stock}</td>
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.minLevel}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.warehouse}</td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.status === 'Дефицит' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
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

export default LowStockItemsTable;
