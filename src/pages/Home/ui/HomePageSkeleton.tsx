import { Icon } from '@/shared/ui/Icon';
import styles from './HomePage.module.scss';
import { QuestionListSkeleton } from '@/widgets/questions-list';

export const HomePageSkeleton = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Вопросы React, JavaScript</h1>
                        <Icon className={styles.filterIcon} name="filterIcon" size={24} />
                    </div>
                    <QuestionListSkeleton />
                </div>
            </div>
            <aside id="desktop-aside-slot" className={styles.asideSlot}></aside>
        </div>
    );
};
