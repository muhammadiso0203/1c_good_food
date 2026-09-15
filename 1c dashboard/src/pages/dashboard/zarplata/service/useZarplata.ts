import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetZarplata = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["zarplata-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Фонд оплаты труда", value: "1.8 млрд сум", desc: "ФОТ за май" },
                    { id: 2, name: "Выплачено", value: "1.6 млрд сум", desc: "88.8% выплат произведено" },
                    { id: 3, name: "Налоги с ФОТ", value: "360 млн сум", desc: "Уплачено в бюджет" },
                    { id: 4, name: "Средняя зарплата", value: "3.5 млн сум", desc: "+3.2% к прошлому кв." }
                ]);
            }, 500);
        })
    });
};
