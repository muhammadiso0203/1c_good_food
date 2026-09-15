/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Расходы по налогам', value: 22, color: '#3b82f6' },
  { name: 'Ремонтный фонд (текущий)', value: 12, color: '#10b981' },
  { name: 'Ремонтный фонд (капитальный)', value: 8, color: '#0d9488' },
  { name: 'Услуги', value: 15, color: '#f59e0b' },
  { name: 'ГСМ', value: 7, color: '#ea580c' },
  { name: 'Износ (амортизация)', value: 18, color: '#8b5cf6' },
  { name: 'Расходы по фин. деятель', value: 11, color: '#ef4444' },
  { name: 'Прочие расходы', value: 7, color: '#94a3b8' },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
  name,
}: any) => {
  const radius = outerRadius * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const color = data[index].color;

  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[16px]"
    >
      {`${name}: ${Math.round(percent * 100)}%`}
    </text>
  );
};

const ExpenseStructureChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-8 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[20px] font-medium text-[#0f172a] dark:text-white mb-4">
        Структура расходов
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              paddingAngle={0.8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip itemStyle={{ color: "black" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseStructureChart;
