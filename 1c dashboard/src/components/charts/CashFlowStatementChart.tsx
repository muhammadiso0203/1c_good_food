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

const data = [
  { name: "Янв", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 145 },
  { name: "Фев", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 165 },
  { name: "Мар", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 150 },
  { name: "Апр", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 175 },
  { name: "Май", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 160 },
  { name: "Июн", "Операционная деятельность": 0, "Инвестиционная деятельность": 0, "Финансовая деятельность": 180 },
];

const CashFlowStatementChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Отчет о движении денежных средств (млн сум)
      </h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              ticks={[-65, 0, 65, 130, 195]}
              domain={[-65, 195]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
              }}
            />
            <Bar
              name="Операционная деятельность"
              dataKey="Операционная деятельность"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={35}
            />
            <Bar
              name="Инвестиционная деятельность"
              dataKey="Инвестиционная деятельность"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={35}
            />
            <Bar
              name="Финансовая деятельность"
              dataKey="Финансовая деятельность"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={35}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={
                <div className="flex justify-center items-center gap-6 mt-6 text-[15px]">
                  <div className="flex items-center gap-2 text-green-700 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-[3px] bg-[#10B981]" />
                    <span>Операционная деятельность</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-[3px] bg-[#EF4444]" />
                    <span>Инвестиционная деятельность</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-[3px] bg-[#3B82F6]" />
                    <span>Финансовая деятельность</span>
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

export default CashFlowStatementChart;
