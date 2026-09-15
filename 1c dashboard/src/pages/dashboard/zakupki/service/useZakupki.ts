import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetZakupki = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["zakupki-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Всего закупок", value: "420 ед.", desc: "За тек. квартал" },
                    { id: 2, name: "Сумма закупок", value: "3.2 млрд сум", desc: "+14.2% к прошлому кв." },
                    { id: 3, name: "Активные контракты", value: "85 ед.", desc: "На исполнении" },
                    { id: 4, name: "Экономия", value: "180 млн сум", desc: "За счет тендеров" }
                ]);
            }, 500);
        })
    });
};
