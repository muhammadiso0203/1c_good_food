import { useQuery } from "@tanstack/react-query";
import api from "@/config/config";
import { useDateRange } from "@/context/DateRangeContext";

export const useMainpage = () => {
    const { apiDateFrom, apiDateTo, regionId } = useDateRange();

    return useQuery({
        queryKey: ["mainpage", apiDateFrom, apiDateTo, regionId],
        queryFn: () =>
            api.post("/dashboard/mainpage", {
                data_nach: apiDateFrom,
                data_kon: apiDateTo,
                items: [{ ID: regionId }],
            }).then((res) => res.data),
        staleTime: 1000 * 60 * 30, // 30 minutes
        cacheTime: 1000 * 60 * 60, // 1 hour
    });
};
