import { useState, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Modal } from '@/shared/ui/modal/Modal';
import { useSelector } from 'react-redux';

interface ResponsivePortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export function ResponsivePortal({ isOpen, onClose, children, style, className }: ResponsivePortalProps) {
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
    const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
    const headerHeight = useSelector((state: { header?: { headerHeight: number | null } }) => state.header?.headerHeight ?? 0);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width: 1024px)');
        const mobileQuery = window.matchMedia('(max-width: 767px)');

        const handleDesktopChange = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches);
            if (e.matches) document.body.style.overflow = "";
        };

        const handleMobileChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
            if (!e.matches) document.body.style.overflow = "";
        };

        desktopQuery.addEventListener('change', handleDesktopChange);
        mobileQuery.addEventListener('change', handleMobileChange);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopChange);
            mobileQuery.removeEventListener('change', handleMobileChange);
            document.body.style.overflow = "";
        };
    }, []);

    if (isDesktop) {
        return children;
    }

    const shouldDisableScrollLock = !isMobile;

    const portalStyle: CSSProperties = {
        ...style,

        ...(isMobile && {
            maxHeight: `calc(calc(100dvh - ${headerHeight}px))`,
        }),
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            style={portalStyle}
            className={className}
            noScrollLock={shouldDisableScrollLock}
        >
            {children}
        </Modal>
    );
}
