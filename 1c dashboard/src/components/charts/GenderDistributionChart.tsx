import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useKadr } from '@/pages/dashboard/kadri/service/useKadr';

const GenderDistributionChart = () => {
  const { data: kadrData } = useKadr();

  const maleCount = kadrData?.GenderDistributionMaleGender;
  const femaleCount = kadrData?.GenderDistributionFemaleGender;

  const data = [
    { name: 'Мужской', value: maleCount, color: '#3b82f6' },
    { name: 'Женский', value: femaleCount, color: '#ec4899' },
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25; // label offset
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
        className="text-[14px]"
      >
        {`${name}: ${value}`}
      </text>
    );
  };

  return (
    <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Распределение по полу
      </h3>
      <div className="w-full h-75 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={0}
              outerRadius={90}
              dataKey="value"
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px',
              }}
              formatter={(value: any) => [`${value} чел.`, 'Количество']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenderDistributionChart;
