import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function useQueryFilters() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const setParam = useCallback((key: string, value?: string, resetPage = true) => {
        const p = new URLSearchParams(params);

        if (value) p.set(key, value);
        else p.delete(key);

        if (resetPage && key !== "page") {
            p.set("page", "1");
        }

        navigate(`?${p.toString()}`, { replace: true });
    }, [params, navigate]);

    return { params, setParam };
}
