import React from "react";
import styles from './SearchInput.module.scss';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder="Поиск по названию..."
                className={styles.input}
            />
        </div>
    );
}

