import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetPlanirovaniya = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["planirovaniya-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Остаток на начало", value: "840 млн сум", desc: "На 01.05.2026" },
                    { id: 2, name: "Поступления", value: "4.2 млрд сум", desc: "+15% к плану" },
                    { id: 3, name: "Выплаты", value: "3.6 млрд сум", desc: "-4% к лимиту" },
                    { id: 4, name: "Остаток на конец", value: "1.44 млрд сум", desc: "Свободный остаток" }
                ]);
            }, 500);
        })
    });
};
