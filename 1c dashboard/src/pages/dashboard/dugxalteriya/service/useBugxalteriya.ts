import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetBugxalteriya = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["bugxalteriya-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Обработано операций", value: "3,443", desc: "+2.9% к прошлому месяцу" },
                    { id: 2, name: "Филиалов в системе", value: "15", desc: "100% интегрировано" },
                    { id: 3, name: "Бухгалтеров", value: "87", desc: "Централизовано" },
                    { id: 4, name: "Экономия за квартал", value: "17 млн сум", desc: "+30.8% к Q1" }
                ]);
            }, 500);
        })
    });
};
