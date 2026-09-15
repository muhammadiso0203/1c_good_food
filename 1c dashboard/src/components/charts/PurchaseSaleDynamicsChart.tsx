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
  { name: 'Янв', purchase: 1250, sale: 900 },
  { name: 'Фев', purchase: 1180, sale: 920 },
  { name: 'Мар', purchase: 1350, sale: 1050 },
  { name: 'Апр', purchase: 1300, sale: 1120 },
  { name: 'Май', purchase: 1450, sale: 1210 },
  { name: 'Июн', purchase: 1380, sale: 1190 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-10 mt-6">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-3">
          <div className="flex items-center justify-center relative w-5">
            <div
              className="h-[3px] w-[20px] rounded-full opacity-80"
              style={{ backgroundColor: entry.color }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full border-2 bg-white"
              style={{ borderColor: entry.color }}
            />
          </div>
          <span
            className="text-[14px] font-medium"
            style={{ color: entry.color }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const PurchaseSaleDynamicsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700  mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-4">
        Динамика закупки и продажи
      </h3>
      <div className="w-full h-[310px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 16 }}
              dy={15}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 16 }}
              ticks={[0, 400, 800, 1200, 1600]}
              domain={[0, 1600]}
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
              name="Закупка"
              type="monotone"
              dataKey="purchase"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPurchase)"
              animationDuration={1500}
            />
            <Area
              name="Продажа"
              type="monotone"
              dataKey="sale"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSale)"
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

export default PurchaseSaleDynamicsChart;
