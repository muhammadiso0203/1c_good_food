import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Июль 2026', revenue: '385 млн', profit: '154 млн' },
  { month: 'Август 2026', revenue: '398 млн', profit: '162 млн' },
  { month: 'Сентябрь 2026', revenue: '412 млн', profit: '171 млн' },
];

const FinancialForecast = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-3">
        Прогноз финансовых показателей
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="p-5 rounded-[10px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 space-y-1"
          >
            <h4 className="text-[14px] font-medium text-gray-900 dark:text-white">
              {item.month}
            </h4>
            <div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-gray-500 dark:text-gray-400">Выручка:</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.revenue}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-gray-500 dark:text-gray-400">Прибыль:</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.profit}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-green-600 font-medium pt-2">
              <TrendingUp className="w-4 h-4" />
              <span>Рост прогнозируется</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialForecast;
