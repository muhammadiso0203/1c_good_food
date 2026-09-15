import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Производство', plan: 150, fact: 148 },
  { name: 'Продажи', plan: 90, fact: 88 },
  { name: 'Маркетинг', plan: 45, fact: 47 },
  { name: 'ИТ', plan: 70, fact: 66 },
  { name: 'Администрация', plan: 55, fact: 52 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const itemData = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 shadow-lg text-sm space-y-1.5 min-w-[150px]">
        <h4 className="text-gray-900 dark:text-white mb-1.5">{label}</h4>
        <div className="flex items-center justify-between gap-4 text-gray-400">
          <span>План :</span>
          <span>{itemData.plan} млн сум</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-blue-500">
          <span>Факт :</span>
          <span>{itemData.fact} млн сум</span>
        </div>
      </div>
    );
  }
  return null;
};

const DepartmentBudgetExecutionChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Исполнение бюджета по департаментам
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              dy={5}
            />
            <YAxis
              axisLine={true}
              tickLine={true}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[0, 40, 80, 120, 160]}
              domain={[0, 160]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              name="Факт"
              dataKey="fact"
              fill="#3b82f6"
              barSize={100}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-4 text-xs font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-gray-400"></span>
          <span>План</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-blue-500"></span>
          <span>Факт</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBudgetExecutionChart;
