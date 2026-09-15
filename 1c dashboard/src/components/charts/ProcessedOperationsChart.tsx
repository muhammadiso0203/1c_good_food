/* eslint-disable @typescript-eslint/no-explicit-any */
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
  { name: 'Янв', processed: 2850 },
  { name: 'Фев', processed: 3100 },
  { name: 'Мар', processed: 3000 },
  { name: 'Апр', processed: 3300 },
  { name: 'Май', processed: 3200 },
  { name: 'Июн', processed: 3443 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-8 mt-4">
      {payload.map((entry: any, index: number) => {
        const color = entry.color || '#10b981';
        return (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="flex items-center justify-center relative w-6 h-4">
              <div className="w-6 h-[1.5px]" style={{ backgroundColor: color }} />
              <div 
                className="absolute w-2 h-2 rounded-full bg-white border border-current" 
                style={{ borderColor: color, color: color }} 
              />
            </div>
            <span className="text-[14px]" style={{ color: color }}>
              {entry.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ProcessedOperationsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Объем обработанных операций
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 14 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 14 }}
              ticks={[0, 900, 1800, 2700, 3600]}
              domain={[0, 3600]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
            />
            <Area
              name="Обработано"
              type="monotone"
              dataKey="processed"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorProcessed)"
              dot={false}
              activeDot={{ r: 6 }}
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

export default ProcessedOperationsChart;
