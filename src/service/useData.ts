import { api } from "../config/config"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import type { StatsCard } from "./interface"

export const useData = (dateRange?: DateRange) => {
    const data_nach = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(new Date(), "dd.MM.yyyy")
    const data_kon = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : format(new Date(), "dd.MM.yyyy")

    return useQuery({
        queryKey: ["data", data_nach, data_kon],
        queryFn: () => {
            return api.post<StatsCard>('/dashboard/mainpage', {
                data_nach,
                data_kon
            }).then((res) => res.data)
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 soat keshda saqlanadi
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        placeholderData: keepPreviousData,
    })
}