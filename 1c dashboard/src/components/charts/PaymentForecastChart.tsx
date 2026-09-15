import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const forecastData = [
  { name: "Нед 1", Поступления: 305, Платежи: 310 },
  { name: "Нед 2", Поступления: 290, Платежи: 295 },
  { name: "Нед 3", Поступления: 325, Платежи: 330 },
  { name: "Нед 4", Поступления: 295, Платежи: 300 },
];

const PaymentForecastChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Прогноз платежей и поступлений
      </h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={forecastData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={6}
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
              ticks={[0, 85, 170, 255, 340]}
              domain={[0, 340]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
              }}
            />
            <Bar
              name="Поступления"
              dataKey="Поступления"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={100}
            />
            <Bar
              name="Платежи"
              dataKey="Платежи"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={100}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={
                <div className="flex justify-center items-center gap-6 mt-2 text-[17px]">
                  <div className="flex items-center gap-2 text-green-700 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-[3px] bg-[#10B981]" />
                    <span>Поступления</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-[3px] bg-[#EF4444]" />
                    <span>Платежи</span>
                  </div>
                </div>
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentForecastChart;
