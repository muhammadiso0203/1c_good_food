/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useDateRange } from '@/context/DateRangeContext';
import { useFinans } from '@/pages/dashboard/finans/service/useFinans';

// Russian month short names
const RussianMonthShort: Record<string, string> = {
  'январь': 'Янв',
  'февраль': 'Фев',
  'март': 'Мар',
  'апрель': 'Апр',
  'май': 'Май',
  'июнь': 'Июн',
  'июль': 'Июл',
  'август': 'Авг',
  'сентябрь': 'Сен',
  'октябрь': 'Окт',
  'ноябрь': 'Ноя',
  'декабрь': 'Дек'
};

// Russian month indexes for filtering/sorting
const RussianMonthMap: Record<string, number> = {
  'январь': 0,
  'февраль': 1,
  'март': 2,
  'апрель': 3,
  'май': 4,
  'июнь': 5,
  'июль': 6,
  'август': 7,
  'сентябрь': 8,
  'октябрь': 9,
  'ноябрь': 10,
  'декабрь': 11
};

interface ChartItem {
  name: string;
  revenue: number;
  expenses: number;
  index: number;
  year: number;
  monthIndex: number;
}

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-10 mt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-3">
          <div className="flex items-center justify-center relative w-4">
            <div
              className="h-0.5 w-5 rounded-full opacity-80"
              style={{ backgroundColor: entry.color }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border-[1.5px] bg-white"
              style={{ borderColor: entry.color }}
            />
          </div>
          <span
            className="text-[16px]"
            style={{ color: entry.color }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const FinanceDynamicsChart = () => {
  const { data: metrics, isLoading } = useFinans();
  const { dateFrom, dateTo } = useDateRange();

  // Latin1 (ISO-8859-1) dan UTF-8 ga o'tkazish funksiyasi (kirill harflarini to'g'ri o'qish uchun)
  const fixEncoding = (str: string): string => {
    try {
      return decodeURIComponent(escape(str));
    } catch {
      return str;
    }
  };

  // Parsing metrics data
  const allItems: ChartItem[] = [];
  if (metrics) {
    const metricsData = metrics as Record<string, any>;
    const itemsMap = new Map<number, Partial<ChartItem>>();

    for (const rawKey of Object.keys(metricsData)) {
      const key = fixEncoding(rawKey);
      const match = key.match(/^(Revenue|Expenses|Expense)[_\s](\d+)[_\s]([^\s_]+)[_\s](\d{4})$/i);
      if (!match) continue;

      const type = match[1].toLowerCase();
      const index = parseInt(match[2], 10);
      const rawMonth = match[3].toLowerCase();
      const year = parseInt(match[4], 10);
      const value = Number(metricsData[rawKey]) || 0;

      let item = itemsMap.get(index);
      if (!item) {
        const shortMonth = RussianMonthShort[rawMonth] || match[3].substring(0, 3);
        const monthIndex = RussianMonthMap[rawMonth] ?? 0;
        item = {
          index,
          year,
          monthIndex,
          name: shortMonth,
          revenue: 0,
          expenses: 0,
        };
        itemsMap.set(index, item);
      }

      if (type === 'revenue') {
        item.revenue = value / 1_000_000_000;
      } else if (type === 'expenses' || type === 'expense') {
        item.expenses = value / 1_000_000_000;
      }
    }

    for (const item of itemsMap.values()) {
      allItems.push({
        name: item.name || '',
        revenue: Number((item.revenue || 0).toFixed(2)),
        expenses: Number((item.expenses || 0).toFixed(2)),
        index: item.index || 0,
        year: item.year || 0,
        monthIndex: item.monthIndex || 0,
      });
    }
  }

  // Sort chronologically
  const sortedItems = allItems.sort((a, b) => a.index - b.index);

  // Filter by selected date range using direct string parsing to avoid timezone shifts
  const parseYearMonth = (dateStr: string, defaultDate: string) => {
    const parts = (dateStr || defaultDate).split('-');
    const year = parseInt(parts[0], 10) || 2025;
    const month = parseInt(parts[1], 10) || 1;
    return { year, month: month - 1 };
  };

  const fromParsed = parseYearMonth(dateFrom, '2025-01-01');
  const toParsed = parseYearMonth(dateTo, '2025-12-31');

  const startTime = fromParsed.year * 12 + fromParsed.month;
  const endTime = toParsed.year * 12 + toParsed.month;

  const filteredData = sortedItems.filter(item => {
    const itemTime = item.year * 12 + item.monthIndex;
    return itemTime >= startTime && itemTime <= endTime;
  });

  if (isLoading) {
    return (
      <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700 flex flex-col">
        <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-8">
          Динамика финансовых показателей
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Загрузка данных...
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700 flex flex-col">
        <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-8">
          Динамика финансовых показателей
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Нет данных за выбранный период
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-8">
        Динамика финансовых показателей (млрд сум)
      </h3>
      <div className="w-full h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -40, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={true}
              tick={{ fill: '#94a3b8', fontSize: 13 }}
              dy={15}
              interval={0}
            />
            <YAxis
              axisLine={true}
              tickLine={true}
              tick={{ fill: '#94a3b8', fontSize: 13 }}
              width={80}
              tickFormatter={(val) => val.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "6px",
                border: '1px solid #d1d5db',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                padding: '12px'
              }}
              formatter={(value: any, name: any) => [
                `${value.toLocaleString()} млрд сум`,
                name
              ]}
            />
            <Area
              name="Выручка"
              type="monotone"
              dataKey="revenue"
              stroke="#14b8a6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={1500}
            />
            <Area
              name="Расходы"
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              animationDuration={1500}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceDynamicsChart;