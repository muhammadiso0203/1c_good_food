import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import CashPositionChart from "../../../components/charts/CashPositionChart";
import PaymentStructureChart from "../../../components/charts/PaymentStructureChart";
import PaymentForecastChart from "../../../components/charts/PaymentForecastChart";

// 1. Mock Data for Main Table (Остатки по расчетным счетам в разрезе филиалов)
interface BranchBalanceRow {
  bank: string;
  org: string;
  startBalance: string;
  endBalance: string;
  share: string;
}

const branchBalances: BranchBalanceRow[] = [
  {
    bank: "Национальный Банк",
    org: '"НЕТ" AJ "Energosavdo" filiali Qoraqolpoq bo\'linmasi',
    startBalance: "565 632 319,68",
    endBalance: "565 632 319,68",
    share: "52%",
  },
  {
    bank: "Асака Банк",
    org: '"НЕТ" AJ Andijon hududiy filiali',
    startBalance: "39 297 196,52",
    endBalance: "39 297 196,52",
    share: "26%",
  },
  {
    bank: "Агробанк",
    org: '"НЕТ" AJ "Energosavdo" filiali Andijon bo\'linmasi',
    startBalance: "19 295 066,92",
    endBalance: "19 295 066,92",
    share: "15%",
  },
  {
    bank: "Ipoteka Bank",
    org: '"НЕТ" AJ Jizzax hududiy filiali',
    startBalance: "20 414 626,91",
    endBalance: "20 414 626,91",
    share: "7%",
  },
];

// 2. Metrics Cards Data
const metricsData = [
  {
    title: "Текущая позиция",
    value: "1,636 млн сум",
    trend: "+32.6% к началу месяца",
    icon: Wallet,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Поступления за неделю",
    value: "301 млн сум",
    trend: "В соответствии с планом",
    icon: ArrowUpRight,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Платежи за неделю",
    value: "234 млн сум",
    trend: "-12.3% к прошлой неделе",
    icon: ArrowDownRight,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Ликвидность",
    value: "Высокая",
    trend: "Покрытие 7.0 дней",
    icon: TrendingUp,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

// 6. Bottom Table Data (Остатки по счетам)
interface AccountBalanceRow {
  bank: string;
  currency: string;
  balance: string;
  share: string;
}

const accountBalances: AccountBalanceRow[] = [
  { bank: "Национальный Банк", currency: "UZS", balance: "845 млн", share: "52%" },
  { bank: "Асака Банк", currency: "UZS", balance: "423 млн", share: "26%" },
  { bank: "Агробанк", currency: "UZS", balance: "256 млн", share: "15%" },
  { bank: "Ipoteka Bank", currency: "USD", balance: "112 млн", share: "7%" },
];

// 7. Payment Calendar Data
interface CalendarItem {
  company: string;
  deadline: string;
  amount: string;
  color: "red" | "orange" | "green";
}

const calendarItems: CalendarItem[] = [
  { company: 'ООО "Поставщик А"', deadline: "Срок: Сегодня", amount: "45.2 млн сум", color: "red" },
  { company: "Зарплата за июнь", deadline: "Срок: 01.07", amount: "123.5 млн сум", color: "red" },
  { company: "НДС за май", deadline: "Срок: 05.07", amount: "34.8 млн сум", color: "orange" },
  { company: 'ООО "Поставщик Б"', deadline: "Срок: 10.07", amount: "28.3 млн сум", color: "green" },
  { company: "Аренда офиса", deadline: "Срок: 15.07", amount: "15.6 млн сум", color: "orange" },
];

const Kaznachetstya = () => {
  return (
    <div className="space-y-6">
      {/* SECTION 1: Main Table: Остатки по расчетным счетам в разрезе филиалов */}
      <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
          Остатки по расчетным счетам в разрезе филиалов
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200 text-[14px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">СЧЕТ</th>
                <th className="py-3 px-4">ОРГАНИЗАЦИЯ</th>
                <th className="py-3 px-4 text-right">САЛЬДО НА НАЧАЛО ПЕРИОДА</th>
                <th className="py-3 px-4 text-right">САЛЬДО НА КОНЕЦ ПЕРИОДА</th>
                <th className="py-3 px-4 text-right">ДОЛЯ</th>
              </tr>
            </thead>
            <tbody>
              {/* Group Header Row */}
              <tr className="bg-[#FAF7EC] dark:bg-yellow-950/20 border-b border-gray-200 dark:border-slate-700">
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  55.30 (Расчетные счета)
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
              {/* Branch Data Rows */}
              {branchBalances.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 ">
                    {row.bank}
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-[13px]">
                    {row.org}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    {row.startBalance}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    {row.endBalance}
                  </td>
                  <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400">
                    {row.share}
                  </td>
                </tr>
              ))}
              {/* Total/Итого Row */}
              <tr className="bg-[#FAF7EC] dark:bg-yellow-950/20 font-bold border-t border-gray-200 dark:border-slate-700">
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                  Итого
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-right text-gray-800 dark:text-gray-200">
                  243 872 547 707,84
                </td>
                <td className="py-3 px-4 text-right text-gray-800 dark:text-gray-200">
                  243 634 336 427,58
                </td>
                <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Metrics Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-[12px] flex justify-between p-6 bg-white dark:bg-slate-800 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col justify-between h-full">
                <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-tight">
                  {card.title}
                </p>
                <h2 className="text-[27px] text-gray-800 dark:text-white leading-tight my-2">
                  {card.value}
                </h2>
                <p className="text-[13px] text-green-600 dark:text-green-400">
                  {card.trend}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-[10px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${card.iconBg}`}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Денежная позиция (Line Chart) */}
        <CashPositionChart />

        {/* Right: Структура платежей (Donut Chart) */}
        <PaymentStructureChart />
      </div>

      {/* SECTION 4: Forecast Chart (Прогноз платежей и поступлений) */}
      <PaymentForecastChart />

      {/* SECTION 5: Bottom Section (Остатки по счетам & Платежный календарь) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Остатки по счетам */}
        <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
            Остатки по счетам
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">БАНК</th>
                  <th className="py-3 px-4">ВАЛЮТА</th>
                  <th className="py-3 px-4 text-right">ОСТАТОК</th>
                  <th className="py-3 px-4 text-right">ДОЛЯ</th>
                </tr>
              </thead>
              <tbody>
                {accountBalances.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 font-medium">
                      {row.bank}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 font-semibold">
                      {row.currency}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-800 dark:text-gray-200 font-semibold">
                      {row.balance}
                    </td>
                    <td className="py-3.5 px-4 text-right text-blue-600 dark:text-blue-400 font-semibold">
                      {row.share}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Платежный календарь */}
        <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
            Платежный календарь
          </h3>
          <div className="space-y-3">
            {calendarItems.map((item, index) => {
              const borderColors = {
                red: "border-l-4 border-red-500",
                orange: "border-l-4 border-orange-500",
                green: "border-l-4 border-green-500",
              };
              return (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3.5 bg-gray-50 dark:bg-slate-800/40 rounded-r-[8px] hover:bg-gray-100 dark:hover:bg-slate-700/20 transition-all duration-300 ${
                    borderColors[item.color]
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-gray-800 dark:text-white">
                      {item.company}
                    </span>
                    <span className="text-[12px] text-gray-500 dark:text-gray-400">
                      {item.deadline}
                    </span>
                  </div>
                  <span className="text-[14px] font-bold text-gray-900 dark:text-white">
                    {item.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kaznachetstya;
