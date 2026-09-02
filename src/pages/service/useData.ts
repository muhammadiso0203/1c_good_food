import { api } from "../../config/config"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

import type { DateRange } from "react-day-picker"
import type { StatsCard } from "./interface"

export const useData = (dateRange?: DateRange, branch: number = 1) => {
    const data_nach = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : "01.01.2026"
    const data_kon = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : (dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : "04.12.2026")
    const branchId = Number(branch) || 1

    return useQuery({
        queryKey: ["data", data_nach, data_kon, branchId],
        queryFn: async () => {
            const res = await api.post<StatsCard>('/dashboard/mainpage', {

                data_nach,
                data_kon,
                items: [
                    {
                        ID: branchId
                    }
                ]
            })
            const raw = res.data
            return Array.isArray(raw) ? raw[0] : raw
        },
        staleTime: 1000 * 5, // 5 soniya
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}
