import { PaginationSkeleton } from '@/shared/ui/Pagination';
import styles from './QuestionsList.module.scss';
import { QuestionCardSkeleton } from '@/entities/questions';

export function QuestionListSkeleton() {
    const questionsSkeleton = Array.from({ length: 10 });
    
    return (
        <section className={styles.section}>
                    <ul className={styles.list}>
                        {questionsSkeleton.map((_, index) => (
                            <li key={index} className={styles.item}>
                                <QuestionCardSkeleton />
                            </li>
                        ))}
                    </ul>
                    <PaginationSkeleton />
                </section>
    )
}
