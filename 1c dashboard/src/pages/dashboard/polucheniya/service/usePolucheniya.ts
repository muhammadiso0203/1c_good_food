import token from "@/config/config"
import { useQuery } from "@tanstack/react-query"
import type { Polucheniya } from "../../interface/interface"


export const useGetPolucheniya = () => {
    return useQuery({
        queryKey: ["polucheniya"],
        queryFn: () => token.get<Polucheniya[]>("users/polucheniyaStat").then((res) => Array.isArray(res.data) ? res.data : [])
    })
}