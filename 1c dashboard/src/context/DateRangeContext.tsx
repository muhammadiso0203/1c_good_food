import { createContext, useContext, useState, type ReactNode } from "react";


// DD.MM.YYYY  ←  YYYY-MM-DD
export const toApiDate = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
};

// Standart diapazoni: 2025-yil boshi → oxiri (1C bazada ma'lumotlar bor davr)
export const DEFAULT_FROM = "2025-01-01";
export const DEFAULT_TO   = "2025-12-31";

// ─── Context tipi ──────────────────────────────────────────
// ─── Context tipi ──────────────────────────────────────────
interface DateRangeContextType {
    dateFrom: string;     // YYYY-MM-DD (input uchun)
    dateTo:   string;     // YYYY-MM-DD (input uchun)
    setDateFrom: (v: string) => void;
    setDateTo:   (v: string) => void;
    apiDateFrom: string;  // DD.MM.YYYY (API uchun)
    apiDateTo:   string;  // DD.MM.YYYY (API uchun)
    region:      string;
    regionId:    number;
    setRegion:   (v: string) => void;
    reset: () => void;
}

// ─── Yaratish ──────────────────────────────────────────────
const DateRangeContext = createContext<DateRangeContextType | null>(null);

// ─── Provider ──────────────────────────────────────────────
export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
    const [dateFrom, setDateFrom] = useState(() => {
        return localStorage.getItem("filter_date_from") ?? DEFAULT_FROM;
    });
    const [dateTo, setDateTo] = useState(() => {
        return localStorage.getItem("filter_date_to") ?? DEFAULT_TO;
    });
    const [region, setRegion] = useState(() => {
        return localStorage.getItem("filter_region") ?? "Все области";
    });

    const handleSetDateFrom = (val: string) => {
        setDateFrom(val);
        localStorage.setItem("filter_date_from", val);
    };

    const handleSetDateTo = (val: string) => {
        setDateTo(val);
        localStorage.setItem("filter_date_to", val);
    };

    const handleSetRegion = (val: string) => {
        setRegion(val);
        localStorage.setItem("filter_region", val);
    };

    const regionIdMap: Record<string, number> = {
        "Все области": 15,
        "Ташкентская область": 1,
        "Самаркандская область": 2,
        "Бухарская область": 3,
        "Ферганская область": 4,
        "Андижанская область": 5,
        "Наманганская область": 6,
        "Кашкадарьинская область": 7,
        "Сурхандарьинская область": 8,
        "Джизакская область": 9,
        "Сырдарьинская область": 10,
        "Навоийская область": 11,
        "Хорезмская область": 12,
        "Республика Каракалпакстан": 13,
        "Город Ташкент": 14,
    };

    const regionId = regionIdMap[region] ?? 14;

    const reset = () => {
        setDateFrom(DEFAULT_FROM);
        setDateTo(DEFAULT_TO);
        setRegion("Все области");
        localStorage.removeItem("filter_date_from");
        localStorage.removeItem("filter_date_to");
        localStorage.removeItem("filter_region");
    };

    return (
        <DateRangeContext.Provider value={{
            dateFrom,
            dateTo,
            setDateFrom: handleSetDateFrom,
            setDateTo:   handleSetDateTo,
            apiDateFrom: toApiDate(dateFrom),
            apiDateTo:   toApiDate(dateTo),
            region,
            regionId,
            setRegion: handleSetRegion,
            reset,
        }}>
            {children}
        </DateRangeContext.Provider>
    );
};

// ─── Hook ──────────────────────────────────────────────────
export const useDateRange = () => {
    const ctx = useContext(DateRangeContext);
    if (!ctx) throw new Error("useDateRange must be used inside <DateRangeProvider>");
    return ctx;
};
