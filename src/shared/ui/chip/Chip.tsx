import clsx from "clsx";
import styles from './Chip.module.scss';

export function Chip({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(styles.chip, active && styles.active)}
        >
            {children}
        </button>
    );
}
