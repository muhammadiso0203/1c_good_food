import { useMainpage } from "../../abzor/service/useMainpage"
import type { IKadr } from "@/pages/dashboard/interface/interface"

export const useKadr = () => {
    const query = useMainpage()
    const data = query.data
        ? (query.data.personnel ?? query.data.kadr ?? query.data) as IKadr
        : undefined

    return {
        ...query,
        data,
    }
}