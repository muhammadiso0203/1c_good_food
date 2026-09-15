import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: '1-3 года', count: 150 },
  { name: '3-5 лет', count: 280 },
  { name: '5-7 лет', count: 420 },
  { name: '7-10 лет', count: 500 },
  { name: '10-15 лет', count: 350 },
  { name: '15-20 лет', count: 210 },
  { name: '20-30 лет', count: 140 },
  { name: '30+ лет', count: 80 },
];

const TenureSeniorityChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Стаж в энергосистеме по структурным подразделениям
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
              tick={{ fill: '#64748b', fontSize: 13 }}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              domain={[0, 600]}
              ticks={[0, 150, 300, 450, 600]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              formatter={(value) => [`${value} чел.`, 'Количество']}
            />
            <Bar name="Сотрудники" dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TenureSeniorityChart;
