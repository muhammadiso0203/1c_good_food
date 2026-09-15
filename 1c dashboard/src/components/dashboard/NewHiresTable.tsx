import React from 'react';

interface HireRow {
  name: string;
  position: string;
  department: string;
  hireDate: string;
  status: 'Оформлен' | 'На испытательном';
}

const data: HireRow[] = [
  { name: 'Абдуллаев Сардор', position: 'Ведущий Инженер-программист', department: 'IT-Отдел', hireDate: '01.05.2026', status: 'Оформлен' },
  { name: 'Каримова Мадина', position: 'Старший Бухгалтер', department: 'Центральная бухгалтерия', hireDate: '28.04.2026', status: 'Оформлен' },
  { name: 'Рахимов Тимур', position: 'Инженер по энергоучету', department: 'Служба АМИ/МДМС', hireDate: '25.04.2026', status: 'На испытательном' },
  { name: 'Усманова Нигора', position: 'Специалист по кадрам', department: 'Отдел кадров', hireDate: '20.04.2026', status: 'Оформлен' },
  { name: 'Собиров Джамшид', position: 'Кладовщик', department: 'Центральный склад', hireDate: '15.04.2026', status: 'На испытательном' },
];

const NewHiresTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Новые сотрудники (принятые за месяц)
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">ФИО СОТРУДНИКА</th>
              <th className="py-4 px-4">ДОЛЖНОСТЬ</th>
              <th className="py-4 px-4">ПОДРАЗДЕЛЕНИЕ</th>
              <th className="py-4 px-4">ДАТА ПРИЕМА</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">СТАТУС ОФОРМЛЕНИЯ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.name}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.position}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.department}</td>
                <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{item.hireDate}</td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.status === 'Оформлен' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
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

export default NewHiresTable;
