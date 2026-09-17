import { useState } from "react";
import styles from './Section.module.scss';
import Skeleton from "../skeleton";

export function Section({
    title,
    isLoading,
    expanded = false,
    expandCount = 5,
    hasMore = false,
    onExpand,
    children,
}: {
    title: string;
    isLoading: boolean;
    expanded?: boolean;
    expandCount?: number;
    hasMore?: boolean;
    onExpand?: () => void;
    children: React.ReactNode[];
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded((prev) => {
            const next = !prev;
            if (next) onExpand?.();
            return next;
        });
    };

    const items = Array.isArray(children) ? children : [children];
    const visibleItems = isExpanded ? items : items.slice(0, expandCount);
    const showExpandLink = expanded && !isLoading && (hasMore || items.length > expandCount);

    return (
        <div className={styles.section}>
            <h3 className={styles.title}>{title}</h3>
            {isLoading && (
                <div className={styles.chips}>
                    <Skeleton width="100%" height="32px" />
                </div>
            )}
            {!isLoading && (
                <div className={styles.chips}>
                    {visibleItems}
                </div>
            )}

            {showExpandLink && (
                <p
                    onClick={toggleExpand}
                    className={styles.expandLink}
                >
                    {isExpanded ? "Скрыть" : "Посмотреть все"}
                </p>
            )}

            {expanded && isLoading && (
                <div className={styles.expandLink}>
                    <Skeleton width="100px" height="16px" />
                </div>
            )}
        </div>
    );
}
