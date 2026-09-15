
const data = [
  { zone: 'Производство', total: 245, active: 242, offline: 3, status: 'Требует внимания' },
  { zone: 'Офисы', total: 87, active: 87, offline: 0, status: 'Норма' },
  { zone: 'Склады', total: 45, active: 43, offline: 2, status: 'Требует внимания' },
  { zone: 'Инфраструктура', total: 32, active: 31, offline: 1, status: 'Требует внимания' },
];

const DeviceStatusTable = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-[30px] rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Статус приборов учета по зонам
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#f8f9fa] dark:bg-slate-700/50 text-[12px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              <th className="py-4 px-4 rounded-l-[8px] font-medium">ЗОНА</th>
              <th className="py-4 px-4 font-medium">ВСЕГО СЧЕТЧИКОВ</th>
              <th className="py-4 px-4 font-medium">АКТИВНЫХ</th>
              <th className="py-4 px-4 font-medium">ОФЛАЙН</th>
              <th className="py-4 px-4 rounded-r-[8px] font-medium">СТАТУС</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors text-[14px]"
              >
                <td className="py-4 px-4 text-gray-800 dark:text-gray-200">{item.zone}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{item.total}</td>
                <td className="py-4 px-4 text-[#10B981]">{item.active}</td>
                <td className="py-4 px-4 text-[#EF4444]">{item.offline}</td>
                <td className="py-4 px-4">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium
                      ${item.status === 'Норма' 
                        ? 'bg-[#dcfce7] text-[#10843b] dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-[#fef3c7] text-[#a87301] dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceStatusTable;
