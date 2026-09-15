import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'OPEX', value: 45, color: '#3b82f6' },
  { name: 'CAPEX', value: 28, color: '#10b981' },
  { name: 'Персонал', value: 22, color: '#f59e0b' },
  { name: 'Резервы', value: 5, color: '#94a3b8' },
];

const BudgetStructureChart = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Структура бюджета
      </h3>
      <div className="w-full h-[310px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={105}
              label={({ name, value, x, y, cx }) => {
                const colorMap: Record<string, string> = {
                  OPEX: '#3b82f6',
                  CAPEX: '#10b981',
                  Персонал: '#f59e0b',
                  Резервы: '#94a3b8',
                };
                const key = name || '';
                const textColor = colorMap[key] || '#64748b';
                const textAnchor = x > cx ? 'start' : 'end';
                return (
                  <text
                    x={x}
                    y={y}
                    fill={textColor}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    className="text-xs"
                  >
                    {`${name}: ${value}%`}
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              wrapperClassName="dark:!bg-slate-800 dark:!border-slate-700"
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '10px 14px',
              }}
              formatter={(val: any, name: any) => [`${val}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetStructureChart;
