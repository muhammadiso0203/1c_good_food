/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Q1 2025', expenses: 45, savings: 0 },
  { name: 'Q2 2025', expenses: 42, savings: 3 },
  { name: 'Q3 2025', expenses: 38, savings: 7 },
  { name: 'Q4 2025', expenses: 35, savings: 10 },
  { name: 'Q1 2026', expenses: 32, savings: 13 },
  { name: 'Q2 2026', expenses: 28, savings: 17 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-8 mt-4">
      {payload.map((entry: any, index: number) => {
        const color = entry.color || '#10b981';
        return (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="flex items-center justify-center relative w-5 h-4">
              <div className="w-6 h-[2px]" style={{ backgroundColor: color }} />
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

const CostSavingsDynamicsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Динамика экономии затрат
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              tick={{ fill: '#64748b', fontSize: 13 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 14 }}
              ticks={[0, 15, 30, 45, 60]}
              domain={[0, 60]}
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
            <Line
              name="Затраты"
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ stroke: '#ef4444', strokeWidth: 1.5, r: 4, fill: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
            <Line
              name="Экономия"
              type="monotone"
              dataKey="savings"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ stroke: '#10b981', strokeWidth: 1.5, r: 4, fill: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostSavingsDynamicsChart;
