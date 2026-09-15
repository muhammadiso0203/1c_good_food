/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Q1 2025', rsbu: 270, ifrs: 285 },
  { name: 'Q2 2025', rsbu: 292, ifrs: 312 },
  { name: 'Q3 2025', rsbu: 283, ifrs: 298 },
  { name: 'Q4 2025', rsbu: 330, ifrs: 345 },
  { name: 'Q1 2026', rsbu: 313, ifrs: 328 },
  { name: 'Q2 2026', rsbu: 372, ifrs: 387 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[10px]" style={{ backgroundColor: entry.color }} />
          <span className="text-[13px] text-gray-600 dark:text-gray-400">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const RasIfrsComparisonChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700/60 transition-colors duration-300">
      <h3 className="text-[16px] text-gray-900 dark:text-white mb-6">
        Сравнение РСБУ и МСФО (млн сум)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRsbu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F59F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1F59F6" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="colorIfrs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 14 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 14 }}
              ticks={[0, 100, 200, 300, 400]}
              domain={[0, 400]}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "6px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                padding: '12px'
              }}
              itemStyle={{ fontSize: '15px' }}
              labelStyle={{ fontSize: '15px', marginBottom: '4px', color: '#1e293b' }}
            />
            <Area
              name="РСБУ"
              type="monotone"
              dataKey="rsbu"
              stroke="#1F59F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRsbu)"
              animationDuration={1500}
            />
            <Area
              name="МСФО"
              type="monotone"
              dataKey="ifrs"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIfrs)"
              animationDuration={1500}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RasIfrsComparisonChart;
