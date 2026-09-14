import styles from './QuestionAnswers.module.scss'
import Skeleton from '@/shared/ui/skeleton';

export function QuestionAnswersSkeleton() {
    

    return (
        <section className={styles.container}>
            <div className={styles.shortAnswerContainer}>
                <h2 className={styles.title}>Краткий ответ</h2>
                <div className={styles.shortAnswer}>
                    <Skeleton width="100%" height="100px" />
                </div>
            </div>
            <div className={styles.answerContainer}>
                <h2 className={styles.title}>Развёрнытый ответ</h2>
                <div className={styles.answer}>
                    <Skeleton width="100%" height="100px" />
                </div>
            </div>
        </section>
    );
}