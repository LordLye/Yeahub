import { Menu, ChevronDown } from "lucide-react";
import { Icon } from '@/shared/ui/Icon';
import { openMobileFilters } from "@/features/filter-questions";
import styles from './Header.module.scss';
import { useDispatch } from "react-redux";

export function Header() {
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <Icon name="logo" className={styles.logo} />
                </div>
                <Icon name="yeahub" className={styles.logoYeahub} />
                <div className={styles.titleGroup}>
                    <span className={styles.title}>
                        Подготовка
                    </span>
                    <ChevronDown size={24} className={styles.chevron} />
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                База вопросов
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Тренажёр
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Материалы
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Навыки (hh)
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <button className={styles.menuButton} onClick={() => dispatch(openMobileFilters())}>
                <Menu size={23} className={styles.menuIcon} />
            </button>
        </div>
    );
}
