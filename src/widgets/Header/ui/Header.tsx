import { Menu, ChevronDown } from "lucide-react";
import { Icon } from '@/shared/ui/Icon';
import { useState } from "react";
import { FiltersModal } from "@/features/filter-questions";
import styles from './Header.module.scss';



export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Icon name="logo" className={styles.logo} />
                <div className={styles.titleGroup}>
                    <span className={styles.title}>
                        Подготовка
                    </span>
                    <ChevronDown size={18} className={styles.chevron} />
                </div>
            </div>

            <button className={styles.menuButton} onClick={openModal}>
                <Menu size={22} className={styles.menuIcon} />
            </button>

            { isOpen && <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    );
}
