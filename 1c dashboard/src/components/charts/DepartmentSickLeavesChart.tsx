import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useMainpage } from '@/pages/dashboard/abzor/service/useMainpage';

const defaultData = [
  { name: 'Производство', days: 150 },
  { name: 'Продажи', days: 85 },
  { name: 'Логистика', days: 75 },
  { name: 'Администрация', days: 45 },
  { name: 'ИТ', days: 30 },
  { name: 'Бухгалтерия', days: 20 },
];

const DepartmentSickLeavesChart = () => {
  const { data: mainpageData, isLoading } = useMainpage();

  const chartData = useMemo(() => {
    if (!mainpageData) return defaultData;

    const results: { name: string; days: number }[] = [];

    const search = (currentObj: any) => {
      if (!currentObj || typeof currentObj !== 'object') return;

      for (const key in currentObj) {
        if (key.startsWith('БольничныйПоПодразделениям_в34___')) {
          const value = Number(currentObj[key]) || 0;
          
          // Clear name: remove "БольничныйПоПодразделениям_в34___"
          const cleanName = key
            .replace('БольничныйПоПодразделениям_в34___', '')
            .replace(/_/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');

          results.push({ name: cleanName, days: value });
        } else if (currentObj[key] && typeof currentObj[key] === 'object') {
          search(currentObj[key]);
        }
      }
    };

    search(mainpageData);

    if (results.length === 0) return defaultData;

    // Sort by days descending
    return results.sort((a, b) => b.days - a.days);
  }, [mainpageData]);

  // Adjust height dynamically based on the number of items
  const isDynamic = chartData !== defaultData;
  const containerHeight = isDynamic ? Math.max(400, chartData.length * 35 + 80) : 400;
  const chartHeight = isDynamic ? Math.max(300, chartData.length * 35) : 300;

  // Find max value for ticks
  const maxDays = useMemo(() => {
    if (chartData.length === 0) return 160;
    const maxVal = Math.max(...chartData.map(d => d.days));
    return maxVal > 0 ? maxVal : 160;
  }, [chartData]);

  // Create nice ticks up to maxDays
  const ticks = useMemo(() => {
    const roundedMax = Math.ceil(maxDays / 40) * 40;
    const step = roundedMax / 4;
    return [0, step, step * 2, step * 3, roundedMax];
  }, [maxDays]);

  if (isLoading) {
    return (
      <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 animate-pulse flex flex-col justify-between transition-colors duration-300">
        <div className="h-6 w-64 bg-gray-200 dark:bg-slate-700 rounded mb-6"></div>
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-[80%]"></div>
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-[60%]"></div>
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-[40%]"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300"
      style={{ height: containerHeight }}
    >
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Больничные листы по подразделениям (дни)
      </h3>
      <div className="w-full" style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              type="number"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              domain={[0, ticks[4]]}
              ticks={ticks}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={150}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              formatter={(value) => [`${value} дн.`, 'Количество дней']}
            />
            <Bar dataKey="days" fill="#f59e0b" radius={[0, 3, 3, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentSickLeavesChart;
