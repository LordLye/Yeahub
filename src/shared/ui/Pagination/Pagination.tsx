import clsx from "clsx";
import useQueryFilters from "@/shared/lib/hooks/useQueryFilters";
import { getPagination } from "@/shared/lib/utils/usePagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from './Pagination.module.scss';

interface PaginationProps {
    totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
    const { params, setParam } = useQueryFilters();
    const currentPage = Number(params.get("page") || 1);
    const items = getPagination(currentPage, totalPages, 2);

    const handlerAddParams = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const targetText = target.innerText;
        if (targetText && !isNaN(Number(targetText)) && Number(targetText) !== currentPage) {
            setParam("page", targetText, false);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setParam("page", String(Math.max(1, currentPage - 1)), false)}
                disabled={currentPage === 1}
                className={styles.navButton}
            >
                <ArrowLeft size={18} />
            </button>

            <div className={styles.pages} onClick={handlerAddParams}>
                {items.map((item: number | string, i: number) =>
                item === "..." ? (
                    <span key={i} className={styles.ellipsis}>...</span>
                ) : (
                    <button
                        key={i}
                        className={clsx(styles.pageButton, item === currentPage && styles.active)}
                    >
                        {item}
                    </button>
                )
            )}
            </div>

            <button
                onClick={() => setParam("page", String(Math.min(totalPages, currentPage + 1)), false)}
                disabled={currentPage === totalPages}
                className={styles.navButton}
            >
                <ArrowRight size={18} />
            </button>
        </div>
    );
}
