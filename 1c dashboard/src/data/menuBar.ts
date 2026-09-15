import { lazy } from "react";
import { 
  LayoutGrid, 
  Zap, 
  TrendingUp, 
  Banknote, 
  Landmark, 
  Wallet, 
  Users, 
  ShoppingCart, 
  Warehouse,
  FileText,
  Building2,
  Calculator,
  DollarSign
} from "lucide-react";

// Lazy loading components to improve performance and prevent lag
const Bugxalteriya = lazy(() => import("../pages/dashboard/dugxalteriya/bugxalteriya"));
const Raschet = lazy(() => import("../pages/dashboard/raschet/raschet"));
const Byudjetirovaniya = lazy(() => import("../pages/dashboard/byudjetirovaniya/byudjetirovaniya"));
const Kaznachetstya = lazy(() => import("../pages/dashboard/kaznacheystya/kaznachetstya"));
const Planirovaniya = lazy(() => import("../pages/dashboard/planirovaniya/planirovaniya"));
const Kadri = lazy(() => import("../pages/dashboard/kadri/kadri"));
const Zarplata = lazy(() => import("../pages/dashboard/zarplata/zarplata"));
const Zakupki = lazy(() => import("../pages/dashboard/zakupki/zakupki"));
const Sklat = lazy(() => import("../pages/dashboard/sklat/sklat"));
const Abzor = lazy(() => import("../pages/dashboard/abzor/Abzor"));
const Mdmc = lazy(() => import("../pages/dashboard/mdmc/Mdmc"));
const Finans = lazy(() => import("../pages/dashboard/finans/finans"));
const Polucheniya = lazy(() => import("../pages/dashboard/polucheniya/polucheniya"));
const Soliq = lazy(() => import("../pages/dashboard/document-soliq/soliq"));


export const menuBar = [
  {
    id: "1",
    name: "Общий обзор",
    icon: LayoutGrid,
    key: Abzor,
  },
  {
    id: "2",
    name: "Учет электроэнергии АМИ/МДМС",
    icon: Zap,
    key: Mdmc,
  },
  {
    id: "3",
    name: "Финансовые показатели",
    icon: DollarSign,
    key: Finans,
  },
  {
    id: "4",
    name: "Получение/продажа электроэнергии",
    icon: TrendingUp,
    key: Polucheniya,
  },
  {
    id: "5",
    name: "Документы soliq.uz",
    icon: FileText,
    key: Soliq,
  },
  {
    id: "6",
    name: "Централизация бухгалтерии",
    icon: Building2,
    key: Bugxalteriya,
  },
  {
    id: "7",
    name: "Расчет МСФО",
    icon: Calculator,
    key: Raschet,
  },
  {
    id: "8",
    name: "Бюджетирование",
    icon: TrendingUp,
    key: Byudjetirovaniya,
  },
  {
    id: "9",
    name: "Казначейство",
    icon: Landmark,
    key: Kaznachetstya,
  },
  {
    id: "10",
    name: "Планирование ДС",
    icon: Wallet,
    key: Planirovaniya,
  },
  {
    id: "11",
    name: "Кадры",
    icon: Users,
    key: Kadri,
  },
  {
    id: "12",
    name: "Зарплата",
    icon: Banknote,
    key: Zarplata,
  },
  {
    id: "13",
    name: "Закупки",
    icon: ShoppingCart,
    key: Zakupki,
  },
  {
    id: "14",
    name: "Склад",
    icon: Warehouse,
    key: Sklat,
  },

];