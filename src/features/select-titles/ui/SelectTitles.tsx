import styles from './SelectTitles.module.scss';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

function SelectTitles() {
    return (
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <NavLink to="/" end className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>База вопросов</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink to="/train" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>Тренажёр</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink to="/materials" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>Материалы</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink to="/skills" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>Навыки (hh)</NavLink>
            </li>
        </ul>
    );
}

export default SelectTitles;
