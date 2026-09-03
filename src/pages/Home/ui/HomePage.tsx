import { QuestionsList } from "@/widgets/questions-list/ui/QuestionsList";
import styles from './HomePage.module.scss';
import { Suspense } from "react";
import { QuestionListSkeleton } from "@/widgets/questions-list";
import { Icon } from "@/shared/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileFilters, openMobileFilters, selectIsFilterOpen } from "@/features/filter-questions/model/slice";
import { FiltersModal } from "@/features/filter-questions/ui/FiltersModal/FiltersModal";
import { ResponsivePortal } from "@/shared/ui/responsivePortal/ResponsivePortal";

export function HomePage() {
  const isFiltersOpen = useSelector(selectIsFilterOpen);
  const headerHeight = useSelector((state: any) => state.header?.headerHeight ?? 0);
  const dispatch = useDispatch();

  const handleCloseMobile = () => {
    dispatch(closeMobileFilters());
  };

  function handleOpenFilters() {
    dispatch(openMobileFilters());
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Вопросы React, JavaScript</h1>
            <Icon className={styles.filterIcon} name="filterIcon" size={24} onClick={handleOpenFilters} />
          </div>
          <Suspense fallback={<QuestionListSkeleton />}>
            <QuestionsList />
          </Suspense>
        </div>
      </div>

      <aside id="desktop-aside-slot" className={styles.asideSlot}></aside>
      
      <ResponsivePortal
        isOpen={isFiltersOpen}
        onClose={handleCloseMobile}
        style={{
          position: 'absolute',
          top: `${headerHeight}px`, 
          right: 0, 
          height: 'auto', 
        }}
      >
        <FiltersModal />
      </ResponsivePortal>
    </div>
  );
}
