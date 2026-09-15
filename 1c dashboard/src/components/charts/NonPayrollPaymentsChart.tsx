import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'НК 369 - Доходы, не включаемые в совокупный доход',
    '2024 год': 45,
    '2025 год': 52,
    '2026 год': 58,
  },
  {
    name: 'НК 375 - Имущественные доходы',
    '2024 год': 34,
    '2025 год': 38,
    '2026 год': 43,
  },
  {
    name: 'НК 376 - Доходы в виде материальной выгоды',
    '2024 год': 27,
    '2025 год': 31,
    '2026 год': 35,
  },
  {
    name: 'НК 377 - Прочие доходы',
    '2024 год': 22,
    '2025 год': 27,
    '2026 год': 31,
  },
];

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const value = payload.value;
  
  let lines: string[] = [];
  if (value.startsWith('НК 369')) {
    lines = ['НК 369 - Доходы, не', 'включаемые в', 'совокупный доход'];
  } else if (value.startsWith('НК 375')) {
    lines = ['НК 375 -', 'Имущественные', 'доходы'];
  } else if (value.startsWith('НК 376')) {
    lines = ['НК 376 - Доходы в виде', 'материальной выгоды'];
  } else if (value.startsWith('НК 377')) {
    lines = ['НК 377 - Прочие', 'доходы'];
  } else {
    lines = [value];
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={lines.length > 2 ? -14 : lines.length > 1 ? -6 : 4}
        textAnchor="end"
        fill="currentColor"
        className="fill-slate-500 dark:fill-slate-400 text-[14px] font-medium leading-none"
      >
        {lines.map((line, idx) => (
          <tspan key={idx} x={-10} dy={idx * 16}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

const NonPayrollPaymentsChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-6">
        Выплаты не входящие в ФОТ (млн сум)
      </h3>
      
      <div className="w-full h-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            barGap={3}
            barSize={10}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              type="number"
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={true}
              axisLine={true}
              width={220}
              tick={<CustomYAxisTick />}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px',
              }}
              formatter={(value: any, name: any) => [`${Number(value).toLocaleString()}`, name]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="square"
              iconSize={12}
              formatter={(value) => (
                <span className="text-[13px] font-medium text-slate-600 dark:text-gray-300 ml-1">
                  {value}
                </span>
              )}
            />
            <Bar dataKey="2024 год" fill="#94a3b8" radius={[0, 3, 3, 0]} />
            <Bar dataKey="2025 год" fill="#3b82f6" radius={[0, 3, 3, 0]} />
            <Bar dataKey="2026 год" fill="#f59e0b" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NonPayrollPaymentsChart;
