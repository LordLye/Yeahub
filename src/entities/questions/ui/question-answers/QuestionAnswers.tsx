import { ChevronDown } from 'lucide-react';
import styles from './QuestionAnswers.module.scss'
import { MixedContentRenderer } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export function QuestionAnswers({ question }: { question: any}) {
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [isButtonCreated, setIsButtonCreated] = useState(false);
    const MAX_HEIGHT = parseInt(styles.maxHeightAnswerBlock, 10) || 300;

    const longAnswerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = longAnswerRef.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver((el) => {
            for (let target of el) {
                const currentScrollHeight = target.target.scrollHeight;

                if (currentScrollHeight > MAX_HEIGHT) {
                    setIsButtonCreated(true);
                } else {
                    setIsButtonCreated(false);
                }
            }
        });
        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [question, MAX_HEIGHT]);

    if (!question) return null;

    return (
        <section className={styles.container}>
            <div className={styles.shortAnswerContainer}>
                <h2 className={styles.title}>Краткий ответ</h2>
                <div className={styles.shortAnswer}>
                    <MixedContentRenderer dbText={question.shortAnswer} />
                </div>
            </div>
            <div className={clsx(styles.answerContainer, isAnswerOpen && styles.open)}>
                <h2 className={styles.title}>Развёрнытый ответ</h2>
                <div className={styles.answer} ref={longAnswerRef}>
                    <MixedContentRenderer dbText={question.longAnswer} />
                </div>
                {
                    isButtonCreated && (
                        <button className={clsx(styles.button, isAnswerOpen && styles.open)} onClick={() => setIsAnswerOpen(!isAnswerOpen)}>
                            <span className={styles.buttonText}>
                                {isAnswerOpen ? 'Скрыть' : 'Развернуть'}
                            </span>
                            <ChevronDown className={clsx(styles.icon, isAnswerOpen && styles.open)} />
                        </button>
                    )
                }
            </div>
        </section>
    );
}