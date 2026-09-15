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
  { name: 'Кабельная продукция', capacity: 95 },
  { name: 'Трансформаторы', capacity: 80 },
  { name: 'Опоры ЛЭП', capacity: 70 },
  { name: 'Инструменты', capacity: 45 },
  { name: 'Запчасти / ХозТМЦ', capacity: 60 },
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

const WarehouseUtilizationChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Заполненность складов по категориям (%)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              type="number"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              domain={[0, 100]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              width={140}
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
              name="Занятость объема"
              dataKey="capacity"
              fill="#f59e0b"
              radius={[0, 4, 4, 0]}
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

export default WarehouseUtilizationChart;
