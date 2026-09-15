import { useQuery } from "@tanstack/react-query";
import type { IDashboard } from "../../interface/interface";

export const useGetKaznacheystya = () => {
    return useQuery<IDashboard[]>({
        queryKey: ["kaznacheystya-stats"],
        queryFn: () => new Promise<IDashboard[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "Всего заявок", value: "850 ед.", desc: "За тек. месяц" },
                    { id: 2, name: "Согласовано", value: "520 ед.", desc: "61.2% от общего" },
                    { id: 3, name: "На рассмотрении", value: "180 ед.", desc: "Требуют внимания" },
                    { id: 4, name: "Оплачено", value: "3.8 млрд сум", desc: "Успешные транзакции" }
                ]);
            }, 500);
        })
    });
};
