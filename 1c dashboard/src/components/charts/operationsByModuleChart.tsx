/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'Бухгалтерия', value: 3500 },
  { name: 'Закупки', value: 2847 },
  { name: 'Склад', value: 2156 },
  { name: 'Кадры/Зарплата', value: 1900 },
  { name: 'АМИ/МДМС', value: 1600 },
  { name: 'Документооборот', value: 1000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 rounded-lg">
        <p className="font-bold text-gray-700 mb-1">{payload[0].payload.name}</p>
        <p className="text-blue-400 font-normal">
          Операций за месяц : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const OperationsByModuleChart = () => {
  return (
    <div className="w-full h-[450px] bg-white dark:bg-slate-800 p-[20px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300 dark:[&_text]:fill-gray-300! dark:[&_line.recharts-cartesian-grid-line]:stroke-slate-700! dark:[&_.recharts-default-tooltip]:bg-slate-800! dark:[&_.recharts-default-tooltip]:border-slate-700!">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6 transition-colors duration-300">
        Распределение операций по модулям
      </h3>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 100,
              bottom: 5,
            }}
            barGap={0}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={true}
              stroke="#e5e7eb"
              className="dark:stroke-slate-700"
            />

            <XAxis
              type="number"
              domain={[0, 3600]}
              ticks={[0, 900, 1800, 2700, 3600]}
              axisLine={true}
              tickLine={true}
              tick={{ fill: '#9ca3af', fontSize: 14 }}
              dy={10}
            />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={true}
              tickLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
              tick={{ fill: '#6b7280', fontSize: 16 }}
              width={100}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />

            <Bar
              dataKey="value"
              fill="#4285F4"
              radius={[0, 4, 4, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#4285F4"
                  style={{ filter: entry.name === 'Закупки' ? 'none' : 'none' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OperationsByModuleChart;
