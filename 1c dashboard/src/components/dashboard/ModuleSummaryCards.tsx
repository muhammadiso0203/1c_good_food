import { 
  Zap, 
  BarChart3, 
  ShoppingCart, 
  FileText, 
  Calculator, 
  Globe, 
  PieChart, 
  Wallet, 
  TrendingUp, 
  Users, 
  Coins, 
  Package, 
  ActivityIcon
} from 'lucide-react';

const moduleData = [
  {
    title: 'Учет электроэнергии АМИ/МДМС',
    icon: <Zap className="text-orange-500" />,
    metrics: [
      { label: 'Текущее потребление', value: '178 МВт-ч', color: 'text-emerald-500' },
      { label: 'Экономия за месяц', value: '55 МВт-ч', color: 'text-emerald-500' },
      { label: 'Активных счетчиков', value: '403 / 409' },
    ]
  },
  {
    title: 'Цифровизация финансовых показателей',
    icon: <BarChart3 className="text-emerald-500" />,
    metrics: [
      { label: 'Общая выручка', value: '367 млн сум', color: 'text-emerald-500' },
      { label: 'Чистая прибыль', value: '147 млн сум', color: 'text-emerald-500' },
      { label: 'Рентабельность', value: '40.1%', color: 'text-emerald-500' },
    ]
  },
  {
    title: 'Получение и продажа электроэнергии',
    icon: <TrendingUp className="text-blue-500" />,
    metrics: [
      { label: 'Закуплено за месяц', value: '1,350 МВт-ч' },
      { label: 'Реализовано', value: '1,180 МВт-ч', color: 'text-emerald-500' },
      { label: 'Активных контрактов', value: '47' },
    ]
  },
  {
    title: 'Документы soliq.uz',
    icon: <FileText className="text-purple-500" />,
    metrics: [
      { label: 'Создано за месяц', value: '204', color: 'text-emerald-500' },
      { label: 'Зарегистрировано', value: '198', color: 'text-emerald-500' },
      { label: 'В обработке', value: '6' },
    ]
  },
  {
    title: 'Централизация бухгалтерии',
    icon: <Calculator className="text-indigo-500" />,
    metrics: [
      { label: 'Обработано операций', value: '3,443', color: 'text-emerald-500' },
      { label: 'Филиалов в системе', value: '15' },
      { label: 'Экономия за квартал', value: '17 млн сум', color: 'text-emerald-500' },
    ]
  },
  {
    title: 'Параллельный расчет МСФО',
    icon: <Globe className="text-pink-500" />,
    metrics: [
      { label: 'Прибыль по МСФО', value: '385 млн сум', color: 'text-emerald-500' },
      { label: 'Корректировок', value: '47' },
      { label: 'Автоматизация', value: '98%', color: 'text-emerald-500' },
    ]
  },
  {
    title: 'Бюджетирование',
    icon: <PieChart className="text-orange-600" />,
    metrics: [
      { label: 'Исполнение бюджета', value: '97.8%', color: 'text-emerald-500' },
      { label: 'Экономия', value: '8.2 млн сум', color: 'text-emerald-500' },
      { label: 'Утверждено заявок', value: '142/158' },
    ]
  },
  {
    title: 'Казначейство',
    icon: <Wallet className="text-emerald-600" />,
    metrics: [
      { label: 'Текущая позиция', value: '1,636 млн сум', color: 'text-emerald-500' },
      { label: 'Поступления за неделю', value: '301 млн сум', color: 'text-emerald-500' },
      { label: 'Ликвидность', value: 'Высокая', color: 'text-emerald-500' },
    ]
  },
  {
    title: 'Планирование ДС',
    icon: <TrendingUp className="text-blue-600" />,
    metrics: [
      { label: 'Операционный CF', value: '189 млн сум', color: 'text-emerald-500' },
      { label: 'Свободный CF', value: '154 млн сум', color: 'text-emerald-500' },
      { label: 'Точность прогноза', value: '94.3%', color: 'text-emerald-500' },
    ]
  },
  {
    title: 'Кадры',
    icon: <Users className="text-blue-500" />,
    metrics: [
      { label: 'Всего сотрудников', value: '1,247', color: 'text-emerald-500' },
      { label: 'Новых сотрудников', value: '28', color: 'text-emerald-500' },
      { label: 'Открытых вакансий', value: '17' },
    ]
  },
  {
    title: 'Зарплата',
    icon: <Coins className="text-emerald-500" />,
    metrics: [
      { label: 'ФОТ за полугодие', value: '3,266 млн сум', color: 'text-emerald-500' },
      { label: 'Средняя зарплата', value: '437 тыс. сум', color: 'text-emerald-400' },
      { label: 'Выплаты вне ФОТ', value: '188 млн сум' },
    ]
  },
  {
    title: 'Закупки',
    icon: <ShoppingCart className="text-purple-600" />,
    metrics: [
      { label: 'Активных заказов', value: '127' },
      { label: 'Выполнено за месяц', value: '189', color: 'text-emerald-500' },
      { label: 'Сумма закупок', value: '8.45 млн сум' },
    ]
  },
  {
    title: 'Склад',
    icon: <Package className="text-orange-500" />,
    metrics: [
      { label: 'Объем запасов', value: '13,000 ед.' },
      { label: 'Стоимость запасов', value: '24.5 млн сум' },
      { label: 'Критически мало', value: '12 позиций', color: 'text-red-500' },
    ]
  },
  {
    title: 'Общая информация',
    icon: <ActivityIcon className="text-gray-500" />,
    metrics: [
      { label: 'Активных модулей', value: '13 / 13', color: 'text-emerald-500' },
      { label: 'Операций за месяц', value: '12,847' },
      { label: 'Системная эффективность', value: '96.2%', color: 'text-emerald-500' },
    ]
  }
];

const ModuleSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
      {moduleData.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-slate-700/50 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="font-semibold text-[15px] text-gray-800 dark:text-gray-100 leading-tight">
              {item.title}
            </h3>
          </div>
          
          <div className="space-y-3">
            {item.metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center text-[13px]">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {metric.label}
                </span>
                <span className={`font-bold ${metric.color || 'text-gray-900 dark:text-white'}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleSummaryCards;
