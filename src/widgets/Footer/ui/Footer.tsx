import { CircleIcon } from "@/shared/ui/CircleIcon";
import styles from './Footer.module.scss';
import { Icon } from "@/shared/ui/Icon";

export function Footer() {
    return (
        <div className={styles.wrapper}>
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
                            <CircleIcon icon="figma" w={14} h={14} />
                            <CircleIcon icon="telegram" w={20} h={20} bgColor="black" />
                            <CircleIcon icon="youtube" w={20} h={20} bgColor="black" />
                            <CircleIcon icon="linkedin" w={20} h={20} />
                            <CircleIcon icon="github" w={20} h={20} bgColor="black" />
                        </div>
                        <p className={styles.socialHint}>
                        Ищите нас и в других соцсетях @yeahub_it
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
