import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const paymentStructureData = [
  { name: "Поставщики и Подрядчики", value: 42, color: "#3B82F6" },
  { name: "Зарплата", value: 28, color: "#10B981" },
  { name: "Налоги", value: 18, color: "#F59E0B" },
  { name: "Прочие", value: 12, color: "#94A3B8" },
];

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, index, name } = props;
  const RADIAN = Math.PI / 180;
  // Calculate label coordinate slightly outside outerRadius
  const radius = outerRadius + 12;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const color = paymentStructureData[index].color;

  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-[16px]"
    >
      {`${name}: ${paymentStructureData[index].value}%`}
    </text>
  );
};

const PaymentStructureChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Структура платежей
      </h3>
      <div className="w-full h-75 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 100, bottom: 20, left: 100 }}>
            <Pie
              data={paymentStructureData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
            >
              {paymentStructureData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Доля"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentStructureChart;
