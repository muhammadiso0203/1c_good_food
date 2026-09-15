import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Янв', 'Входит в ФОТ': 235, 'Не входит в ФОТ': 35, 'Итого выплат': 270 },
  { name: 'Фев', 'Входит в ФОТ': 242, 'Не входит в ФОТ': 38, 'Итого выплат': 280 },
  { name: 'Мар', 'Входит в ФОТ': 250, 'Не входит в ФОТ': 40, 'Итого выплат': 290 },
  { name: 'Апр', 'Входит в ФОТ': 262, 'Не входит в ФОТ': 42, 'Итого выплат': 304 },
  { name: 'Май', 'Входит в ФОТ': 270, 'Не входит в ФОТ': 45, 'Итого выплат': 315 },
  { name: 'Июн', 'Входит в ФОТ': 278, 'Не входит в ФОТ': 48, 'Итого выплат': 326 },
];

const GroupedPaymentsByTypeChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-6">
        Группировка выплат по видам (млн сум)
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
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
              domain={[0, 320]}
              ticks={[0, 80, 160, 240, 320]}
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
              iconSize={10}
              formatter={(value) => {
                // Return styled text with correct bullet shape color
                return (
                  <span className="text-[15px] font-medium text-slate-600 dark:text-gray-300 ml-1">
                    {value}
                  </span>
                );
              }}
            />
            <Bar dataKey="Входит в ФОТ" stackId="a" fill="#10b981" barSize={130} />
            <Bar dataKey="Не входит в ФОТ" stackId="a" fill="#f59e0b" barSize={130} />
            <Line
              type="monotone"
              dataKey="Итого выплат"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GroupedPaymentsByTypeChart;
