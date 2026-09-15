
const data = [
  { label: 'Увеличение выручки', current: 1245, target: 1500, unit: 'млн сум' },
  { label: 'Рентабельность', current: 40.1, target: 45, unit: '%' },
  { label: 'Снижение издержек', current: 12.3, target: 15, unit: '%' },
  { label: 'EBITDA margin', current: 32.8, target: 35, unit: '%' },
];

const FinancialGoals = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-4">
        Финансовые цели на 2026
      </h3>
      <div className="space-y-2">
        {data.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100;
          return (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-600 dark:text-gray-400">
                  {goal.label}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <div className="w-full h-[8px] bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialGoals;
