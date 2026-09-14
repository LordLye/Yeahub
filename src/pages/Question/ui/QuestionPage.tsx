import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './QuestionPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { QuestionNavigation } from '@/features/navigate-questions';
import { QuestionAnswers, QuestionHeaderCard } from '@/entities/questions';
import { useGetQuestionByIdQuery, useGetQuestionsQuery } from '@/entities/questions/api/questionsApi';
import { ResponsivePortal } from '@/shared/ui/responsive-portal/ResponsivePortal';
import { useSelector } from 'react-redux';
import { useEffect, useState, useMemo, Suspense } from 'react';
import { PromoBanner } from '@/widgets/promo-banner';
import { QuestionInfo } from '@/widgets/question-info';
import { QuestionPageSkeleton } from './QuestionPageSkeleton';
import { QuestionInfoSkeleton } from '@/widgets/question-info';

export function QuestionPage() {
    const { id } = useParams<{ id?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentId = Number(id ?? 0);
    const isValidId = id && id !== 'undefined' && !isNaN(currentId);
    const page = Number(searchParams.get('page') || '1');

    // Храним направление переключения страниц: 'forward' | 'backward' | null
    const [direction, setDirection] = useState<'forward' | 'backward' | null>(null);
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

    // 2. Снимаем флаги блокировки, как только данные загрузились и элемент найден
    useEffect(() => {
        if (!isListFetching && currentQIndex !== -1) {
            setIsPageChanging(false);
            setDirection(null); // Сбрасываем направление
        }
    }, [isListFetching, currentQIndex]);

    // 3. Запрос за деталями конкретного вопроса
    const shouldSkipQuestionQuery = !isValidId || isPageChanging || currentQIndex === -1;
    const { data: question, isLoading: isQuestionLoading, isError } = useGetQuestionByIdQuery(
        currentId,
        { skip: shouldSkipQuestionQuery }
    );

    // 4. Обработка клика "Вперед"
    const handleNext = () => {
        if (isPageChanging || isListFetching || questions.length === 0) return;

        if (currentQIndex !== -1 && currentQIndex < questions.length - 1) {
            const nextId = questions[currentQIndex + 1].id;
            navigate(`/questions/${nextId}?${searchParams.toString()}`, {
                state: location.state
            });
            return;
        }

        // Переключение страницы ВПЕРЕД
        setIsPageChanging(true);
        setDirection('forward'); // Явно фиксируем направление движения
        const nextPage = page >= maxPages ? 1 : page + 1;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(nextPage));

        navigate(`/questions/${currentId}?${newParams.toString()}`, {
            state: location.state
        });
    };

    // 5. Обработка клика "Назад"
    const handlePrev = () => {
        if (isPageChanging || isListFetching || questions.length === 0) return;

        if (currentQIndex > 0) {
            const prevId = questions[currentQIndex - 1].id;
            navigate(`/questions/${prevId}?${searchParams.toString()}`, {
                state: location.state
            });
            return;
        }

        // Переключение страницы НАЗАД
        setIsPageChanging(true);
        setDirection('backward'); // Явно фиксируем направление движения
        const prevPage = page <= 1 ? maxPages : page - 1;

        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(prevPage));

        navigate(`/questions/${currentId}?${newParams.toString()}`, {
            state: location.state
        });
    };

    // 6. Эффект для подмены ID на стыке страниц на основе направления direction
    useEffect(() => {
        if (!isPageChanging || isListFetching || questions.length === 0 || !direction) return;

        if (currentQIndex === -1) {
            // Если шли вперед — берем первый элемент новой страницы, если назад — самый последний
            const targetQuestion = direction === 'forward'
                ? questions[0]
                : questions[questions.length - 1];

            if (targetQuestion) {
                navigate(
                    `/questions/${targetQuestion.id}?${searchParams.toString()}`,
                    {
                        replace: true,
                        state: location.state
                    }
                );
            }
        }
    }, [isPageChanging, isListFetching, questions, currentQIndex, direction, searchParams, navigate, location.state]);

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

    if (isPageChanging || currentQIndex === -1 || isQuestionLoading) {
        return <QuestionPageSkeleton />;
    }

    if (isQuestionLoading || isError || !question) {
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
                    <Suspense fallback={<QuestionInfoSkeleton />}>
                        <QuestionInfo data={question} isLoading={isQuestionLoading} />
                    </Suspense>
                </ResponsivePortal>
            </div>
        </section>
    );
}
