import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { MixedContentRenderer } from "@/shared/lib/utils/MixedContentRenderer";
import styles from './QuestionCard.module.scss';

export function QuestionCard({text, content, rate, complexity}: {text: string; content: string; rate: number; complexity: string}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.card}>
            <button className={styles.toggle} type="button" onClick={toggle} aria-expanded={isOpen}>
                <div className={styles.titleRow}>
                    <span className={styles.bullet} />
                    <p className={styles.title}>
                        {text}
                    </p>
                </div>
                <ChevronDown
                    size={20}
                    className={clsx(styles.chevron, isOpen && styles.open)}
                />
            </button>
            <div className={clsx(styles.contentWrapper, isOpen ? styles.open : styles.closed)}>
                <div className={styles.content}>
                    <div className={styles.metaRow}>
                        <div className={styles.badge}>
                            <span className={styles.badgeLabel}>
                                Рейтинг:
                            </span>
                            <span className={styles.badgeValue}>
                                {rate}
                            </span>
                        </div>
                        <div className={styles.badge}>
                            <span className={styles.badgeLabel}>
                                Сложность:
                            </span>
                            <span className={styles.badgeValue}>
                                {complexity}
                            </span>
                        </div>
                    </div>
                    <div className={styles.answer}>
                        {isOpen && <MixedContentRenderer dbText={content} />}
                    </div>
                    <button type="button" className={styles.moreButton}>
                        <span className={styles.moreText}>
                            Подробнее
                        </span>
                        <ArrowRight size={18} className={styles.moreIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
}
