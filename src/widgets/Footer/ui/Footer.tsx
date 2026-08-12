import { CircleIcon } from "@/shared/ui/CircleIcon";
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Yeahub</h1>

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
                        <CircleIcon icon="figma" />
                        <CircleIcon icon="telegram" w={36} h={36} bgColor="black" />
                        <CircleIcon icon="youtube" w={36} h={36} bgColor="black" />
                        <CircleIcon icon="linkedin" w={30} h={30} />
                        <CircleIcon icon="github" w={36} h={36} bgColor="black" />
                    </div>
                </div>

                <p className={styles.socialHint}>
                    Ищите нас и в других соцсетях @yeahub_it
                </p>
            </div>
        </div>
    );
}
