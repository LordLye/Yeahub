import styles from './QuestionInfo.module.scss';
import Skeleton from '@/shared/ui/skeleton';

export function QuestionInfoSkeleton() {

    return (
        <section className={styles.questionInfo}>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Уровень:</h3>
                <div className={styles.infoWrapper}>
                    <div className={styles.info}>
                        <p className={styles.text}>Сложность:</p>
                        <p className={styles.value}>
                            <Skeleton width="40px" height="24px" />
                        </p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.text}>Рейтинг:</p>
                        <p className={styles.value}>
                            <Skeleton width="40px" height="24px" />
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.wrapper}>
                <h3 className={styles.title}>Навыки:</h3>
                <div className={styles.infoWrapper}>
                    <Skeleton width="100%" height="24px" />
                </div>
            </div>

            <div className={styles.wrapper}>
                <h3 className={styles.title}>Ключевые слова:</h3>
                <div className={styles.infoWrapper}>
                    <Skeleton width="100%" height="24px" />
                </div>
            </div>

            <div className={styles.wrapper}>
                <p className={styles.author}>
                    <span>Автор: </span>
                    <span className={styles.authorName}>
                        Дмитрий Мусиенко
                    </span>
                </p>
            </div>
        </section>
    );
}
