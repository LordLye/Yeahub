import Skeleton from '@/shared/ui/Skeleton';
import styles from './QuestionPage.module.scss';

export function QuestionPageSkeleton() {
    return (
        <section>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Question Page</h1>
                <Skeleton width="100%" height="32px" />
            </div>
        </section>
    );
}