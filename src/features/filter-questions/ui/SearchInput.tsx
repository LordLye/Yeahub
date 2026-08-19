import React, { useEffect, useState } from "react";
import useQueryFilters from "../../../shared/lib/hooks/useQueryFilters";
import styles from './SearchInput.module.scss';

export function SearchInput() {
    const { params, setParam } = useQueryFilters();
    const [searchValue, setSearchValue] = useState(() => params.get("titleOrDescription") || "");

    useEffect(() => {
        const currentUrlSearch = params.get("titleOrDescription") || "";
        if (searchValue !== currentUrlSearch) {
            setSearchValue(currentUrlSearch);
        }
    }, [params]);

    useEffect(() => {
        const currentUrlSearch = params.get("titleOrDescription") || "";

        if (searchValue === currentUrlSearch) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            setParam("titleOrDescription", searchValue || undefined);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, setParam, params]);

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                placeholder="Поиск по названию..."
                className={styles.input}
            />
        </div>
    );
}
