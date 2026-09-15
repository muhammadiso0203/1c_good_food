import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetRaschet = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["raschet-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Активы по МСФО", value: "2.4 трлн сум", desc: "+8.2% г/г" },
                    { id: 2, name: "Обязательства по МСФО", value: "1.1 трлн сум", desc: "+3.4% г/г" },
                    { id: 3, name: "Капитал по МСФО", value: "1.3 трлн сум", desc: "+12.1% г/г" },
                    { id: 4, name: "Чистая прибыль (МСФО)", value: "280 млрд сум", desc: "Рентабельность 11.6%" }
                ]);
            }, 500);
        })
    });
};
