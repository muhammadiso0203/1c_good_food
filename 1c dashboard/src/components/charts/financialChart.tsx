import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Янв', vyruchka: 285, rasxodi: 180, pribil: 105 },
  { name: 'Фев', vyruchka: 312, rasxodi: 195, pribil: 117 },
  { name: 'Мар', vyruchka: 295, rasxodi: 185, pribil: 110 },
  { name: 'Апр', vyruchka: 350, rasxodi: 210, pribil: 140 },
  { name: 'Май', vyruchka: 330, rasxodi: 200, pribil: 130 },
  { name: 'Июн', vyruchka: 375, rasxodi: 220, pribil: 155 },
];

const FinancialChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-[20px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
        Основные финансовые показатели (млн сум)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            axisLine={true}
            tickLine={true}
            stroke="#888"
          />
          <YAxis
            axisLine={true}
            tickLine={true}
            stroke="#888"
            ticks={[0, 95, 190, 285, 380]}
          />
          <Tooltip
            itemSorter={(item) => {
              if (item.name === 'Выручка') return 1;
              if (item.name === 'Расходы') return 2;
              if (item.name === 'Прибыль') return 3;
              return 4;
            }}
            contentStyle={{ borderRadius: '10px', backgroundColor: 'white' }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
          />

          {/* Vyruchka (Yashil ustun) */}
          <Bar
            name="Выручка"
            dataKey="vyruchka"
            fill="#10B981"
            barSize={40}
            radius={[4, 4, 0, 0]}
          />

          {/* Rasxodi (Qizil ustun) */}
          <Bar
            name="Расходы"
            dataKey="rasxodi"
            fill="#EF4444"
            barSize={40}
            radius={[4, 4, 0, 0]}
          />

          {/* Pribil (Moviy chiziq) */}
          <Line
            name="Прибыль"
            type="monotone"
            dataKey="pribil"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }}
            activeDot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;