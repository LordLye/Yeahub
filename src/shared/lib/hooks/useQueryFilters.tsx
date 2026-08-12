import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function useQueryFilters() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const setParam = useCallback((key: string, value?: string, resetPage = true) => {
        const p = new URLSearchParams(params);

        if (value) p.set(key, value);
        else p.delete(key);

        // Временный дебаг-лог
        console.log(`[useQueryFilters] Вызов для ключа: "${key}". Передано значение: "${value}". Флаг resetPage: ${resetPage}`);

        if (resetPage && key !== "page") {
            console.log(`🔥 СБРОС СТРАНИЦЫ НА "1" из-за изменения ключа "${key}"!`);
            p.set("page", "1");
        }

        navigate(`?${p.toString()}`, { replace: true });
    }, [params, navigate]);

    return { params, setParam };
}
