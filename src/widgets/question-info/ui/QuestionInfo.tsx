import { useMemo } from 'react';
import styles from './QuestionInfo.module.scss';
import { Icon } from '@/shared/ui/icon';

export function QuestionInfo({data, isLoading} : any) {
    
    const memoizedSkills = useMemo(() => {
            return data.questionSkills
            .map((item: any) => (
                <div key={item.id} className={styles.skillWrapper}>
                    <Icon name="figma" className={styles.icon}/>
                    <p className={styles.skill}>{item.title}</p>
                </div>
            ));
        }, [data]);

        const memoizedKeyWords = useMemo(() => {
            return data.keywords
            .map((item: any) => (
                <p key={`${item}+${Math.random()}`} className={styles.keyword}>#{item}</p>
            ));
        }, [data]);

    return (
        <section className={styles.questionInfo}>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Уровень:</h3>
                <div className={styles.infoWrapper}>
                    <div className={styles.info}>
                        <p className={styles.text}>Сложность:</p>
                        <p className={styles.value}>10</p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.text}>Рейтинг:</p>
                        <p className={styles.value}>10</p>
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
