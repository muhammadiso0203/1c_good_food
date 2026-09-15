/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataItem {
  name: string;
  actual: number;
  target: number;
}

const data: ChartDataItem[] = [
  { name: 'Счет-фактура', actual: 2.3, target: 3.0 },
  { name: 'Акт работ', actual: 3.8, target: 4.0 },
  { name: 'Договор', actual: 5.2, target: 5.0 },
  { name: 'Накладная', actual: 1.8, target: 2.0 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as ChartDataItem;
    return (
      <div className="bg-white dark:bg-slate-900 px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-[12px] shadow-md">
        <p className="text-[15px] font-medium text-gray-900 dark:text-white mb-1">
          {item.name}
        </p>
        <p className="text-[14px] text-[#3b82f6] dark:text-[#60a5fa] font-medium mb-0.5">
          Фактическое время : {item.actual} дней
        </p>
        <p className="text-[14px] text-[#94a3b8] dark:text-[#a1a1aa] font-medium">
          Целевое время : {item.target} дней
        </p>
      </div>
    );
  }
  return null;
};

const AverageProcessingTimeChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Среднее время обработки (дни)
      </h3>
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              tick={{ fill: '#64748b', fontSize: 16 }}
              dy={10}
            />
            <YAxis
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[0, 2, 4, 6, 8]}
              domain={[0, 8]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#cbd5e1', opacity: 0.4 }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              iconSize={12}
              formatter={(value) => (
                <span className="text-[14px] text-gray-600 dark:text-gray-300 ml-1">
                  {value === 'actual' ? 'Фактическое время' : 'Целевое время'}
                </span>
              )}
            />
            <Bar
              name="actual"
              dataKey="actual"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={100}
            />
            <Bar
              name="target"
              dataKey="target"
              fill="#94a3b8"
              radius={[4, 4, 0, 0]}
              barSize={100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageProcessingTimeChart;
