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
import { useMetrics } from '@/pages/dashboard/abzor/service/useMetrics';
import { useDateRange } from '@/context/DateRangeContext';

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
  employees: number;
  fot: number;
  avgSalary: number;
  index: number;
  year: number;
  monthIndex: number;
}

export default function SimpleDashboardChart() {
  const { data: metrics, isLoading } = useMetrics();
  const { dateFrom, dateTo } = useDateRange();

  // Parsing metrics data
  const allItems: ChartItem[] = [];
  if (metrics) {
    const metricsData = metrics as Record<string, any>;
    const itemsMap = new Map<number, Partial<ChartItem> & { rawPayroll?: number }>();

    for (const key of Object.keys(metricsData)) {
      const match = key.match(/^(Staff|Payroll)[_\s](\d+)[_\s]([^\s_]+)[_\s](\d{4})$/);
      if (!match) continue;

      const type = match[1];
      const index = parseInt(match[2], 10);
      const rawMonth = match[3].toLowerCase();
      const year = parseInt(match[4], 10);
      const value = Number(metricsData[key]) || 0;

      let item = itemsMap.get(index);
      if (!item) {
        const shortMonth = RussianMonthShort[rawMonth] || match[3].substring(0, 3);
        const monthIndex = RussianMonthMap[rawMonth] ?? 0;
        item = {
          index,
          year,
          monthIndex,
          name: shortMonth,
        };
        itemsMap.set(index, item);
      }

      if (type === 'Staff') {
        item.employees = value;
      } else if (type === 'Payroll') {
        item.fot = value / 1_000_000;
        item.rawPayroll = value;
      }
    }

    for (const item of itemsMap.values()) {
      const employees = item.employees || 0;
      const rawPayroll = item.rawPayroll || 0;
      const avgSalary = employees > 0 ? (rawPayroll / employees) / 1000 : 0;

      allItems.push({
        name: item.name || '',
        employees,
        fot: Number((item.fot || 0).toFixed(2)),
        avgSalary: Number(avgSalary.toFixed(2)),
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

  let filteredData = sortedItems.filter(item => {
    const itemTime = item.year * 12 + item.monthIndex;
    return itemTime >= startTime && itemTime <= endTime;
  });

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-slate-800 p-5 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
          Персонал и ФОТ
        </h3>
        <div className="h-75 flex items-center justify-center text-gray-400">
          Загрузка данных...
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-slate-800 p-5 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
          Персонал и ФОТ
        </h3>
        <div className="h-75 flex items-center justify-center text-gray-400">
          Нет данных за выбранный период
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-5 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300 dark:[&_text]:fill-gray-300! dark:[&_line.recharts-cartesian-grid-line]:stroke-slate-700! dark:[&_.recharts-default-tooltip]:bg-slate-800! dark:[&_.recharts-default-tooltip]:border-slate-700!">
      <h3 className='font-semibold text-[18px] text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
        Персонал и ФОТ
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={filteredData}>
          {/* Orqa fon chiziqlari */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Pastki o'q (Oylar) */}
          <XAxis dataKey="name" interval={0} />
          
          {/* Chap va O'ng o'qlar */}
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          
          {/* Standart ma'lumot oynasi va afsona */}
          <Tooltip 
            contentStyle={{ borderRadius: '10px', backgroundColor: 'white' }}
            formatter={(value: any, name: any) => {
              if (name === 'Сотрудников') return [`${value} чел.`, name];
              if (name === 'ФОТ (млн)') return [`${value.toLocaleString()} млн сум`, name];
              if (name === 'Ср. ЗП (тыс)') return [`${value.toLocaleString()} тыс сум`, name];
              return [value, name];
            }}
          />
          <Legend />
          
          {/* Ustun (Xodimlar soni) - Chap o'qqa bog'langan */}
          <Bar yAxisId="left" dataKey="employees" name="Сотрудников" fill="#3b82f6" barSize={40} radius={[6,6,0,0]}/>
          
          {/* Chiziqlar (FOT va Oylik) - O'ng o'qqa bog'langan */}
          <Line yAxisId="right" type="monotone" dataKey="fot" name="ФОТ (млн)" stroke="#10b981" strokeWidth={2} />
          <Line yAxisId="right" type="monotone" dataKey="avgSalary" name="Ср. ЗП (тыс)" stroke="#f59e0b" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}