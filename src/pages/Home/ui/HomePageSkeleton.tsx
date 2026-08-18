import Skeleton from '@/shared/ui/Skeleton';
import styles from './HomePage.module.scss';
import { QuestionListSkeleton } from '@/widgets/questions-list';

export const HomePageSkeleton = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <Skeleton width="400px" height="28px" />
                    </h1>
                    <QuestionListSkeleton />
                </div>
            </div>
        </div>
    );
};
