import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Янв', '2024 год': 185, '2025 год': 210, '2026 год': 238 },
  { name: 'Фев', '2024 год': 192, '2025 год': 216, '2026 год': 246 },
  { name: 'Мар', '2024 год': 198, '2025 год': 225, '2026 год': 255 },
  { name: 'Апр', '2024 год': 206, '2025 год': 235, '2026 год': 265 },
  { name: 'Май', '2024 год': 215, '2025 год': 242, '2026 год': 275 },
  { name: 'Июн', '2024 год': 220, '2025 год': 250, '2026 год': 282 },
];

const YearlyPayrollDynamicsChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-6">
        Динамика ФОТ по годам
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#64748b', fontSize: 15, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#64748b', fontSize: 15, fontWeight: 500 }}
              domain={[0, 280]}
              ticks={[0, 70, 140, 210, 280]}
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
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-[15px] font-medium text-slate-600 dark:text-gray-300 ml-1">
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="2024 год"
              stroke="#94a3b8"
              strokeWidth={2}
              dot={{ r: 3, fill: '#fff', stroke: '#94a3b8', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="2025 год"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="2026 год"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#fff', stroke: '#10b981', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyPayrollDynamicsChart;
