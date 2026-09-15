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

const data = [
  { name: "Янв", Операционный: 110, Итого: 140 },
  { name: "Фев", Операционный: 130, Итого: 170 },
  { name: "Мар", Операционный: 120, Итого: 155 },
  { name: "Апр", Операционный: 145, Итого: 180 },
  { name: "Май", Операционный: 135, Итого: 165 },
  { name: "Июн", Операционный: 150, Итого: 190 },
];

const CashFlowStructureChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Структура денежных потоков (млн сум)
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
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
              ticks={[0, 50, 100, 150, 200]}
              domain={[0, 200]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
              }}
            />
            <Area
              type="monotone"
              dataKey="Итого"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCF)"
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="Операционный"
              stroke="#10B981"
              strokeWidth={2}
              fill="none"
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={
                <div className="flex justify-center items-center gap-6 mt-4 text-[15px] font-medium">
                  <div className="flex items-center gap-1.5 text-[#10B981]">
                    <svg width="24" height="12" className="inline-block">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#10B981" strokeWidth="2" />
                      <circle cx="12" cy="6" r="3.5" fill="#ffffff" stroke="#10B981" strokeWidth="2" />
                    </svg>
                    <span>Операционный</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#3B82F6]">
                    <svg width="24" height="12" className="inline-block">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#3B82F6" strokeWidth="2" />
                      <circle cx="12" cy="6" r="3.5" fill="#ffffff" stroke="#3B82F6" strokeWidth="2" />
                    </svg>
                    <span>Итого</span>
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

export default CashFlowStructureChart;
