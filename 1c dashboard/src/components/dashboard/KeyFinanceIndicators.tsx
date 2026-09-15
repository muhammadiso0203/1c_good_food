
const data = [
  { label: 'EBITDA', q1: '145.0', q2: '167.0', growth: '+15.2%' },
  { label: 'Рентабельность', q1: '32.5', q2: '35.8', growth: '+10.2%' },
  { label: 'Оборачиваемость активов', q1: '1.8', q2: '2.1', growth: '+16.7%' },
  { label: 'Ликвидность', q1: '2.3', q2: '2.6', growth: '+13.0%' },
];

const KeyFinanceIndicators = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-6">
        Ключевые финансовые показатели
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-700/50">
              <th className="py-3 px-4 text-[13px] text-gray-600 uppercase">
                ПОКАЗАТЕЛЬ
              </th>
              <th className="py-3 px-4 text-[13px] text-gray-600 uppercase text-right">
                Q1 2026
              </th>
              <th className="py-3 px-4 text-[13px] text-gray-600 uppercase text-right">
                Q2 2026
              </th>
              <th className="py-3 px-4 text-[13px] text-gray-600 uppercase text-right">
                РОСТ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4 text-[14px] dark:text-gray-300">
                  {item.label}
                </td>
                <td className="py-4 px-4 text-[14px] dark:text-gray-300 text-right">
                  {item.q1}
                </td>
                <td className="py-4 px-4 text-[14px] dark:text-gray-300 text-right">
                  {item.q2}
                </td>
                <td className="py-4 px-4 text-[14px] text-emerald-700 dark:text-emerald-400 text-right">
                  {item.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeyFinanceIndicators;
