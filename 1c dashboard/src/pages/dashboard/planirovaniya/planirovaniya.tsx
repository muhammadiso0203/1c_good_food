import { TrendingUp, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import CashFlowStructureChart from "../../../components/charts/CashFlowStructureChart";
import ForecastH2Chart from "../../../components/charts/ForecastH2Chart";
import CashFlowStatementChart from "../../../components/charts/CashFlowStatementChart";

// 1. Metrics Cards Data
const metricsData = [
  {
    title: "Операционный CF",
    value: "189 млн сум",
    trend: "+14.5% к прошлому месяцу",
    icon: TrendingUp,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Свободный CF",
    value: "154 млн сум",
    trend: "+6.2% к прошлому месяцу",
    icon: DollarSign,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Точность прогноза",
    value: "94.3%",
    trend: "За последний квартал",
    icon: Calendar,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Риски",
    value: "2 средних",
    trend: "Требуют мониторинга",
    icon: AlertTriangle,
    iconBg: "bg-[#f0f5ff] dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

// 2. Scenario Analysis Data
interface ScenarioRow {
  name: string;
  q3: string;
  q4: string;
  year: string;
}

const scenarioRows: ScenarioRow[] = [
  { name: "Базовый", q3: "615", q4: "708", year: "1890" },
  { name: "Оптимистичный", q3: "685", q4: "782", year: "2105" },
  { name: "Пессимистичный", q3: "545", q4: "634", year: "1675" },
];

// 3. Risks Data
interface RiskItem {
  title: string;
  impact: string;
  probability: string;
  amount: string;
  color: "red" | "orange" | "green";
}

const riskItems: RiskItem[] = [
  {
    title: "Задержка оплаты от крупного клиента",
    impact: "Средний",
    probability: "Средняя",
    amount: "45 млн сум",
    color: "orange",
  },
  {
    title: "Рост курса валюты",
    impact: "Низкий",
    probability: "Высокая",
    amount: "12 млн сум",
    color: "green",
  },
  {
    title: "Увеличение стоимости сырья",
    impact: "Средний",
    probability: "Средняя",
    amount: "28 млн сум",
    color: "orange",
  },
  {
    title: "Изменение налогового законодательства",
    impact: "Высокий",
    probability: "Низкая",
    amount: "67 млн сум",
    color: "red",
  },
];

// 4. Efficiency Metrics Data
const efficiencyMetrics = [
  {
    title: "Коэффициент покрытия",
    value: "2.8",
    valueColor: "text-green-600 dark:text-green-400",
    subtext: "Норма: > 2.0",
  },
  {
    title: "Операционный цикл",
    value: "45 дней",
    valueColor: "text-blue-600 dark:text-blue-400",
    subtext: "-3 дня к прошлому",
  },
  {
    title: "Денежный цикл",
    value: "28 дней",
    valueColor: "text-purple-600 dark:text-purple-400",
    subtext: "Оптимально",
  },
  {
    title: "FCF маржа",
    value: "42%",
    valueColor: "text-green-600 dark:text-green-400",
    subtext: "+2.5 п.п.",
  },
];

const Planirovaniya = () => {
  return (
    <div className="space-y-6">
      {/* SECTION 1: KPI Metrics Cards */}
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
                <h2 className="text-[27px] font-bold text-gray-800 dark:text-white leading-tight my-2">
                  {card.value}
                </h2>
                <p className="text-[13px] text-green-600 dark:text-green-400 font-medium">
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

      {/* SECTION 2: Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowStructureChart />
        <ForecastH2Chart />
      </div>

      {/* SECTION 3: Statement Chart */}
      <CashFlowStatementChart />

      {/* SECTION 4: Scenario Analysis & Key Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Analysis Table */}
        <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
            Сценарный анализ (млн сум)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">СЦЕНАРИЙ</th>
                  <th className="py-3 px-4 text-right">Q3 2026</th>
                  <th className="py-3 px-4 text-right">Q4 2026</th>
                  <th className="py-3 px-4 text-right">2026 ГОД</th>
                </tr>
              </thead>
              <tbody>
                {scenarioRows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-800 dark:text-white font-bold">
                      {row.name}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300 font-medium">
                      {row.q3}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300 font-medium">
                      {row.q4}
                    </td>
                    <td className="py-4 px-4 text-right text-blue-600 dark:text-blue-400 font-bold">
                      {row.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Risks List */}
        <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
            Ключевые риски
          </h3>
          <div className="space-y-3">
            {riskItems.map((item, index) => {
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
                      {item.title}
                    </span>
                    <span className="text-[12px] text-gray-500 dark:text-gray-400">
                      Влияние: {item.impact} &nbsp;•&nbsp; Вероятность: {item.probability}
                    </span>
                  </div>
                  <span className="text-[14px] font-bold text-gray-900 dark:text-white shrink-0">
                    {item.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 5: Absolute Bottom: Показатели эффективности */}
      <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
          Показатели эффективности
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y md:divide-y-0 lg:divide-x divide-gray-200 dark:divide-slate-700">
          {efficiencyMetrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center text-center p-4 ${
                index > 0 ? "lg:pl-6" : ""
              }`}
            >
              <span className="text-gray-500 dark:text-gray-400 text-[14px] mb-2">
                {metric.title}
              </span>
              <span className={`text-[32px] font-bold leading-tight ${metric.valueColor}`}>
                {metric.value}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-[13px] mt-2">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planirovaniya;