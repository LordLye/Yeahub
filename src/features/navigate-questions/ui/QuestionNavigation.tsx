import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './QuestionNavigation.module.scss';
import clsx from 'clsx';

interface QuestionNavigationProps {
    onPrev?: () => void;
    onNext?: () => void;
    isDisabled: boolean;
}

export function QuestionNavigation({ onPrev, onNext, isDisabled }: QuestionNavigationProps) {
    return (
        <section className={styles.container}>
            <button
                type="button"
                className={clsx(styles.button, isDisabled && styles.disabled)}
                onClick={onPrev}
                disabled={isDisabled}
            >
                <ChevronLeft className={styles.icon} />
                <span className={styles.text}>Предыдущий</span>
            </button>

            <button
                type="button"
                className={clsx(styles.button, isDisabled && styles.disabled)}
                onClick={onNext}
                disabled={isDisabled}
            >
                <span className={styles.text}>Следующий</span>
                <ChevronRight className={styles.icon} />
            </button>
        </section>
    );
}
