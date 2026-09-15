import React from 'react';
import { DollarSign, Wallet, Users, Activity, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMetrics } from '@/pages/dashboard/abzor/service/useMetrics';

export interface StatItem {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}

interface StatsCardsProps {
  stats?: StatItem[];
  isLoading?: boolean;
  gridCols?: 1 | 2 | 3 | 4 | 5;
}

const iconMap: Record<string, LucideIcon> = {
  'Общая выручка': DollarSign,
  'Чистая прибыль': Wallet,
  'Всего сотрудников': Users,
  'Операций обработано': Activity,
};

const formatNumber = (num?: number) => {
  if (num === undefined || num === null) return "0"
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + " млрд"
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + " млн"
  if (num >= 1_000) return (num / 1_000).toFixed(1) + " тыс"
  return num.toLocaleString()
}

const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  isLoading: externalLoading,
  gridCols = 4
}) => {
  const { data, isLoading } = useMetrics();

  const isAbzorPage = externalLoading === undefined;
  const loading = externalLoading !== undefined ? externalLoading : isLoading;

  let displayData: StatItem[] = [];

  if (Array.isArray(stats)) {
    displayData = stats.map((stat) => {
      if ('title' in stat) return stat as StatItem;
      const s = stat as any;
      return {
        title: s.name || s.title,
        value: s.value,
        trend: s.desc || s.trend || '',
        icon: s.icon || iconMap[s.name] || Activity,
      };
    });
  } else if (isAbzorPage) {
    displayData = [
      {
        title: "Общая выручка",
        value: data ? formatNumber(data?.Totalrevenue) : "",
        trend: data?.Incomechange != null
          ? (data.Incomechange > 0 
              ? `+${data.Incomechange}% по сравнению с прошлым периодом` 
              : data.Incomechange < 0 
                ? `${data.Incomechange}% по сравнению с прошлым периодом` 
                : 'Ўзгармади')
          : "",
        icon: DollarSign,
      },
      {
        title: "Чистая прибыль",
        value: data ? formatNumber(data?.Netprofit) : "",
        trend: data?.Netprofitchange != null
          ? (data.Netprofitchange > 0 
              ? `+${data.Netprofitchange.toFixed(2)}% по сравнению с прошлым периодом` 
              : data.Netprofitchange < 0 
                ? `${data.Netprofitchange.toFixed(2)}% по сравнению с прошлым периодом` 
                : 'Ўзгармади')
          : "",
        icon: Wallet,
      },
      {
        title: "Всего сотрудников",
        value: data ? (data?.Totalemployees?.toLocaleString() ?? "0") : "",
        trend: data?.Totalemployeeschange != null
          ? (data.Totalemployeeschange > 0 
              ? `+${data.Totalemployeeschange}% по сравнению с прошлым периодом` 
              : data.Totalemployeeschange < 0 
                ? `${data.Totalemployeeschange}% по сравнению с прошлым периодом` 
                : 'Ўзгармади')
          : "",
        icon: Users,
      },
      {
        title: "Операций обработано",
        value: data ? (data?.NumberOfDocuments?.toLocaleString() ?? "0") : "",
        trend: "",
        icon: FileText,
      },
      {
        title: "Документы в системе",
        value: data ? (data?.NumberOfDocumentsInSystem?.toLocaleString() ?? "0") : "",
        trend: "",
        icon: Activity,
      },
    ];
  }

  const gridConfig = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
  };

  if (!isAbzorPage && !stats && loading) {
    return (
      <div className={`w-full grid grid-cols-1 md:grid-cols-2 ${gridConfig[gridCols]} gap-2 mt-5`}>
        {Array.from({ length: gridCols }).map((_, index) => (
          <div
            key={index}
            className="w-full border border-gray-200 dark:border-slate-700 rounded-[10px] flex justify-between p-6 bg-white dark:bg-slate-800 animate-pulse"
          >
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24" />
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-32 my-auto" />
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-16" />
            </div>
            <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-[10px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full grid grid-cols-1 md:grid-cols-2 ${gridConfig[gridCols]} gap-2 mt-5`}>
      {displayData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="w-full border border-gray-200 dark:border-slate-700 rounded-[10px] flex justify-between p-6 bg-white dark:bg-slate-800 transition-all duration-300 group"
          >
            <div className="flex flex-col justify-between h-full">
              <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-tight">{stat.title}</p>
              <div className="flex items-baseline gap-1.5 my-auto">
                {loading && !stat.value ? (
                  <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-32 animate-pulse my-1" />
                ) : (
                  <h2 className="text-[27px] text-gray-800 dark:text-white leading-tight">
                    {stat.value}
                  </h2>
                )}
              </div>
              {stat.trend ? (
                <p className={`text-[13px] mt-1 ${
                  stat.trend.startsWith('-')
                    ? 'text-red-600 dark:text-red-400'
                    : stat.trend.startsWith('+')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {stat.trend}
                </p>
              ) : (
                loading ? (
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded -16 animate-pulse mt-1" />
                ) : null
              )}
            </div>
            <div className="min-w-12 h-12 bg-[#f0f5ff] dark:bg-blue-900/40 rounded-[10px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;



