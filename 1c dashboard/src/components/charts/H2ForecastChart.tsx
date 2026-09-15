import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Июл', plan: 380, forecast: 380 },
  { name: 'Авг', plan: 390, forecast: 393 },
  { name: 'Сен', plan: 400, forecast: 402 },
  { name: 'Окт', plan: 410, forecast: 412 },
  { name: 'Ноя', plan: 420, forecast: 421 },
  { name: 'Дек', plan: 435, forecast: 437 },
];

const H2ForecastChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className=" text-[18px] text-gray-900 dark:text-white mb-6 font-semibold">
        Прогноз на H2 2026
      </h3>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
              ticks={[0, 150, 300, 450, 600]}
              domain={[0, 600]}
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
            <Line
              name="Прогноз"
              type="monotone"
              dataKey="forecast"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 4, stroke: '#10b981', strokeWidth: 1.5, fill: '#fff' }}
              activeDot={{ r: 6 }}
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
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 border-t-2 border-dashed border-gray-400"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>План</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-emerald-600 dark:text-emerald-400">Прогноз</span>
        </div>
      </div>
    </div>
  );
};

export default H2ForecastChart;
