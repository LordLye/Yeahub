import Skeleton from '@/shared/ui/Skeleton';
import styles from './QuestionCard.module.scss';


export function QuestionCardSkeleton() {
    return (
        <div className={styles.card}>
            <Skeleton width="100%" height="24px" />
        </div>
    )
}