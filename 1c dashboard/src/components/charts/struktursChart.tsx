import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useMetrics } from '@/pages/dashboard/abzor/service/useMetrics';

// Summani chiroyli formatlash uchun yordamchi funksiya (so'mda)
const formatMoney = (val: number) => {
  if (val === 0 || !val) return '0 сум';
  if (val >= 1e12) return `${(val / 1e12).toFixed(2)} трлн сум`;
  if (val >= 1e9) return `${(val / 1e9).toFixed(2)} млрд сум`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(2)} млн сум`;
  return `${val.toLocaleString()} сум`;
};

const SimpleChart = () => {
  const { data: metrics, isLoading } = useMetrics();

  // Short labels chart ustida sig'ishi uchun, full names esa Kursor borilganda (Tooltip) ko'rinishi uchun
  const rawData = [
    {
      name: 'Расходы по реализации',
      shortName: 'Реализация',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9410) || 0),
      color: '#14b8a6',
    },
    {
      name: 'Административные расходы',
      shortName: 'Админ. расходы',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9420) || 0),
      color: '#3b82f6',
    },
    {
      name: 'Прочие операционные расходы',
      shortName: 'Прочие опер.',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9430) || 0),
      color: '#f59e0b',
    },
    {
      name: 'Себестоимость реализованных товаров/услуг',
      shortName: 'Себестоимость',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9100) || 0),
      color: '#eab308',
    },
    {
      name: 'Проценты по кредитам',
      shortName: 'Проценты',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9610) || 0),
      color: '#8b5cf6',
    },
    {
      name: 'Прочие расходы по финансовой деятельности',
      shortName: 'Прочие фин.',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9620) || 0),
      color: '#94a3b8',
    },
    {
      name: 'Прочие расходы',
      shortName: 'Прочие',
      value: Math.max(0, Number(metrics?.ExpensesOfThePeriod_9700) || 0),
      color: '#10b981',
    },
  ];

  // Musbat xarajatlarning haqiqiy yig'indisi (Всего)
  const total = rawData.reduce((acc, item) => acc + item.value, 0);

  // Har bir modda foizini hisoblash
  const chartData = rawData.map((item) => ({
    ...item,
    chartValue: total > 0 ? item.value : 1,
    percentage: total > 0 && item.value > 0 ? ((item.value / total) * 100).toFixed(1) : '0',
  }));

  // Faqat 1C da puli (xarajati > 0) bor bo'lgan moddalar doiraga chiqadi
  const displaySlices = total > 0 ? chartData.filter((item) => item.value > 0) : chartData;

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-[20px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white transition-colors duration-300">
          Структура расходов
        </h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Всего: {formatMoney(total)}
        </span>
      </div>

      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Загрузка данных...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <Pie
              data={displaySlices}
              dataKey="chartValue"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label={({ payload, value }: any) =>
                total > 0 && value > 0 ? `${payload.shortName}: ${payload.percentage}%` : ''
              }
            >
              {displaySlices.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={total > 0 ? entry.color : '#cbd5e1'}
                  opacity={total > 0 ? 1 : 0.6}
                />
              ))}
            </Pie>
            <Tooltip
              wrapperClassName="dark:!bg-slate-800 dark:!border-slate-700"
              contentStyle={{ borderRadius: '10px', backgroundColor: 'white' }}
              formatter={(_value: any, _name: any, item: any) => [
                total > 0
                  ? `${formatMoney(Number(item.payload.value))} (${item.payload.percentage}%)`
                  : '0 сум (0%)',
                item.payload.name, // Kursor borilganda 100% to'liq nomi ko'rinadi
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SimpleChart;