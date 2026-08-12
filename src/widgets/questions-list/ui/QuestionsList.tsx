import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { QuestionCard, useGetQuestionsQuery } from "@/entities/questions";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import styles from './QuestionsList.module.scss';

export function QuestionsList() {
    const [searchParams] = useSearchParams();

    const queryParams = useMemo(
        () => ({
            page: "1",
            ...Object.fromEntries(searchParams),
        }),
        [searchParams],
    );

    const { data: questionsData, isLoading, isFetching, isError } = useGetQuestionsQuery(queryParams);

    const prevDataRef = useRef(questionsData);
    if (questionsData) prevDataRef.current = questionsData;
    const displayData = questionsData ?? prevDataRef.current;

    const questions = displayData?.data || [];
    const totalPages = Math.ceil((displayData?.total || 0) / (displayData?.limit || 1)) || 1;

    if (isLoading && !displayData) return <div className={styles.message}>Загрузка вопросов...</div>;

    if (isError && !displayData) return <div className={styles.message}>Произошла ошибка при загрузке данных</div>;

    if (!questions.length) return <div className={styles.message}>Вопросы не найдены</div>;

    return (
        <section className={clsx(styles.section, isFetching && styles.fetching)}>
            <ul className={styles.list}>
                {questions.map((item: { id: number; title: string; shortAnswer: string; rate: number; complexity: string }) => (
                    <li key={item.id} className={styles.item}>
                        <QuestionCard
                            text={item.title}
                            content={item.shortAnswer}
                            rate={item.rate}
                            complexity={item.complexity}
                        />
                    </li>
                ))}
            </ul>
            <Pagination totalPages={totalPages} />
        </section>
    );
}
