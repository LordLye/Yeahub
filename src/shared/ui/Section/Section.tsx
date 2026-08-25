import { useState } from "react";
import styles from './Section.module.scss';
import Skeleton from "../Skeleton";

export function Section({
    title,
    isLoading,
    expanded = false,
    expandCount = 5,
    children,
}: {
    title: string;
    isLoading: boolean;
    expanded?: boolean;
    expandCount?: number;
    children: React.ReactNode;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

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
                    {Array.isArray(children) ? children.slice(0, isExpanded ? children.length : expandCount) : children}
                </div>
            )}

            {expanded && !isLoading && (
                <p
                    onClick={() => toggleExpand()}
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
