import { useEffect, useRef } from "react";
import type { CSSProperties, DialogHTMLAttributes, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';
import clsx from "clsx";
import { CircleX } from "lucide-react";

interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onClose'> {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    noCloseButton?: boolean;
    triggerRef?: RefObject<HTMLElement | null>;
    noScrollLock?: boolean;
}

export function Modal({ isOpen, onClose, children, className, style, noCloseButton, triggerRef, noScrollLock, ...rest }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) dialog.show();

            if (!noScrollLock) {
                document.body.style.overflow = "hidden";
            }
        } else {
            if (dialog.open) dialog.close();
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, noScrollLock]);


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
