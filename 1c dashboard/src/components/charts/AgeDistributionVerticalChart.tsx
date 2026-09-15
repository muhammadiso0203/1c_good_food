import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useKadr } from '@/pages/dashboard/kadri/service/useKadr';

const AgeDistributionVerticalChart = () => {
  const { data: kadrData } = useKadr();

  const ageData = [
    { name: 'До 30 лет', count: kadrData?.Age_30 ?? 1173 },
    { name: '30-40 лет', count: kadrData?.Age_30_40 ?? 483 },
    { name: '40-50 лет', count: kadrData?.Age_40_50 ?? 431 },
    { name: '50-60 лет', count: kadrData?.Age_50_60 ?? 327 },
    { name: '60+ лет', count: kadrData?.Age_60 ?? 2 },
  ];

  return (
    <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Возрастное распределение
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ageData}
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
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 15 }}
            />
            <YAxis
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 15 }}
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
            <Bar name="Сотрудники" dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={70} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgeDistributionVerticalChart;
