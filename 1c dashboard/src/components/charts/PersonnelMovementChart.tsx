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
  { name: 'Янв', hired: 18, terminated: 6, transferred: 10 },
  { name: 'Фев', hired: 22, terminated: 8, transferred: 15 },
  { name: 'Мар', hired: 25, terminated: 12, transferred: 8 },
  { name: 'Апр', hired: 20, terminated: 10, transferred: 12 },
  { name: 'Май', hired: 24, terminated: 5, transferred: 14 },
  { name: 'Июн', hired: 28, terminated: 8, transferred: 18 },
];

const PersonnelMovementChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Движение персонала
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
            />
            <YAxis
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
              domain={[0, 30]}
              ticks={[0, 7, 14, 21, 28]}
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
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
            <Bar name="Принято" dataKey="hired" fill="#10b981" radius={[3, 3, 0, 0]} />
            <Bar name="Уволено" dataKey="terminated" fill="#ef4444" radius={[3, 3, 0, 0]} />
            <Bar name="Переведено" dataKey="transferred" fill="#3b82f6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PersonnelMovementChart;
