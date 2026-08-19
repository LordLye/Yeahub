import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';

export function Modal({isOpen, onClose, children}: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen) {
            dialog.showModal();
            document.body.style.overflow = "hidden";
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
            className={styles.dialog}
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
        >
            <button className={styles.closeButton} onClick={onClose}>
                <X size={20} />
            </button>
            {children}
        </dialog>,
        document.body
    );
}
