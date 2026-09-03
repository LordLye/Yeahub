import { Menu, ChevronDown } from "lucide-react";
import { Icon } from '@/shared/ui/Icon';
import styles from './Header.module.scss';
import { AuthActions, closeAuthMenu, openAuthMenu, selectIsAuthMenuOpen } from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import SelectTitles from "@/features/selectTitles/ui/SelectTitles";
import clsx from "clsx";
import { setHeaderHeight } from "../Model/slice";

export function Header() {
    const dispatch = useDispatch();

    // ИСПРАВЛЕНИЕ: Добавили защиту от undefined, если в store редюсер еще не инициализировался
    const headerHeight = useSelector((state: any) => state.header?.headerHeight ?? 0);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        // ResizeObserver сам отлично реагирует на изменение размеров окна браузера
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const height = entry.target.getBoundingClientRect().height;
                dispatch(setHeaderHeight(height));
            }
        });

        resizeObserver.observe(header);

        return () => {
            resizeObserver.disconnect();
        };
    }, [dispatch]);

    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    const [selectModalCoords, setSelectModalCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const selectTriggerRef = useRef<HTMLDivElement>(null);

    function openSelectModal() {
        if (selectTriggerRef.current) {
            const rect = selectTriggerRef.current.getBoundingClientRect();

            setSelectModalCoords({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left,
            });
        }
        setIsSelectModalOpen((prev) => !prev);
    }

    const isAuthMenuOpen = useSelector(selectIsAuthMenuOpen);
    const authButtonRef = useRef<HTMLButtonElement>(null);
    const [authModalCoords, setAuthModalCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

    const OpenAuthMenu = () => {
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();

            setAuthModalCoords({
                // ИСПРАВЛЕНИЕ: прибавляем scrollY, чтобы зафиксировать на странице
                top: rect.bottom + window.scrollY + 8,
                right: window.innerWidth - rect.right,
            });
        }
        if (isAuthMenuOpen) dispatch(closeAuthMenu());
        else dispatch(openAuthMenu());
    };
    const handleClose = () => dispatch(closeAuthMenu());

    return (
        <header className={styles.header} ref={headerRef} id="header">
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.logoWrapper}>
                        <Icon name="logo" className={styles.logo} />
                    </div>
                    <Icon name="yeahub" className={styles.logoYeahub} />
                    <div className={styles.titleGroup}>
                        <div className={styles.selectModalDesktop}>
                            <SelectTitles />
                        </div>

                        <div className={styles.titleWrapper} onClick={openSelectModal} ref={selectTriggerRef}>
                            <span className={styles.title}>
                                Подготовка
                            </span>
                            <ChevronDown
                                size={24}
                                className={clsx(styles.chevron, isSelectModalOpen && styles.open)}
                            />
                        </div>

                        <Modal
                            isOpen={isSelectModalOpen}
                            onClose={() => setIsSelectModalOpen(false)}
                            triggerRef={selectTriggerRef}
                            className={styles.selectModalMobile}
                            noCloseButton
                            data-no-scroll-lock
                            style={{
                                position: 'absolute', // ИСПРАВЛЕНО с 'fixed'
                                top: `${selectModalCoords.top}px`,
                                left: `${selectModalCoords.left}px`,
                                width: 'fit-content',
                                height: 'auto',
                                padding: 0,
                            }}
                        >
                            <SelectTitles />
                        </Modal>
                    </div>
                </div>

                <div className={styles.desktopAuth}>
                    <AuthActions />
                </div>

                <button className={styles.menuButton} onClick={OpenAuthMenu} ref={authButtonRef}>
                    <Menu size={23} className={styles.menuIcon} />
                </button>

                <Modal
                    isOpen={isAuthMenuOpen}
                    onClose={handleClose}
                    className={styles.mobileAuthModal}
                    noCloseButton
                    data-no-scroll-lock
                    triggerRef={authButtonRef}
                    style={{
                        position: 'absolute', // ИСПРАВЛЕНО с 'fixed'
                        top: `${authModalCoords.top}px`,
                        right: `${authModalCoords.right}px`,
                    }}
                >
                    <div className={styles.mobileModalContent}>
                        <AuthActions />
                    </div>
                </Modal>
            </div>
        </header>
    );
}
