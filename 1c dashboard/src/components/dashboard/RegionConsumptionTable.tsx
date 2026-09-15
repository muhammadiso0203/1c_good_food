const data = [
  { region: 'Ташкент', mwh: 450, cost: '2850 млн сум' },
  { region: 'Самарканд', mwh: 320, cost: '2020 млн сум' },
  { region: 'Бухара', mwh: 280, cost: '1760 млн сум' },
  { region: 'Фергана', mwh: 260, cost: '1640 млн сум' },
  { region: 'Андижан', mwh: 240, cost: '1510 млн сум' },
];

const RegionConsumptionTable = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-[30px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Потребление по регионам
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px] font-medium">РЕГИОН</th>
              <th className="py-4 px-4 font-medium text-center">МВТ·Ч</th>
              <th className="py-4 px-4 rounded-r-[8px] font-medium text-right">СТОИМОСТЬ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200">{item.region}</td>
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200 text-center">{item.mwh}</td>
                <td className="py-4 px-4 text-[#08895ed1] text-right">{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionConsumptionTable;
