import styles from './HomePage.module.scss';
import { QuestionListSkeleton } from '@/widgets/questions-list';

export const HomePageSkeleton = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Вопросы React, JavaScript</h1>
                    <QuestionListSkeleton />
                </div>
            </div>
        </div>
    );
};
