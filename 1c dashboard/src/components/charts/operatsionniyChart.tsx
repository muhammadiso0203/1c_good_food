import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Grafik uchun ma'lumotlar (rasmga asoslangan taxminiy raqamlar)
const data = [
  { name: 'Янв', Документов: 4200, Операций: 8500, Эффективность: 87 },
  { name: 'Фев', Документов: 4600, Операций: 9200, Эффективность: 89.5 },
  { name: 'Мар', Документов: 4300, Операций: 8900, Эффективность: 91.5 },
  { name: 'Апр', Документов: 4900, Операций: 10200, Эффективность: 94 },
  { name: 'Май', Документов: 4700, Операций: 9600, Эффективность: 94.5 },
  { name: 'Июн', Документов: 5200, Операций: 10600, Эффективность: 95 },
];

const EfficiencyChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-5 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
        Операционная эффективность
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: -30,
            left: 20,
          }}
        >
          {/* Orqa fondagi chiziqlar */}
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" vertical={true} />
          
          {/* X o'qi (Oylar) */}
          <XAxis dataKey="name" axisLine={true} tickLine={true} tick={{ fill: '#6b7280' }} />
          
          {/* Chap Y o'qi (Hujjatlar va Operatsiyalar uchun) */}
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            axisLine={true} 
            tickLine={true} 
            tick={{ fill: '#6b7280' }}
            domain={[0, 12000]}
            tickCount={5}
          />
          
          {/* O'ng Y o'qi (Samaradorlik % uchun) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            axisLine={true} 
            tickLine={true} 
            tick={{ fill: '#6b7280' }}
            domain={[80, 100]}
            tickCount={5}
          />
          
          {/* Kursor olib borganda chiqadigan ma'lumot oynasi */}
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none' }}
          />
          
          {/* Pastdagi izohlar (Legend) */}
          <Legend iconType="circle" wrapperStyle={{ paddingBottom: "40px" }} />
          
          {/* Ustunlar (Bars) */}
          <Bar yAxisId="left" dataKey="Документов" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
          <Bar yAxisId="left" dataKey="Операций" fill="#10b981" radius={[4, 4, 0, 0]} barSize={35} />
          
          {/* Chiziq (Line) */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="Эффективность" 
            name="Эффективность %"
            stroke="#f59e0b" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 3 }} 
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyChart;