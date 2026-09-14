import styles from './QuestionPage.module.scss';
import { ChevronLeft } from 'lucide-react';
import { QuestionNavigation } from '@/features/navigate-questions';
import { QuestionAnswersSkeleton } from '@/entities/questions/ui/question-answers/QuestionAnswersSkeleton';
import { PromoBanner } from '@/widgets/promo-banner';
import { QuestionHeaderCardSkeleton } from '@/entities/questions/ui/question-header-card/QuestionHeaderCardSkeleton';

export function QuestionPageSkeleton() {
    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <button className={styles.backButton} type="button">
                        <ChevronLeft size={24} />
                        <p className={styles.backText}>Назад</p>
                    </button>
                    <div className={styles.cards}>
                        <QuestionHeaderCardSkeleton />

                        <QuestionNavigation
                            isDisabled={true}
                        />

                        <QuestionAnswersSkeleton />
                    </div>
                </div>
                <aside className={styles.asideSlot} >
                    <div className={styles.sidebar} id="desktop-aside-slot"></div>
                    <PromoBanner />
                </aside>
            </div>
        </section>
    );
}