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
  { name: 'Янв', inflow: 3.2, outflow: 2.8 },
  { name: 'Фев', inflow: 3.5, outflow: 2.9 },
  { name: 'Мар', inflow: 3.8, outflow: 3.2 },
  { name: 'Апр', inflow: 4.0, outflow: 3.5 },
  { name: 'Май', inflow: 4.2, outflow: 3.6 },
  { name: 'Июн', inflow: 4.5, outflow: 3.8 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-10 mt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-3">
          <div className="flex items-center justify-center relative w-4">
            <div
              className="h-[2px] w-[20px] rounded-full opacity-80"
              style={{ backgroundColor: entry.color }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full border-[1.5px] bg-white"
              style={{ borderColor: entry.color }}
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

const InflowOutflowDynamicsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Динамика поступлений и выплат (млрд сум)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
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
              ticks={[0, 1.2, 2.4, 3.6, 4.8]}
              domain={[0, 4.8]}
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
              name="Поступления"
              type="monotone"
              dataKey="inflow"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorInflow)"
              animationDuration={1500}
            />
            <Area
              name="Выплаты"
              type="monotone"
              dataKey="outflow"
              stroke="#ef4444"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorOutflow)"
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

export default InflowOutflowDynamicsChart;
