import { User } from 'lucide-react';

const employees = [
  {
    name: 'Иванов Иван Иванович',
    gender: 'Мужской',
    birthDate: '28.03.1988',
    age: 38,
    education: 'Высшее',
  },
  {
    name: 'Петрова Анна Сергеевна',
    gender: 'Женский',
    birthDate: '02.06.1991',
    age: 35,
    education: 'Высшее',
  },
  {
    name: 'Сидоров Петр Алексеевич',
    gender: 'Мужской',
    birthDate: '15.11.1985',
    age: 40,
    education: 'Среднее специальное',
  },
  {
    name: 'Смирнова Елена Викторовна',
    gender: 'Женский',
    birthDate: '22.09.1993',
    age: 32,
    education: 'Высшее неоконченное',
  },
];

const EmployeeProfilesList = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-[12px] border border-gray-200 dark:border-slate-700">
      <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-6">
        Примеры сотрудников
      </h3>
      <div className="space-y-4">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-[8px] hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200 border border-gray-50 dark:border-slate-700/30"
          >
            <div className="p-2.5 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">
                {emp.name}
              </h4>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-500 dark:text-slate-400">
                <span>Пол: {emp.gender}</span>
                <span>ДР: {emp.birthDate} ({emp.age} лет)</span>
                <span className="font-medium text-gray-700 dark:text-slate-300">
                  Образование: {emp.education}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeProfilesList;
