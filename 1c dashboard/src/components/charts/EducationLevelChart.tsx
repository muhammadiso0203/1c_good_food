import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useKadr } from '@/pages/dashboard/kadri/service/useKadr';

const EducationLevelChart = () => {
  const { data: kadrData } = useKadr();

  const higher = kadrData?.HigherEducation;
  const mediumSpecial = kadrData?.MediumSpecialEducation;
  const secondary = kadrData?.SecondaryEducation;

  const data = [
    { name: 'Высшее', value: higher, color: '#10b981' },
    { name: 'Среднее спец.', value: mediumSpecial, color: '#f59e0b' },
    { name: 'Среднее', value: secondary, color: '#9ca3af' },
  ];

  return (
    <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Уровень образования
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={true}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              type="number"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 15 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 15 }}
              width={100}
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
            <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={55}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EducationLevelChart;
