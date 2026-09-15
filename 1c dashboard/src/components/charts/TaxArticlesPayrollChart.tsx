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
    name: 'НК 371 - Доходы в виде оплаты труда',
    '2023 год': 1400,
    '2024 год': 1650,
    '2025 год': 1800,
    '2026 год': 2150,
  },
  {
    name: 'НК 372 - Выплаты стимулирующего характера',
    '2023 год': 350,
    '2024 год': 380,
    '2025 год': 420,
    '2026 год': 500,
  },
  {
    name: 'НК 373 - Компенсационные выплаты (компенсация)',
    '2023 год': 200,
    '2024 год': 240,
    '2025 год': 260,
    '2026 год': 300,
  },
  {
    name: 'НК 374 - Оплата за неотработанное время',
    '2023 год': 160,
    '2024 год': 180,
    '2025 год': 200,
    '2026 год': 230,
  },
];

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const value = payload.value;
  
  let lines: string[] = [];
  if (value.startsWith('НК 371')) {
    lines = ['НК 371 - Доходы в виде', 'оплаты труда'];
  } else if (value.startsWith('НК 372')) {
    lines = ['НК 372 - Выплаты', 'стимулирующего характера'];
  } else if (value.startsWith('НК 373')) {
    lines = ['НК 373 - Компенсационные', 'выплаты (компенсация)'];
  } else if (value.startsWith('НК 374')) {
    lines = ['НК 374 - Оплата за', 'неотработанное время'];
  } else {
    lines = [value];
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={lines.length > 1 ? -6 : 4}
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

const TaxArticlesPayrollChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-6">
        Фонд оплаты труда по статьям НК 371-374 (млн сум)
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
              horizontal={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              domain={[0, 2200]}
              ticks={[0, 550, 1100, 1650, 2200]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
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
            <Bar dataKey="2023 год" fill="#94a3b8" radius={[0, 3, 3, 0]} />
            <Bar dataKey="2024 год" fill="#475569" radius={[0, 3, 3, 0]} />
            <Bar dataKey="2025 год" fill="#3b82f6" radius={[0, 3, 3, 0]} />
            <Bar dataKey="2026 год" fill="#10b981" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaxArticlesPayrollChart;
