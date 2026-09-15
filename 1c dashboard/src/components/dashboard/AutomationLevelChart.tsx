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
  { name: 'Янв', auto: 85, manual: 15 },
  { name: 'Фев', auto: 88, manual: 12 },
  { name: 'Мар', auto: 90, manual: 10 },
  { name: 'Апр', auto: 92, manual: 8 },
  { name: 'Май', auto: 95, manual: 5 },
  { name: 'Июн', auto: 98, manual: 2 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[13px] text-gray-600 dark:text-gray-400">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const AutomationLevelChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700/60 transition-colors duration-300">
      <h3 className="text-[16px] text-gray-900 dark:text-white mb-6">
        Уровень автоматизации (%)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F59F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1F59F6" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FA8C16" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#FA8C16" stopOpacity={0.01}/>
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
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              ticks={[0, 20, 40, 60, 80, 100]}
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
            <Area
              name="Автоматически"
              type="monotone"
              dataKey="auto"
              stroke="#1F59F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAuto)"
              animationDuration={1500}
            />
            <Area
              name="Вручную"
              type="monotone"
              dataKey="manual"
              stroke="#FA8C16"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorManual)"
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

export default AutomationLevelChart;
