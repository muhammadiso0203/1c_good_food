/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useDateRange } from '@/context/DateRangeContext';
import { useFinans } from '@/pages/dashboard/finans/service/useFinans';

interface WeekChartItem {
  name: string;      // Masalan: "Нед 1 (04.01)"
  incoming: number;  // Kelib tushgan pullar (MoneyReceipts) - milliardda
  outgoing: number;  // Chiqib ketgan pullar (MoneyPayments) - milliardda
  dateObj: Date;     // Saralash va filtrlash uchun sana obyekti
  index: number;     // Hafta tartib raqami
}

const CashFlowWeeklyChart = () => {
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

  // Backenddan kelgan ma'lumotlarni o'qiymiz
  const allItems: WeekChartItem[] = [];
  if (metrics) {
    const metricsData = metrics as Record<string, any>;
    const itemsMap = new Map<string, Partial<WeekChartItem>>();

    for (const rawKey of Object.keys(metricsData)) {
      const key = fixEncoding(rawKey);
      const value = Number(metricsData[rawKey]) || 0;

      // Regex: MoneyReceipts_Неделя1_04_01_2021 kabi kalitlarni qidiramiz
      const match = key.match(/^(MoneyReceipts|MoneyPayments)_[^_]+?(\d+)_(\d{2})_(\d{2})_(\d{4})$/i);
      if (!match) continue;

      const type = match[1].toLowerCase();
      const weekIndex = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);
      const month = parseInt(match[4], 10) - 1; // 0-indexed oy
      const year = parseInt(match[5], 10);

      // Har bir haftani noyob sana satri orqali guruhlaymiz (turli yillar to'qnashmasligi uchun)
      const dateStr = `${day}_${month}_${year}`;
      let item = itemsMap.get(dateStr);
      if (!item) {
        const dateObj = new Date(year, month, day);
        const name = `Нед ${weekIndex} (${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')})`;
        item = {
          name,
          dateObj,
          index: weekIndex,
          incoming: 0,
          outgoing: 0,
        };
        itemsMap.set(dateStr, item);
      }

      if (type === 'moneyreceipts') {
        // Qiymatni milliard so'm ko'rinishiga o'tkazamiz
        item.incoming = value / 1_000_000_000;
      } else if (type === 'moneypayments') {
        // Qiymatni milliard so'm ko'rinishiga o'tkazamiz
        item.outgoing = value / 1_000_000_000;
      }
    }

    // Obyektlarni massivga yuklaymiz
    for (const item of itemsMap.values()) {
      allItems.push({
        name: item.name || '',
        incoming: Number((item.incoming || 0).toFixed(2)),
        outgoing: Number((item.outgoing || 0).toFixed(2)),
        dateObj: item.dateObj || new Date(),
        index: item.index || 0,
      });
    }
  }

  // Xronologik tartibda saralaymiz
  const sortedItems = allItems.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  // Tanlangan sana oralig'iga ko'ra filtrlash (vaqt zonasidan mustaqil ravishda)
  const parseDate = (dateStr: string, defaultDate: string) => {
    const parts = (dateStr || defaultDate).split('-');
    const year = parseInt(parts[0], 10) || 2025;
    const month = parseInt(parts[1], 10) || 1;
    const day = parseInt(parts[2], 10) || 1;
    return new Date(year, month - 1, day);
  };

  const fromDate = parseDate(dateFrom, '2025-01-01');
  const toDate = parseDate(dateTo, '2025-12-31');

  let filteredData = sortedItems.filter(item => {
    const time = item.dateObj.getTime();
    return time >= fromDate.getTime() && time <= toDate.getTime();
  });

  // Agar ma'lumotlar ko'p bo'lsa (4 tadan oshsa), faqat oxirgi 4 haftalikni ko'rsatamiz
  if (filteredData.length > 4) {
    filteredData = filteredData.slice(-4);
  }

  if (isLoading) {
    return (
      <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700 flex flex-col">
        <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-6">
          Движение денежных средств (недельный анализ)
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
        <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-6">
          Движение денежных средств (недельный анализ)
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Нет данных за выбранный период
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-100 bg-white dark:bg-slate-800 p-6 rounded-[10px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white mb-6">
        Движение денежных средств (недельный анализ, млрд сум)
      </h3>
      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            barGap={2}
          >
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
              dy={10}
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
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                padding: '8px'
              }}
              formatter={(value: any, name: any) => [
                `${value.toLocaleString()} млрд sum`,
                name === 'incoming' ? 'Поступления' : 'Выплаты'
              ]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              iconSize={12}
              formatter={(value) => (
                <span className={`text-[16px] ${value === 'incoming' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {value === 'incoming' ? 'Поступления' : 'Выплаты'}
                </span>
              )}
            />
            <Bar
              name="incoming"
              dataKey="incoming"
              fill="#10b981"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              name="outgoing"
              dataKey="outgoing"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowWeeklyChart;
