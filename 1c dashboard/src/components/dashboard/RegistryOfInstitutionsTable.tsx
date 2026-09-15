import React from 'react';

interface InstitutionRow {
  name: string;
  status: 'Сдано' | 'В процессе' | 'Просрочено';
  staff: number;
  level: string;
  budget: string;
}

const data: InstitutionRow[] = [
  { name: 'Министерство энергетики', status: 'Сдано', staff: 12, level: '100%', budget: '1.2 трлн сум' },
  { name: 'Региональные ЭС (Ташкент)', status: 'Сдано', staff: 10, level: '90%', budget: '850 млрд сум' },
  { name: 'Региональные ЭС (Самарканд)', status: 'В процессе', staff: 8, level: '80%', budget: '720 млрд сум' },
  { name: 'Региональные ЭС (Фергана)', status: 'Сдано', staff: 9, level: '85%', budget: '680 млрд сум' },
  { name: 'Тепловые Электрические Станции', status: 'Просрочено', staff: 13, level: '75%', budget: '1.35 трлн сум' },
];

const RegistryOfInstitutionsTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Реестр учреждений под управлением
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px]">УЧРЕЖДЕНИЕ</th>
              <th className="py-4 px-4">СТАТУС ОТЧЕТА</th>
              <th className="py-4 px-4">ШТАТ БУХГАЛТЕРОВ</th>
              <th className="py-4 px-4">УРОВЕНЬ ЦЕНТРАЛИЗАЦИИ</th>
              <th className="py-4 px-4 rounded-r-[8px] text-right">БЮДЖЕТ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.name}</td>
                <td className="py-4 px-4">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                      ${item.status === 'Сдано' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : item.status === 'В процессе' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.staff} чел.</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.level}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 text-right font-medium">{item.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistryOfInstitutionsTable;
