import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const cashPositionData = [
  { name: "01.06", amount: 1220 },
  { name: "05.06", amount: 1260 },
  { name: "10.06", amount: 1310 },
  { name: "15.06", amount: 1400 },
  { name: "20.06", amount: 1490 },
  { name: "25.06", amount: 1560 },
  { name: "30.06", amount: 1636 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3.5 border border-gray-200/80 dark:border-slate-700 rounded-[8px] text-left">
        <p className="text-[14px] text-gray-900 dark:text-white mb-1">
          {label}
        </p>
        <p className="text-[14px] text-[#3B82F6] dark:text-[#60a5fa] whitespace-nowrap">
          Остаток : {payload[0].value} млн сум
        </p>
      </div>
    );
  }
  return null;
};

const CashPositionChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Денежная позиция (млн сум)
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={cashPositionData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
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
              axisLine={true}
              tick={{ fill: "#64748b", fontSize: 15 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tick={{ fill: "#64748b", fontSize: 15 }}
              ticks={[0, 450, 900, 1350, 1800]}
              domain={[0, 1800]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCash)"
              activeDot={{ r: 6 }}
              dot={false}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={
                <div className="flex justify-center items-center gap-2 mt-4 text-[13px] text-[#3B82F6] dark:text-[#60a5fa] font-medium">
                  <div className="flex items-center gap-1.5">
                    <svg width="24" height="12" className="inline-block">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#3B82F6" strokeWidth="2" />
                      <circle cx="12" cy="6" r="3.5" fill="#ffffff" stroke="#3B82F6" strokeWidth="2" />
                    </svg>
                    <span>Остаток</span>
                  </div>
                </div>
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashPositionChart;
