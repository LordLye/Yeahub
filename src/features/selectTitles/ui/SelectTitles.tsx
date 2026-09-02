import { useEffect, useRef } from 'react';
import styles from './SelectTitles.module.scss';

function SelectTitles({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!isOpen || !onClose) return;

        const handleClickOutside = (event: MouseEvent) => {
            const ul = ref.current;
            const target = event.target as HTMLElement;
            
            if (ul && !ul.contains(target) && !target.closest('[data-menu-trigger]')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <ul className={styles.navList} ref={ref}>
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
    );
}

export default SelectTitles;
