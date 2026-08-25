// shared/ui/ResponsivePortal.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '@/shared/ui/Modal'; // Ваш Modal с тегом <dialog>

interface ResponsivePortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function ResponsivePortal({ isOpen, onClose, children }: ResponsivePortalProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        setIsDesktop(mediaQuery.matches);

        const handleScreenChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mediaQuery.addEventListener('change', handleScreenChange);
        return () => mediaQuery.removeEventListener('change', handleScreenChange);
    }, []);

    // 1. ДЕСКТОП: вставляем контент напрямую в aside страницы
    if (isDesktop) {
        const desktopSlot = document.getElementById('desktop-aside-slot');
        if (!desktopSlot) return null;
        return createPortal(children, desktopSlot);
    }

    // 2. МОБИЛКИ/ПЛАНШЕТЫ: оборачиваем в нативный Modal
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {children}
        </Modal>
    );
}
