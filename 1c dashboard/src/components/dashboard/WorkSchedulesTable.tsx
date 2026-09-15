import { useKadr } from '@/pages/dashboard/kadri/service/useKadr';

const WorkSchedulesTable = () => {
  const { data: kadrData } = useKadr();

  const totalEmployees = kadrData?.Totalemployees ?? 0;
  const scheduleCount = kadrData?.ГрафикРаботы_ПятидневнаяСорокоЧасовая ?? 0;
  const primaryCount = kadrData?.ВидЗанятости_ОсновноеМестоРаботы ?? 0;
  const contractCount = kadrData?.ВидЗанятости_ПоДоговоруГражданскоПравовогоХарактера ?? 0;
  const partTimeCount = kadrData?.ВидЗанятости_ВнешнееСовместительство ?? 0;

  // Calculate others/remaining count
  const scheduleProchiy = kadrData?.ГрафикРаботы_Прочие ?? Math.max(0, totalEmployees - scheduleCount);
  const typeProchiy = kadrData?.ВидЗанятости_Прочие ?? Math.max(0, totalEmployees - (primaryCount + contractCount + partTimeCount));

  const schedules = [
    {
      schedule: 'Пятидневная (40 часов)',
      scheduleCount: scheduleCount,
      type: 'Основное место работы',
      typeCount: primaryCount,
    },
    {
      schedule: 'Прочие',
      scheduleCount: scheduleProchiy,
      type: 'Договор ГПХ',
      typeCount: contractCount,
    },
    {
      schedule: '',
      scheduleCount: null,
      type: 'Внешнее совместительство',
      typeCount: partTimeCount,
    },
    {
      schedule: '',
      scheduleCount: null,
      type: 'Прочие',
      typeCount: typeProchiy,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        График работы и вид занятости
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-400 text-[13px] font-medium">
              <th className="pb-3 font-semibold">График работы</th>
              <th className="pb-3 font-semibold text-right px-4">Кол-во</th>
              <th className="pb-3 font-semibold pl-6">Вид занятости</th>
              <th className="pb-3 font-semibold text-right px-4">Сотрудники</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {schedules.map((row, index) => (
              <tr key={index} className="text-[14px] text-gray-700 dark:text-slate-300">
                <td className="py-3.5 text-gray-500 dark:text-white">{row.schedule}</td>
                <td className="py-3.5 text-right font-semibold px-4 text-gray-900 dark:text-white">
                  {row.scheduleCount !== null && row.scheduleCount !== undefined ? `${row.scheduleCount} чел.` : ''}
                </td>
                <td className="py-3.5 pl-6 text-gray-500 dark:text-slate-400">{row.type}</td>
                <td className="py-3.5 text-right font-semibold px-4 text-gray-900 dark:text-white">{row.typeCount} чел.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkSchedulesTable;
