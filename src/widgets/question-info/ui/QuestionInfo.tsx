import { useMemo } from 'react';
import styles from './QuestionInfo.module.scss';
import { Icon } from '@/shared/ui/icon';
import type { Question } from '@/entities/questions';

interface QuestionInfoProps {
    data: Question;
    isLoading?: boolean;
}

export function QuestionInfo({ data }: QuestionInfoProps) {
    const memoizedSkills = useMemo(() => {
        return (data.questionSkills ?? [])
            .map((item) => (
                <div key={item.id} className={styles.skillWrapper}>
                    <Icon name="figma" className={styles.icon} />
                    <p className={styles.skill}>{item.title}</p>
                </div>
            ));
    }, [data]);

    const memoizedKeyWords = useMemo(() => {
        return (data.keywords ?? [])
            .map((item, index) => (
                <p key={`${item}-${index}`} className={styles.keyword}>#{item}</p>
            ));
    }, [data]);

    return (
        <section className={styles.questionInfo}>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Уровень:</h3>
                <div className={styles.infoWrapper}>
                    <div className={styles.info}>
                        <p className={styles.text}>Сложность:</p>
                        <p className={styles.value}>{data.complexity}</p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.text}>Рейтинг:</p>
                        <p className={styles.value}>{data.rate}</p>
                    </div>
                </div>
            </div>

            <div className={styles.wrapper}>
                <h3 className={styles.title}>Навыки:</h3>
                <div className={styles.infoWrapper}>
                    {memoizedSkills}
                </div>
            </div>

            <div className={styles.wrapper}>
                <h3 className={styles.title}>Ключевые слова:</h3>
                <div className={styles.infoWrapper}>
                    {memoizedKeyWords}
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
