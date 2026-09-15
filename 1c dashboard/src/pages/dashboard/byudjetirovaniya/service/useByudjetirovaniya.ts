import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetByudjetirovaniya = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["byudjetirovaniya-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Плановый бюджет", value: "4.8 трлн сум", desc: "Утвержден на 2026г" },
                    { id: 2, name: "Исполнено", value: "3.2 трлн сум", desc: "+8.5% к прошлому мес." },
                    { id: 3, name: "Процент исполнения", value: "66.7%", desc: "В пределах нормы" },
                    { id: 4, name: "Остаток лимита", value: "1.6 трлн сум", desc: "Свободный лимит" }
                ]);
            }, 500);
        })
    });
};
