const requestsData = [
  {
    title: 'Закупка оборудования',
    department: 'Производство',
    status: 'Утверждено',
    statusType: 'approved',
    amount: '12.5 млн сум',
  },
  {
    title: 'Маркетинговая кампания',
    department: 'Маркетинг',
    status: 'На рассмотрении',
    statusType: 'pending',
    amount: '8.3 млн сум',
  },
  {
    title: 'Обновление ПО',
    department: 'ИТ',
    status: 'Утверждено',
    statusType: 'approved',
    amount: '4.7 млн сум',
  },
  {
    title: 'Обучение персонала',
    department: 'HR',
    status: 'На рассмотрении',
    statusType: 'pending',
    amount: '2.1 млн сум',
  },
  {
    title: 'Ремонт офиса',
    department: 'Администрация',
    status: 'Отклонено',
    statusType: 'rejected',
    amount: '6.8 млн сум',
  },
];

const ApprovalRequestsList = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold text-[18px] text-gray-900 dark:text-white mb-6">
        Заявки на согласование
      </h3>

      <div className="space-y-4">
        {requestsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-l-4 border-blue-500 pl-4 py-1.5 transition-colors"
          >
            <div>
              <h4 className=" text-sm text-gray-900 dark:text-white">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {item.department}
              </p>
            </div>

            <div className="text-right space-y-1">
              {item.statusType === 'approved' && (
                <span className="inline-block bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-0.5 rounded-full">
                  {item.status}
                </span>
              )}
              {item.statusType === 'pending' && (
                <span className="inline-block bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs px-3 py-0.5 rounded-full">
                  {item.status}
                </span>
              )}
              {item.statusType === 'rejected' && (
                <span className="inline-block bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs px-3 py-0.5 rounded-full">
                  {item.status}
                </span>
              )}

              <p className="text-sm text-gray-900 dark:text-white">
                {item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalRequestsList;
