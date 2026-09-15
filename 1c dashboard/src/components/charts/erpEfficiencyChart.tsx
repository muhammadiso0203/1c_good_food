/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'МСФО', value: 99.2, color: '#10b981' },
  { name: 'АМИ/МДМС', value: 98.1, color: '#10b981' },
  { name: 'Бюджет', value: 98.1, color: '#10b981' },
  { name: 'Soliq', value: 97.2, color: '#10b981' },
  { name: 'Казначейство', value: 96.3, color: '#10b981' },
  { name: 'Зарплата', value: 96.3, color: '#10b981' },
  { name: 'Финансы', value: 95.4, color: '#10b981' },
  { name: 'Бухгалтерия', value: 94.2, color: '#3b82f6' },
  { name: 'ДС', value: 94.2, color: '#3b82f6' },
  { name: 'Склад', value: 93.1, color: '#3b82f6' },
  { name: 'Э/э торговля', value: 92.4, color: '#3b82f6' },
  { name: 'Кадры', value: 90.8, color: '#60a5fa' },
  { name: 'Закупки', value: 89.1, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
        <p className="text-black dark:text-gray-200 mb-0.5">{payload[0].payload.name}</p>
        <p className="text-black dark:text-white">
          Эффективность: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const ErpEfficiencyChart = () => {
  return (
    <div className="w-full h-[450px] bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 transition-all duration-300">
      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-8">
        Эффективность модулей ERP (%)
      </h3>

      <div className="w-full h-[370px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -15,
              bottom: 45,
            }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={true}
              horizontal={true}
              stroke="#e5e7eb"
              opacity={0.5}
              className="dark:stroke-slate-700"
            />

            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tick={{ fill: '#6b7280', fontSize: 16 }}
              angle={-35}
              textAnchor="end"
              interval={0}
              height={60}
            />

            <YAxis
              domain={[85, 100]}
              ticks={[85, 89, 93, 100]}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />

            <Tooltip
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={85}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ErpEfficiencyChart;
