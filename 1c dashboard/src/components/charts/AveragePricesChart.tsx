import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '00-04', price: 3.2 },
  { time: '04-08', price: 4.1 },
  { time: '08-12', price: 5.8 },
  { time: '12-16', price: 6.2 },
  { time: '16-20', price: 7.2 },
  { time: '20-24', price: 5.5 },
];

const AveragePricesChart = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-slate-800 p-[30px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-6 transition-colors duration-300'>
        Средние цены по часам суток (сум/кВт·ч)
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e5e7eb" className="dark:stroke-slate-600" />
            <XAxis 
              dataKey="time" 
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              tick={{ fill: '#64748b', fontSize: 14 }}
              dy={10}
            />
            <YAxis 
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
              tick={{ fill: '#64748b', fontSize: 14 }}
              ticks={[0, 2, 4, 6, 8]}
              domain={[0, 8]}
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9', className: 'dark:fill-slate-700' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#0f172a' }}
              itemStyle={{ color: '#eab308' }}
            />
            <Bar 
              name="Цена" 
              dataKey="price" 
              fill="#eab308" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AveragePricesChart;
