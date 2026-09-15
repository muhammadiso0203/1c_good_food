/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Счета-фактуры', value: 38, color: '#3b82f6' },
  { name: 'Акты выполненных работ', value: 22, color: '#10b981' },
  { name: 'ТТН', value: 18, color: '#f59e0b' },
  { name: 'Доверенности', value: 12, color: '#8b5cf6' },
  { name: 'Договоры', value: 7, color: '#ec4899' },
  { name: 'Накладные', value: 3, color: '#94a3b8' },
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

const SoliqDocumentTypeChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 mt-6">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Распределение по типам документов
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
              outerRadius={85}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
              paddingAngle={0.8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ color: 'black' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoliqDocumentTypeChart;
