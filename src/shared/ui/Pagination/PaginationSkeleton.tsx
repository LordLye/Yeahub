import Skeleton from "../Skeleton";
import styles from "./Pagination.module.scss";

export function PaginationSkeleton() {
    return (
        <div className={styles.pagination}>
            <Skeleton width="250px" height="32px" />
        </div>
    );
}