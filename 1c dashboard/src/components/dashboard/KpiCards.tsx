import React from 'react';
import { BarChart2, FileText, TrendingUp, CheckCircle2 } from 'lucide-react';

const KpiCards: React.FC = () => {
  const cards = [
    {
      title: 'Прибыль по МСФО',
      value: '385 млн сум',
      subtext: '+4.9% к прошлому кварталу',
      subtextClass: 'text-emerald-600 dark:text-emerald-400 font-medium',
      icon: BarChart2,
    },
    {
      title: 'Корректировок',
      value: '47',
      subtext: '18 млн сум разница',
      subtextClass: 'text-slate-500 dark:text-slate-400',
      icon: FileText,
    },
    {
      title: 'Автоматизация',
      value: '98%',
      subtext: '+2% к прошлому месяцу',
      subtextClass: 'text-emerald-600 dark:text-emerald-400 font-medium',
      icon: TrendingUp,
    },
    {
      title: 'Точность сверки',
      value: '99.7%',
      subtext: 'Все расхождения устранены',
      subtextClass: 'text-emerald-600 dark:text-emerald-400 font-medium',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="w-full border border-gray-200 dark:border-slate-700/60 rounded-[12px] flex justify-between p-6 bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 group"
          >
            <div className="flex flex-col justify-between h-full space-y-2">
              <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-tight ">
                {card.title}
              </p>
              <h2 className="text-[28px] text-gray-800 mt-1 dark:text-white leading-tight">
                {card.value}
              </h2>
              <p className={`text-[13px] ${card.subtextClass}`}>
                {card.subtext}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-[10px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Icon className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiCards;
