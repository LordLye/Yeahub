import { Menu, ChevronDown } from "lucide-react";
import { Icon } from '@/shared/ui/Icon';
import styles from './Header.module.scss';
import { AuthActions, closeAuthMenu, openAuthMenu, selectIsAuthMenuOpen } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useRef, useState } from "react";
import SelectTitles from "@/features/selectTitles/ui/SelectTitles";

export function Header() {
    const dispatch = useDispatch();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

    function handleSwitchSelectModal(e: React.MouseEvent<HTMLDivElement>) { 
        setIsSelectModalOpen((prev) => !prev);
    }

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
                    <div className={styles.titleWrapper} onClick={handleSwitchSelectModal} data-menu-trigger>
                        <span className={styles.title}>
                            Подготовка
                        </span>
                        <ChevronDown size={24} className={styles.chevron} />
                    </div>
                    <div className={styles.selectModalDesktop}>
                        <SelectTitles/>
                    </div>

                    {isSelectModalOpen && (
                        <div className={styles.selectModalMobile}>
                            <SelectTitles isOpen={isSelectModalOpen} onClose={() => setIsSelectModalOpen(false)} />
                        </div>
                    )}
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
