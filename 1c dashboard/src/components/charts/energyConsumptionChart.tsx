import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '00:00', value: 140 },
  { time: '04:00', value: 118 },
  { time: '08:00', value: 180 },
  { time: '12:00', value: 190 },
  { time: '16:00', value: 182 },
  { time: '20:00', value: 165 },
  { time: '23:59', value: 150 },
];

const EnergyConsumptionChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-[30px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
        Суточное потребление электроэнергии
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 20, left: -20 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#ddd" />
          <XAxis 
            dataKey="time" 
            axisLine={true} 
            tickLine={true} 
            stroke="#888" 
          />
          <YAxis 
            axisLine={true} 
            tickLine={true} 
            stroke="#888" 
            ticks={[0, 50, 100, 150, 200]}
            domain={[0, 200]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '10px', backgroundColor: 'white' }} 
            itemStyle={{ color: '#eab308' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="line"
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <Area 
            name="Потребление" 
            type="monotone" 
            dataKey="value" 
            stroke="#eab308" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            activeDot={{ r: 6, fill: '#eab308', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyConsumptionChart;
