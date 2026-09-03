import React from "react";
import styles from './SearchInput.module.scss';
import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className={styles.wrapper}>
            <Search width={20} height={20} className={styles.searchIcon} />
            <input
                type="text"
                name="titleOrDescription"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder="Поиск по названию..."
                className={styles.input}
            />
        </div>
    );
}

