import { Menu, ChevronDown } from "lucide-react";
import { Icon } from '@/shared/ui/Icon';
import styles from './Header.module.scss';
import { AuthActions, closeAuthMenu, openAuthMenu, selectIsAuthMenuOpen } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useRef, useState } from "react";

export function Header() {
    const dispatch = useDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

    const OpenAuthMenu = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();

            setCoords({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        }

        dispatch(openAuthMenu());
    };

    const isMobileMenuOpen = useSelector(selectIsAuthMenuOpen);
    const handleClose = () => dispatch(closeAuthMenu());

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <Icon name="logo" className={styles.logo} />
                </div>
                <Icon name="yeahub" className={styles.logoYeahub} />
                <div className={styles.titleGroup}>
                    <span className={styles.title}>
                        Подготовка
                    </span>
                    <ChevronDown size={24} className={styles.chevron} />
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                База вопросов
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Тренажёр
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Материалы
                            </a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#" className={styles.navLink}>
                                Навыки (hh)
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.desktopAuth}>
                <AuthActions />
            </div>


            <button className={styles.menuButton} onClick={OpenAuthMenu} ref={buttonRef}>
                <Menu size={23} className={styles.menuIcon} />
            </button>

            <Modal 
                isOpen={isMobileMenuOpen} 
                onClose={handleClose}
                className={styles.mobileAuthModal} 
                noCloseButton data-no-scroll-lock
                style={{
                    position: 'fixed',
                    top: `${coords.top}px`,
                    right: `${coords.right}px`,
                }}
            >
                <div className={styles.mobileModalContent}>
                    <AuthActions />
                </div>
            </Modal>

        </div>
    );
}
