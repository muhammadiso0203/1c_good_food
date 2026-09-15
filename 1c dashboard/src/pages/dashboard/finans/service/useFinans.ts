import { useMainpage } from "../../abzor/service/useMainpage"
import type { IFinance } from "@/pages/dashboard/interface/interface"

export const useFinans = () => {
    const query = useMainpage()
    const data = query.data
        ? (query.data.financialindicators ?? query.data.finance ?? query.data) as IFinance
        : undefined

    return {
        ...query,
        data,
    }
}