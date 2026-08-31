import styles from './SelectTitles.module.scss';

function SelectTitles() {
    return (
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
    );
}

export default SelectTitles;