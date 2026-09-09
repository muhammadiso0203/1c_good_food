import { api } from "../../config/config"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

export const useIlliquidProducts = (dateRange?: DateRange, branch: number = 1) => {
    const now = new Date()
    const defaultFrom = new Date(now.getFullYear(), 0, 1)

    const data_nach = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(defaultFrom, "dd.MM.yyyy")
    const data_kon = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : (dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(now, "dd.MM.yyyy"))
    const branchId = Number(branch) || 1

    return useQuery({
        queryKey: ["illiquidproduct", data_nach, data_kon, branchId],
        queryFn: async () => {
            const payload = {
                data_nach,
                data_kon,
                items: [
                    {
                        ID: branchId
                    }
                ]
            }

            const res = await api.post('/dashboard/illiquidproduct', payload)
            return res.data
        },
        staleTime: 1000 * 60 * 5, // 5 daqiqa keshda saqlash
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
