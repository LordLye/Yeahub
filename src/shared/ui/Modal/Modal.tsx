import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';
import clsx from "clsx";
import { CircleX } from "lucide-react";

export function Modal({ isOpen, onClose, children, className, style, noCloseButton, triggerRef, ...rest }: { isOpen: boolean; onClose: () => void; children: React.ReactNode, className?: string, style?: React.CSSProperties, noCloseButton?: boolean, triggerRef?: React.RefObject<HTMLElement | null>, [key: string]: any }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // ИСПРАВЛЕНИЕ: Явно проверяем проп, который пришел из React, приводя его к boolean.
    // Если там undefined или false, то scrollLockDisabled будет строго false.
    const isScrollLockDisabled = Boolean(rest['data-no-scroll-lock']);

    if (isOpen) {
        if (!dialog.open) dialog.show(); 
        
        // Если блокировка НЕ отключена — убираем скролл
        if (!isScrollLockDisabled) {
            document.body.style.overflow = "hidden";
        }
    } else {
        if (dialog.open) dialog.close();
        document.body.style.overflow = "";
    }

    return () => {
        document.body.style.overflow = "";
    };
}, [isOpen, rest['data-no-scroll-lock']]);


    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const dialog = dialogRef.current;
            const target = event.target as HTMLElement;

            const isClickOnTrigger = triggerRef?.current?.contains(target);

            if (dialog && !dialog.contains(target) && !isClickOnTrigger) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className={clsx(styles.dialog, className)}
            style={style}
            onClose={onClose}
            onCancel={(e) => {
                e.preventDefault();
                onClose();
            }}
            {...rest}
        >
            {!noCloseButton && (
                <button className={styles.closeButton} onClick={onClose} type="button">
                    <CircleX size={20} />
                </button>
            )}
            {children}
        </dialog>,
        document.body
    );
}
