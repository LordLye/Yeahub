import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { QuestionNavigation } from '@/features/navigate-questions';
import { QuestionAnswers, QuestionHeaderCard } from '@/entities/questions';

export function QuestionPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const backUrl = location.state?.from?.pathname + location.state?.from?.search || "/";
    console.log(backUrl);
    const handleBackClick = () => {
        navigate(backUrl);
    };

    if (!id || id === 'undefined') {
        return <div>Ошибка: Вопрос не найден или указан некорректный ID</div>;
    }

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <button className={styles.backButton} type="button" onClick={handleBackClick}>
                        <ChevronLeft size={24} />
                        <p className={styles.backText}>Назад</p>
                    </button>
                    <div>
                        <QuestionHeaderCard />
                        <QuestionNavigation />
                        <QuestionAnswers />
                    </div>
                </div>
                <aside className={styles.asideSlot} id="desktop-aside-slot">
                    <p className={styles.sidebar}>Aside menu</p>
                    <div className={styles.promoBanner}>
                        <p>Промо баннер</p>
                    </div>
                </aside>
            </div>
        </section>
    );
}
