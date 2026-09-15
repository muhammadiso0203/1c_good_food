import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Производство', value: 1245 },
  { name: 'Администрация ', value: 680 },
  { name: 'Продажи', value: 530 },
  { name: 'ИТ', value: 350 },
  { name: 'Бухгалтерия', value: 280 },
  { name: 'Логистика', value: 280 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 border border-gray-200 dark:border-slate-700 rounded-[5px]">
        <p className="text-[16px] font-semibold text-slate-800 dark:text-white mb-1 leading-none">
          {payload[0].payload.name}
        </p>
        <p className="text-[14px] text-blue-600 dark:text-blue-400 font-medium leading-none mt-1.5">
          ФОТ (млн сум) : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const StructuralDivisionsChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-6">
        ФОТ по структурным подразделениям
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              domain={[0, 1400]}
              ticks={[0, 350, 700, 1050, 1400]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StructuralDivisionsChart;
