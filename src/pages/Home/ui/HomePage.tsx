import { QuestionsList } from "@/widgets/questions-list/ui/QuestionsList";
import styles from './HomePage.module.scss';
import { Suspense } from "react";
import { QuestionListSkeleton } from "@/widgets/questions-list";
import { Icon } from "@/shared/ui/Icon";

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Вопросы React, JavaScript</h1>
            <Icon className={styles.filterIcon} name="filterIcon" size={24} />
          </div>
          <Suspense fallback={<QuestionListSkeleton />}>
              <QuestionsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
