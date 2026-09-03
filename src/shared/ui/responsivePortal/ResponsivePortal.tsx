import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';

interface ResponsivePortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    [key: string]: any;
}

export function ResponsivePortal({ isOpen, onClose, children, style, ...rest }: ResponsivePortalProps) {
    const [isDesktop, setIsDesktop] = useState(false);
    // Новое состояние: определяем, является ли устройство мобильным (экран < 768px)
    const [isMobile, setIsMobile] = useState(false);
    const headerHeight = useSelector((state: any) => state.header?.headerHeight ?? 0);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width: 1024px)');
        const mobileQuery = window.matchMedia('(max-width: 767px)');

        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        const handleDesktopChange = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches);
            if (e.matches) document.body.style.overflow = "";
        };

        const handleMobileChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
            // Если ушли с мобильного разрешения, возвращаем скролл
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

    // 1. ДЕСКТОП: вставляем контент напрямую в aside страницы
    if (isDesktop) {
        const desktopSlot = document.getElementById('desktop-aside-slot');
        if (!desktopSlot) return null;
        return createPortal(children, desktopSlot);
    }

    // 2. МОБИЛКИ / ПЛАНШЕТЫ: оборачиваем в нативный Modal
    // Если это НЕ мобилка (то есть планшет), принудительно прокидываем data-no-scroll-lock
    const shouldDisableScrollLock = !isMobile;

    const portalStyle: React.CSSProperties = {
    ...style, // Берем базовые стили из HomePage (position, top, right, height)
    
    // Если это мобилка — жестко ограничиваем высоту экраном и включаем флекс
    ...(isMobile && {
        maxHeight: `calc(calc(100dvh - ${headerHeight}px))`, 
    }),
};

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            style={portalStyle}
            data-no-scroll-lock={shouldDisableScrollLock} 
            {...rest}
        >
            {children}
        </Modal>
    );
}
