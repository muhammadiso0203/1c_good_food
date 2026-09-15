import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const data = [
  { name: "Июл", План: 170, Прогноз: 180 },
  { name: "Авг", План: 185, Прогноз: 195 },
  { name: "Сен", План: 195, Прогноз: 205 },
  { name: "Окт", План: 210, Прогноз: 220 },
  { name: "Ноя", План: 220, Прогноз: 230 },
  { name: "Дек", План: 230, Прогноз: 240 },
];

const ForecastH2Chart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Прогноз на H2 2026 (млн сум)
      </h3>
      <div className="w-full h-75">
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
              axisLine={true}
              tick={{ fill: "#64748b", fontSize: 15 }}
              dy={10}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tick={{ fill: "#64748b", fontSize: 15 }}
              ticks={[0, 65, 130, 195, 260]}
              domain={[0, 260]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
              }}
            />
            <Line
              type="monotone"
              dataKey="План"
              stroke="#94A3B8"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Прогноз"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={
                <div className="flex justify-center items-center gap-6 mt-4 text-[15px] font-medium">
                  <div className="flex items-center gap-1.5 text-[#94A3B8]">
                    <svg width="24" height="12" className="inline-block">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#94A3B8" strokeWidth="2" />
                      <circle cx="12" cy="6" r="3.5" fill="#ffffff" stroke="#94A3B8" strokeWidth="2" />
                    </svg>
                    <span>План</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#10B981]">
                    <svg width="24" height="12" className="inline-block">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#10B981" strokeWidth="2" />
                      <circle cx="12" cy="6" r="3.5" fill="#ffffff" stroke="#10B981" strokeWidth="2" />
                    </svg>
                    <span>Прогноз</span>
                  </div>
                </div>
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastH2Chart;
