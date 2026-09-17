import { CircleIcon } from "@/shared/ui/circleIcon";
import styles from './Footer.module.scss';
import { Icon } from "@/shared/ui/icon";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.logoWrapper}>
                        <Icon name="yeahub" className={styles.logo} />
                    </div>

                    <p className={styles.subtitle}>
                        Выбери, каким будет IT завтра, вместе с нами
                    </p>

                    <p className={styles.description}>
                        YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.
                    </p>

                    <div className={styles.divider} />

                    <div className={styles.bottomRow}>
                        <span>© 2024 YeaHub</span>
                        <span>Документы</span>

                        <div className={styles.icons}>
                            <Link to="/" target="_blank" rel="noopener noreferrer">
                                <CircleIcon icon="figma" w={14} h={14} />
                            </Link>

                            <Link to="/" target="_blank" rel="noopener noreferrer">
                                <CircleIcon icon="telegram" w={20} h={20} bgColor="black" />
                            </Link>

                            <Link to="/" target="_blank" rel="noopener noreferrer">
                                <CircleIcon icon="youtube" w={20} h={20} bgColor="black" />
                            </Link>

                            <Link to="/" target="_blank" rel="noopener noreferrer">
                                <CircleIcon icon="linkedin" w={20} h={20} />
                            </Link>

                            <Link to="/" target="_blank" rel="noopener noreferrer">
                                <CircleIcon icon="github" w={20} h={20} bgColor="black" />
                            </Link>

                        </div>
                        <p className={styles.socialHint}>
                            Ищите нас и в других соцсетях @yeahub_it
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
