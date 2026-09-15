/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Филиал Ташкент', operations: 1250 },
  { name: 'Филиал Самарканд', operations: 950 },
  { name: 'Филиал Бухара', operations: 850 },
  { name: 'Филиал Фергана', operations: 780 },
  { name: 'Филиал Андижан', operations: 720 },
];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-8 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: entry.color }} />
          <span className="text-[14px]" style={{ color: entry.color }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const BranchEfficiencyChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Эффективность филиалов
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 15 }}
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
              tick={{ fill: '#64748b', fontSize: 15 }}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              yAxisId="left"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[0, 350, 700, 1050, 1400]}
              domain={[0, 1400]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[95, 97, 100]}
              domain={[95, 100]}
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
            <Bar
              yAxisId="left"
              name="Операций"
              dataKey="operations"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchEfficiencyChart;
