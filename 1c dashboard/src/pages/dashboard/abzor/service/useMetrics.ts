import { useMainpage } from "./useMainpage";
import type { IMetrics } from "@/pages/dashboard/interface/interface";

export const useMetrics = () => {
    const query = useMainpage();
    const data = query.data
        ? (query.data.totalrevenue ?? query.data.metrics ?? query.data) as IMetrics
        : undefined;

    return {
        ...query,
        data,
    };
};
