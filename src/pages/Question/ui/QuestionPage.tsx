import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { QuestionNavigation } from '@/features/navigate-questions';
import { QuestionAnswers, QuestionHeaderCard } from '@/entities/questions';
import { useGetQuestionByIdQuery } from '@/entities/questions/api/questionsApi';
import { ResponsivePortal } from '@/shared/ui/responsive-portal/ResponsivePortal';
import { FiltersModal } from '@/features/filter-questions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PromoBanner } from '@/widgets/promo-banner';
import { QuestionInfo } from '@/widgets/question-info';

export function QuestionPage() {
    const { id } = useParams<{ id?: string }>();
    const isValidId = id && id !== 'undefined' && !isNaN(Number(id));

    const { data: question, isLoading, isError } = useGetQuestionByIdQuery(Number(id ?? 0), { skip: !isValidId });
    console.log(question, isLoading, isError);

    const headerHeight = useSelector((state: any) => state.header?.headerHeight ?? 0);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    function handleInfoClose() {
        setIsInfoOpen(false);
    }

    const navigate = useNavigate();
    const location = useLocation();
    const backUrl = location.state?.from?.pathname + location.state?.from?.search || "/";

    const handleBackClick = () => {
        navigate(backUrl);
    };

    if (!isValidId) {
        return <div className={styles.centerMessage}>Ошибка: Указан некорректный ID</div>;
    }

    if (isLoading) {
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
                        <QuestionNavigation />
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
                    <QuestionInfo data={question} isLoading={isLoading} />
                </ResponsivePortal>
            </div>
        </section>
    );
}
