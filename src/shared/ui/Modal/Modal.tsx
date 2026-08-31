import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';
import clsx from "clsx";

export function Modal({ isOpen, onClose, children, className, style, noCloseButton, ...rest}: { isOpen: boolean; onClose: () => void; children: React.ReactNode, className?: string, style?: React.CSSProperties, noCloseButton?: boolean, [key: string]: any }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        
        const isScrollLockDisabled = dialog.hasAttribute('data-no-scroll-lock');

        if (isOpen) {
            dialog.showModal();
            if (!isScrollLockDisabled) {
                document.body.style.overflow = "hidden";
            }
        } else {
            dialog.close();
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className={clsx(styles.dialog, className)}
            style={style}
            onClose={onClose}
            onCancel={onClose}
            onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const isInDialog =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;
                if (!isInDialog) onClose();
            }}
            {...rest}
        >
            {!noCloseButton && (
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>
            )}
            {children}
        </dialog>,
        document.body
    );
}
