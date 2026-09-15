import React from 'react';

interface OperationRow {
  branch: string;
  operation: string;
  time: string;
  status: 'Выполнено' | 'В работе';
}

const recentOperations: OperationRow[] = [
  { branch: 'Филиал Ташкент', operation: 'Проводка №8547', time: '10 минут назад', status: 'Выполнено' },
  { branch: 'Филиал Самарканд', operation: 'Закрытие периода', time: '25 минут назад', status: 'Выполнено' },
  { branch: 'Филиал Бухара', operation: 'Сверка баланса', time: '1 час назад', status: 'В работе' },
  { branch: 'Филиал Фергана', operation: 'Проводка №8546', time: '2 часа назад', status: 'Выполнено' },
];

const AccountingBottomSection: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Left side: Key Metrics */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300 flex flex-col justify-between">
        <div>
          <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
            Ключевые метрики
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700/50 pb-5 pt-1">
              <span className="text-[13px] text-gray-500 dark:text-gray-400">Средняя точность</span>
              <span className="text-[18px] text-green-600 dark:text-green-400">99.1%</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700/50 pb-5 pt-1">
              <span className="text-[13px] text-gray-500 dark:text-gray-400">Время обработки</span>
              <span className="text-[18px] text-gray-900 dark:text-white">1.2 дня</span>
            </div>
            <div className="flex items-center justify-between pb-2 pt-1">
              <span className="text-[13px] text-gray-500 dark:text-gray-400">SLA выполнение</span>
              <span className="text-[18px] text-green-600 dark:text-green-400">98.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Recent Operations */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
          Последние операции
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <tbody>
              {recentOperations.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-2 px-2 text-gray-800 dark:text-gray-200">
                    <span className="text-gray-900 dark:text-white text-[13px]">{item.branch}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-[12px] block mt-1">{item.operation}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <span className="text-gray-500 dark:text-gray-400 text-[11px]">{item.time}</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[11px] font-medium
                          ${item.status === 'Выполнено'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>
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

export default AccountingBottomSection;
