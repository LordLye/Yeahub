import { Icon } from '@/shared/ui/icon';
import styled from './QuestionHeaderCard.module.scss'
import Skeleton from '@/shared/ui/skeleton';

export function QuestionHeaderCardSkeleton() {

    return (
        <section className={styled.card}>
            <Skeleton className={styled.image} />
            <div className={styled.content}>
                <div className={styled.TitleContainer}>
                    <div className={styled.title}>
                        <Skeleton width="500px" height="24px" />
                    </div>
                    <button className={styled.infoButton} type="button">
                        <Icon className={styled.icon} name="infoMenu" width={22} height={22} />
                    </button>
                </div>
                <div className={styled.description}>
                    <Skeleton width="500px" height="24px" />
                </div>
            </div>
        </section>
    );
}