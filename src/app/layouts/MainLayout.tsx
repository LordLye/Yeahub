import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import styles from './MainLayout.module.scss';

export function MainLayout() {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.mainContainer}>
                <main className={styles.content}>
                    <Outlet />
                </main>
                
                <aside id="desktop-aside-slot" className={styles.asideSlot}></aside>
            </div>
            <Footer />
        </div>
    );
}
