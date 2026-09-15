import { useState, Suspense, useMemo } from "react";
import { menuBar } from "../data/menuBar";
import { Calendar, Moon, Sun, User2, ArrowLeft, ArrowRight } from "lucide-react";
import GlobalFilter from "../components/GlobalFilter";
import { DateRangeProvider } from "@/context/DateRangeContext";

const MainLayout = () => {
    const [activeId, setActiveId] = useState(menuBar[0].id);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const selectedItem = menuBar.find(item => item.id === activeId);
    const CurrentPage = selectedItem?.key;
    const today = new Date().toLocaleDateString("ru-RU", {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const currentPage = [
        {
            id: "1",
            title: "Общий обзор ERP-системы 1С",
            desc: `Сводная панель по всем модулям системы - актуальные показатели на ${today}`
        },
        {
            id: "2",
            title: "Интеллектуальный учет электроэнергии АМИ/МДМС",
            desc: "Система автоматизированного учета и управления потреблением"
        },
        {
            id: "3",
            title: "Цифровизация финансовых показателей",
            desc: "Финансовая аналитика и прогнозирование"
        },
        {
            id: "4",
            title: "Получение и продажа электроэнергии",
            desc: "Учет контрактов, объемов закупок и реализации энергии"
        },
        {
            id: "5",
            title: "Интеграция с soliq.uz",
            desc: "Управление электронными счет-фактурами и налоговыми документами"
        },
        {
            id: "6",
            title: "Централизация бухгалтерии",
            desc: "Единая система управления бухгалтерским учетом всех филиалов"
        },
        {
            id: "7",
            title: "Параллельный расчет МСФО",
            desc: "Учет и формирование отчетности по международным стандартам"
        },
        {
            id: "8",
            title: "Бюджетирование",
            desc: "Планирование бюджетов, контроль лимитов и анализ исполнения"
        },
        {
            id: "9",
            title: "Реорганизация и автоматизация казначейства",
            desc: "Управление денежными потоками и ликвидностью"
        },
        {
            id: "10",
            title: "Планирование и контроль денежных средств",
            desc: "Прогнозирование и управление денежными потоками"
        },
        {
            id: "11",
            title: "Управление персоналом (Кадры)",
            desc: "Управление штатным расписанием и учет движения сотрудников"
        },
        {
            id: "12",
            title: "Расчет заработной платы",
            desc: "Автоматизированное начисление ЗП и учет рабочего времени"
        },
        {
            id: "13",
            title: "Управление закупками",
            desc: "Контроль процесса снабжения, тендеров и исполнения договоров"
        },
        {
            id: "14",
            title: "Складской учет",
            desc: "Управление остатками, приемка, отгрузка и инвентаризация ТМЦ"
        }
    ];

    const currentHeaderInfo = currentPage.find(item => item.id === activeId) || {
        title: selectedItem?.name || "",
        desc: ""
    };

    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

    const toggleDark = () => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('dark');
            setIsDark(false);
        } else {
            root.classList.add('dark');
            setIsDark(true);
        }
    };

    // Memoizing the current page to prevent massive re-renders when the sidebar toggles
    const RenderedPage = useMemo(() => {
        if (!CurrentPage) return null;
        return <CurrentPage />;
    }, [CurrentPage]);

    return (
        <DateRangeProvider>
            <div className="flex h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className={`${isSidebarOpen ? "w-75" : "w-20"} border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col py-6 transition-all duration-300`}>
                    <div className={`px-6 mb-6 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <h1 className="text-xl font-semibold text-slate-800 dark:text-white leading-tight whitespace-nowrap">ERP 1C</h1>
                                <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">Модули системы</p>
                            </div>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors shrink-0"
                        >
                            {isSidebarOpen ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
                        </button>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-slate-800 mb-6"></div>

                    <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
                        {menuBar.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeId === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveId(item.id)}
                                    title={!isSidebarOpen ? item.name : undefined}
                                    className={`w-full flex items-center ${isSidebarOpen ? "gap-4 px-4" : "justify-center px-0"} py-3 rounded-xl transition-colors
                                    ${isActive
                                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <Icon
                                        size={20}
                                        className={`shrink-0 ${isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}`}
                                    />
                                    {isSidebarOpen && (
                                        <span className="text-[14px] font-medium text-left leading-tight whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* O'ng tomon - Sahifalar chiqadigan joy */}
                <div className="flex-1 bg-white dark:bg-slate-950 overflow-auto relative transition-colors duration-300">
                    {/* User Info (Absolute o'ng burchakda turadi, contentni pastga surmaydi) */}
                    <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
                        {/* Tema O'zgartirish Tugmasi */}
                        <button
                            onClick={toggleDark}
                            className="flex items-center justify-center w-10 h-10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-gray-300 dark:border-slate-700 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700 rounded-[10px]">
                            <Calendar size={16} className="text-blue-500 dark:text-blue-400" />
                            <span className="text-[13px] font-semibold text-gray-600 dark:text-gray-300">
                                {today}
                            </span>
                        </div>

                        <div className="group flex items-center gap-3 p-2 pr-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-[10px] transition-all duration-300 cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-slate-700 flex items-center justify-center text-white">
                                <User2 size={20} />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-gray-800 dark:text-white leading-none mb-1">
                                    Muhammad
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Admin
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex-1">
                        {CurrentPage ? (
                            <div className="p-10 animate-in fade-in duration-500">
                                {/* Page Header */}
                                <div className="mb-8">
                                    <h1 className="text-[28px] font-bold text-slate-900 dark:text-white transition-colors duration-300">
                                        {currentHeaderInfo.title}
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-[14px] mt-1 transition-colors duration-300">
                                        {currentHeaderInfo.desc}
                                    </p>
                                </div>

                                {/* Global Filter */}
                                <div className="mb-8 relative z-10">
                                    <GlobalFilter />
                                </div>

                                {/* Page Content */}
                                <div className="min-h-0">
                                    <Suspense fallback={
                                        <div className="flex h-100 w-full items-center justify-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-gray-500 dark:text-gray-400 font-medium">Yuklanmoqda...</p>
                                            </div>
                                        </div>
                                    }>
                                        {RenderedPage}
                                    </Suspense>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Sahifa topilmadi
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DateRangeProvider>
    );
};

export default MainLayout;