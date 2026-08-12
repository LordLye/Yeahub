import clsx from "clsx";
import { Icon } from '@/shared/ui/Icon';
import styles from './CircleIcon.module.scss';

interface CircleIconProps {
    icon: string;
    w?: number;
    h?: number;
    bgColor?: "black" | "white";
}

export function CircleIcon({ icon, w = 24, h = 24, bgColor = "white" }: CircleIconProps) {
    return (
        <div className={styles.wrapper}>
            <Icon
                name={icon}
                className={clsx(
                    styles.icon,
                    bgColor === "black" ? styles.bgBlack : styles.bgWhite,
                )}
                style={{ width: w, height: h }}
            />
        </div>
    );
}
