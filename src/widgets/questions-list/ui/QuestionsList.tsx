import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { QuestionCard, useGetQuestionsQuery } from "@/entities/questions";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import styles from './QuestionsList.module.scss';
import { QuestionListSkeleton } from "./QuestionListSkeleton";

export function QuestionsList() {
    const [searchParams] = useSearchParams();

    const queryParams = useMemo(
        () => ({
            page: "1",
            ...Object.fromEntries(searchParams),
        }),
        [searchParams],
    );

    const { data: questionsData, isFetching, isLoading, isError } = useGetQuestionsQuery(queryParams);

    const prevDataRef = useRef(questionsData);
    if (questionsData) prevDataRef.current = questionsData;
    const displayData = questionsData ?? prevDataRef.current;

    if (isLoading && !displayData) {
        return <QuestionListSkeleton />;
    }

    const questions = displayData?.data || [];
    const totalPages = Math.ceil((displayData?.total || 0) / (displayData?.limit || 1)) || 1;

    if (isError && !displayData) return <div className={styles.message}>Произошла ошибка при загрузке данных</div>;

    if (!questions.length && !isFetching) return <div className={styles.message}>Вопросы не найдены</div>;

    return (
        <section className={`${styles.section} ${isFetching ? styles.pending : ''}`}>
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
