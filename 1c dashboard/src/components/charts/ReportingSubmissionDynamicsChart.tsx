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
  { name: 'Янв', submitted: 12, pending: 6 },
  { name: 'Фев', submitted: 14, pending: 4 },
  { name: 'Мар', submitted: 15, pending: 3 },
  { name: 'Апр', submitted: 16, pending: 2 },
  { name: 'Май', submitted: 18, pending: 0 },
  { name: 'Июн', submitted: 17, pending: 1 },
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

const ReportingSubmissionDynamicsChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Динамика сдачи отчетности учреждений
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              ticks={[0, 5, 10, 15, 20]}
              domain={[0, 20]}
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
              name="Сдано вовремя"
              dataKey="submitted"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar
              name="В процессе"
              dataKey="pending"
              fill="#f59e0b"
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

export default ReportingSubmissionDynamicsChart;
