import { QuestionsList } from "@/widgets/questions-list/ui/QuestionsList";
import styles from './HomePage.module.scss';
import { Suspense } from "react";
import { QuestionListSkeleton } from "@/widgets/questions-list";

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>Вопросы React, JavaScript</h1>
          <Suspense fallback={<QuestionListSkeleton />}>
              <QuestionsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
