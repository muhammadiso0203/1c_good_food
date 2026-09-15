/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Амортизация', rsbu: 50, ifrs: 57 },
  { name: 'Резервы', rsbu: 28, ifrs: 33 },
  { name: 'Доходы', rsbu: 78, ifrs: 82 },
  { name: 'Обязательства', rsbu: 34, ifrs: 36 },
  { name: 'Активы', rsbu: 90, ifrs: 95 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: entry.color }} />
          <span className="text-[13px] text-gray-600 dark:text-gray-400">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const MainAdjustmentsChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700/60 transition-colors duration-300">
      <h3 className="text-[16px] text-gray-900 dark:text-white mb-6">
        Основные корректировки (млн сум)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontSize: '13px' }}
              labelStyle={{ fontSize: '13px', marginBottom: '4px', color: '#1e293b' }}
            />
            <Bar
              name="РСБУ"
              dataKey="rsbu"
              fill="#1F59F6"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar
              name="МСФО"
              dataKey="ifrs"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainAdjustmentsChart;
