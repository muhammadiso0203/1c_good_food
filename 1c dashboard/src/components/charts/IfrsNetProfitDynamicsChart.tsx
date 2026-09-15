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
  { name: '2021', profit: 160 },
  { name: '2022', profit: 195 },
  { name: '2023', profit: 220 },
  { name: '2024', profit: 245 },
  { name: '2025', profit: 270 },
  { name: '2026 (П)', profit: 280 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-8 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="flex items-center justify-center relative w-5">
            <div
              className="h-[2px] w-[16px] rounded-full opacity-80"
              style={{ backgroundColor: entry.color }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full border bg-white"
              style={{ borderColor: entry.color, borderWidth: '1.5px' }}
            />
          </div>
          <span className="text-[14px]" style={{ color: entry.color }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const IfrsNetProfitDynamicsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Динамика чистой прибыли по МСФО (млрд сум)
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
              tick={{ fill: '#64748b', fontSize: 14 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 14 }}
              ticks={[0, 75, 150, 225, 300]}
              domain={[0, 300]}
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
              name="Чистая прибыль"
              type="monotone"
              dataKey="profit"
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

export default IfrsNetProfitDynamicsChart;
