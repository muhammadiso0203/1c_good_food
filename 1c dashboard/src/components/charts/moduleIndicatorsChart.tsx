/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  {
    subject: 'Финансы',
    A: 85,
    B: 80,
    C: 85,
    fullMark: 100,
  },
  {
    subject: 'АМИ/МДМС',
    A: 80,
    B: 85,
    C: 80,
    fullMark: 100,
  },
  {
    subject: 'Кадры',
    A: 75,
    B: 70,
    C: 80,
    fullMark: 100,
  },
  {
    subject: 'Закупки',
    A: 90,
    B: 88,
    C: 92,
    fullMark: 100,
  },
  {
    subject: 'Склад',
    A: 85,
    B: 82,
    C: 85,
    fullMark: 100,
  },
  {
    subject: 'Казначейство',
    A: 80,
    B: 78,
    C: 82,
    fullMark: 100,
  },
];

const ModuleIndicatorsChart = () => {
  return (
    <div className="w-full h-[450px] bg-white dark:bg-slate-800 p-[20px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300 dark:[&_text]:fill-gray-300! dark:[&_line.recharts-cartesian-grid-line]:stroke-slate-700! dark:[&_.recharts-default-tooltip]:bg-slate-800! dark:[&_.recharts-default-tooltip]:border-slate-700!">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6 transition-colors duration-300">
        Показатели модулей (средние значения)
      </h3>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#6b7280', fontSize: 13 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tickCount={5}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
            />

            <Radar
              name="Производительность"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
            <Radar
              name="Автоматизация"
              dataKey="B"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
            <Radar
              name="Качество"
              dataKey="C"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.4}
            />

            <Tooltip
              contentStyle={{ borderRadius: '10px' }}
            />
            <Legend
              verticalAlign="bottom"
              height={1}
              iconType="square"
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color, fontSize: '16px' }}>{value}</span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModuleIndicatorsChart;
