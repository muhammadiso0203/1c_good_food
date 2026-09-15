import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetSklat = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["sklat-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Товарные запасы", value: "1.2 млрд сум", desc: "Общая стоимость ТМЦ" },
                    { id: 2, name: "Количество позиций", value: "1 850 ед.", desc: "Активный номенклатурный ряд" },
                    { id: 3, name: "Оборачиваемость", value: "14 дней", desc: "Средний срок хранения" },
                    { id: 4, name: "Дефицитные позиции", value: "24 ед.", desc: "Требуют срочного заказа" }
                ]);
            }, 500);
        })
    });
};
