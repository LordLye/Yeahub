import styles from './AuthActions.module.scss';

export function AuthActions() {

    return (
        <div className={styles.wrapper}>
            <button className={styles.loginBtn} onClick={() => {}}>
                Вход
            </button>
            <button className={styles.registerBtn} onClick={() => {}}>
                Регистрация
            </button>
        </div>
    );
}
