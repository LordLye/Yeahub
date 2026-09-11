import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './QuestionPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { QuestionNavigation } from '@/features/navigate-questions';
import { QuestionAnswers, QuestionHeaderCard } from '@/entities/questions';
import { useGetQuestionByIdQuery, useGetQuestionsQuery } from '@/entities/questions/api/questionsApi';
import { ResponsivePortal } from '@/shared/ui/responsive-portal/ResponsivePortal';
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { PromoBanner } from '@/widgets/promo-banner';
import { QuestionInfo } from '@/widgets/question-info';

export function QuestionPage() {
    const { id } = useParams<{ id?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentId = Number(id ?? 0);
    const isValidId = id && id !== 'undefined' && !isNaN(currentId);
    const page = Number(searchParams.get('page') || '1');

    // Флаг, который защищает от двойных кликов в момент смены страницы пагинации
    const [isPageChanging, setIsPageChanging] = useState(false);

    // 1. Запрашиваем список вопросов текущей страницы
    const queryParams = useMemo(() => ({
        page: String(page),
        ...Object.fromEntries(searchParams),
    }), [searchParams, page]);

    const { data: questionsData, isFetching: isListFetching } = useGetQuestionsQuery(queryParams);

    const questions = questionsData?.data || [];
    const totalCount = questionsData?.total || 0;
    const limit = questionsData?.limit || 1;
    const maxPages = Math.ceil(totalCount / limit);

    // Ищем индекс вопроса в текущем списке
    const currentQIndex = questions.findIndex((q: any) => q.id === currentId);

    // 2. Снимаем флаг блокировки, как только данные страницы полностью загрузились, 
    // и нужный ID появился в списке вопросов
    useEffect(() => {
        if (!isListFetching && currentQIndex !== -1) {
            setIsPageChanging(false);
        }
    }, [isListFetching, currentQIndex]);

    // 3. Запрос за деталями конкретного вопроса (пропускаем во время смены страниц)
    const shouldSkipQuestionQuery = !isValidId || isPageChanging || currentQIndex === -1;
    const { data: question, isLoading: isQuestionLoading, isError } = useGetQuestionByIdQuery(
        currentId,
        { skip: shouldSkipQuestionQuery }
    );

    // 4. Обработка клика "Вперед"
    const handleNext = () => {
        if (isPageChanging || isListFetching || questions.length === 0) return;

        // Если это обычный элемент внутри страницы
        if (currentQIndex !== -1 && currentQIndex < questions.length - 1) {
            const nextId = questions[currentQIndex + 1].id;
            navigate(`/questions/${nextId}?${searchParams.toString()}`, {
                state: location.state // <-- Прокидываем state дальше
            });
            return;
        }

        // Если это последний элемент на странице — переключаем страницу пагинации
        setIsPageChanging(true);
        const nextPage = page >= maxPages ? 1 : page + 1;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(nextPage));

        // Заменяем setSearchParams(newParams) на navigate:
        navigate(`/questions/${currentId}?${newParams.toString()}`, {
            state: location.state
        });
    };

    // 5. Обработка клика "Назад"
    const handlePrev = () => {
        if (isPageChanging || isListFetching || questions.length === 0) return;

        // Если это обычный элемент внутри страницы
        if (currentQIndex > 0) {
            const prevId = questions[currentQIndex - 1].id;
            navigate(`/questions/${prevId}?${searchParams.toString()}`, {
                state: location.state // <-- Прокидываем state дальше
            });
            return;
        }

        // Если это первый элемент на странице — переключаем страницу пагинации назад
        setIsPageChanging(true);
        const prevPage = page <= 1 ? maxPages : page - 1;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(prevPage));

        // Заменяем setSearchParams(newParams) на navigate:
        navigate(`/questions/${currentId}?${newParams.toString()}`, {
            state: location.state
        });
    };

    // 6. Отдельный эффект, который срабатывает только когда страница в URL УЖЕ изменилась,
    // новые данные прилетели, и нам нужно выбрать крайний элемент (первый или последний)
    // Внутри useEffect, который обрабатывает стык страниц и target в QuestionPage:
    useEffect(() => {
        if (!isPageChanging || isListFetching || questions.length === 0) return;

        if (currentQIndex === -1) {
            const isMovingForward = currentId < questions[0]?.id;

            const targetQuestion = isMovingForward
                ? questions[0]
                : questions[questions.length - 1];

            if (targetQuestion) {
                navigate(
                    `/questions/${targetQuestion.id}?${searchParams.toString()}`,
                    {
                        replace: true,
                        state: location.state // <-- КРИТИЧЕСКИ ВАЖНО: сохраняем старый state (from)!
                    }
                );
            }
        }
    }, [isPageChanging, isListFetching, questions, currentQIndex, currentId, searchParams, navigate, location.state]);
    // Не забудьте добавить location.state в массив зависимостей эффекта!



    const headerHeight = useSelector((state: any) => state.header?.headerHeight ?? 0);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    function handleInfoClose() {
        setIsInfoOpen(false);
    }

    const backUrl = useMemo(() => {
        if (location.state?.from?.pathname) {
            return `${location.state.from.pathname}${location.state.from.search || ''}`;
        }
        return `/${location.search || ''}`;
    }, [location]);

    const handleBackClick = () => {
        navigate(backUrl);
    };

    useEffect(() => {
        const handleResize = () => setIsInfoOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isValidId) {
        return <div className={styles.centerMessage}>Ошибка: Указан некорректный ID</div>;
    }

    // Во время жесткой смены страниц или загрузки вопроса показываем лоадер
    if (isQuestionLoading || isPageChanging || currentQIndex === -1) {
        return <div className={styles.centerMessage}>Загрузка вопроса...</div>;
    }

    if (isError || !question) {
        return <div className={styles.centerMessage}>Произошла ошибка при загрузке вопроса</div>;
    }

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <button className={styles.backButton} type="button" onClick={handleBackClick}>
                        <ChevronLeft size={24} />
                        <p className={styles.backText}>Назад</p>
                    </button>
                    <div className={styles.cards}>
                        <QuestionHeaderCard question={question} isOpenInfo={setIsInfoOpen} />

                        <QuestionNavigation
                            onNext={handleNext}
                            onPrev={handlePrev}
                            isDisabled={isPageChanging || isListFetching}
                        />

                        <QuestionAnswers question={question} />
                    </div>
                </div>
                <aside className={styles.asideSlot} >
                    <div className={styles.sidebar} id="desktop-aside-slot"></div>
                    <PromoBanner className={styles.promoBanner} />
                </aside>

                <ResponsivePortal
                    isOpen={isInfoOpen}
                    onClose={handleInfoClose}
                    style={{
                        position: 'absolute',
                        top: `${headerHeight}px`,
                        right: 0,
                        height: 'auto',
                    }}
                    className={styles.infoModal}
                >
                    <QuestionInfo data={question} isLoading={isQuestionLoading} />
                </ResponsivePortal>
            </div>
        </section>
    );
}
