import { api } from "../../config/config"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useMemo } from "react"

import type { DateRange } from "react-day-picker"
import type { StatsCard } from "./interface"

export const useMainpage = (dateRange?: DateRange, branch: number = 1) => {
    const now = new Date()
    const defaultFrom = new Date(now.getFullYear(), 0, 1)

    const data_nach = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(defaultFrom, "dd.MM.yyyy")
    const data_kon = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : (dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(now, "dd.MM.yyyy"))
    const branchId = Number(branch) || 1

    return useQuery({
        queryKey: ["mainpage", data_nach, data_kon, branchId],
        queryFn: async () => {
            const res = await api.post<StatsCard | StatsCard[]>('/dashboard/mainpage', {
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

export const useMainpageLong = (dateRange?: DateRange, branch: number = 1) => {
    const now = new Date()
    const defaultFrom = new Date(now.getFullYear(), 0, 1)

    const data_nach = dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(defaultFrom, "dd.MM.yyyy")
    const data_kon = dateRange?.to ? format(dateRange.to, "dd.MM.yyyy") : (dateRange?.from ? format(dateRange.from, "dd.MM.yyyy") : format(now, "dd.MM.yyyy"))
    const branchId = Number(branch) || 1

    return useQuery({
        queryKey: ["mainpagelong", data_nach, data_kon, branchId],
        queryFn: async () => {
            try {
                const res = await api.post<StatsCard | StatsCard[]>('/dashboard/Mainpagelong', {
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
            } catch (err) {
                // Fallback for lowercase route if server is case-sensitive
                try {
                    const res = await api.post<StatsCard | StatsCard[]>('/dashboard/mainpagelong', {
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
                } catch {
                    throw err
                }
            }
        },
        staleTime: 1000 * 60 * 2, // 2 daqiqa
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}

export const useData = (dateRange?: DateRange, branch: number = 1) => {
    const mainpageQuery = useMainpage(dateRange, branch)
    const longQuery = useMainpageLong(dateRange, branch)

    const mergedData = useMemo(() => {
        if (!mainpageQuery.data && !longQuery.data) return undefined
        return {
            ...(mainpageQuery.data || {}),
            ...(longQuery.data || {}),
        } as StatsCard
    }, [mainpageQuery.data, longQuery.data])

    return {
        data: mergedData,
        isLoading: mainpageQuery.isLoading && longQuery.isLoading,
        isMainpageLoading: mainpageQuery.isLoading,
        isLongLoading: longQuery.isLoading,
        mainpageData: mainpageQuery.data,
        longData: longQuery.data,
        isError: mainpageQuery.isError && longQuery.isError,
        refetch: async () => {
            await Promise.allSettled([mainpageQuery.refetch(), longQuery.refetch()])
        },
    }
}

export { useIlliquidProducts } from "./useIlliquidProducts"


