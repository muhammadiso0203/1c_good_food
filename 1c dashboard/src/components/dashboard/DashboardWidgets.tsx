const events = [
  { title: "Превышение лимита", location: "Производство, линия 3", time: "2 часа назад" },
  { title: "Счетчик офлайн", location: "Склад А, зона 2", time: "5 часов назад" },
  { title: "Необычное потребление", location: "Офис, этаж 4", time: "12 часов назад" },
];

const consumers = [
  { name: "Производственная линия 1", value: "245 кВт-ч", percent: 100 },
  { name: "Производственная линия 2", value: "212 кВт-ч", percent: 86 },
  { name: "Склад охлаждения", value: "178 кВт-ч", percent: 72 },
  { name: "Офисный комплекс", value: "145 кВт-ч", percent: 59 },
];

const dataQuality = [
  { name: "Полнота данных", value: "98.5%", percent: 98.5 },
  { name: "Точность показаний", value: "99.2%", percent: 99.2 },
  { name: "Своевременность передачи", value: "97.8%", percent: 97.8 },
];

const DashboardWidgets = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Критические события */}
      <div className="bg-white dark:bg-slate-800 p-7 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-5">
          Критические события
        </h3>
        <div className="flex flex-col space-y-4">
          {events.map((event, i) => (
            <div key={i} className="flex flex-col relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-full"></div>
              <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">
                {event.title}
              </span>
              <span className="text-[12px] text-gray-500 dark:text-gray-400 mt-[2px]">
                {event.location}
              </span>
              <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-[2px]">
                {event.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Топ потребителей */}
      <div className="bg-white dark:bg-slate-800 p-7 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-5">
          Топ потребителей
        </h3>
        <div className="flex flex-col space-y-5">
          {consumers.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-600 dark:text-gray-300">{item.name}</span>
                <span className="text-[13px] font-medium text-black dark:text-gray-200">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-[8px] rounded-full overflow-hidden">
                <div 
                  className="bg-[#e9b113] h-full rounded-full" 
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Качество данных */}
      <div className="bg-white dark:bg-slate-800 p-7 rounded-[10px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="font-semibold text-[16px] text-gray-900 dark:text-white mb-5">
          Качество данных
        </h3>
        <div className="flex flex-col space-y-6">
          {dataQuality.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-600 dark:text-gray-300">{item.name}</span>
                <span className="text-[13px] font-medium text-black dark:text-gray-200">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-[8px] rounded-full overflow-hidden">
                <div 
                  className="bg-[#11a976] h-full rounded-full" 
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
