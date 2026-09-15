import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Янв', plan: 285, fact: 285 },
  { name: 'Фев', plan: 310, fact: 320 },
  { name: 'Мар', plan: 300, fact: 300 },
  { name: 'Апр', plan: 345, fact: 350 },
  { name: 'Май', plan: 330, fact: 335 },
  { name: 'Июн', plan: 370, fact: 380 },
];

const PlanVsFactChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        План vs Факт исполнения (млн сум)
      </h3>
      <div className="w-full h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-slate-700 opacity-60"
            />
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
              ticks={[0, 95, 190, 285, 380]}
              domain={[0, 380]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '10px 14px',
              }}
              formatter={(val: any) => [`${val} млн сум`]}
            />
            <Area
              name="Факт"
              type="monotone"
              dataKey="fact"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorFact)"
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            />
            <Line
              name="План"
              type="monotone"
              dataKey="plan"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={{ r: 3, fill: '#94a3b8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-4 text-xs font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 border-t-2 border-dashed border-gray-400"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>План</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-blue-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span>Факт</span>
        </div>
      </div>
    </div>
  );
};

export default PlanVsFactChart;
