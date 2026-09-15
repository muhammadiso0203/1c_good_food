/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

const data: ChartDataItem[] = [
  { name: 'Подписан', value: 148, color: '#10b981' },
  { name: 'В процессе', value: 28, color: '#3b82f6' },
  { name: 'Ожидает подписи', value: 15, color: '#f59e0b' },
  { name: 'Ожидает подписи доверенного лица', value: 8, color: '#ea580c' },
  { name: 'Отказан', value: 4, color: '#ef4444' },
  { name: 'Не действительный', value: 2, color: '#b91c1c' },
  { name: 'Отменено', value: 1, color: '#94a3b8' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as ChartDataItem;
    return (
      <div className="bg-white dark:bg-slate-900 px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-[12px] shadow-md">
        <p className="text-[15px] text-gray-900 dark:text-white mb-1">
          {item.name}
        </p>
        <p className="text-[15px] text-[#4f46e5] dark:text-[#6366f1]">
          Количество документов : <span className="text-[#4f46e5] dark:text-[#6366f1]">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const DocumentStatusChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Статусы документов
      </h3>
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
            barSize={120}
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
              tick={{ fill: '#64748b', fontSize: 15 }}
              angle={-15}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[0, 40, 80, 120, 160]}
              domain={[0, 160]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#cbd5e1', opacity: 0.4 }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DocumentStatusChart;

