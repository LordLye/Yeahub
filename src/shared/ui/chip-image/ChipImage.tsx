import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from './ChipImage.module.scss';

interface ChipImageProps {
    src: string | null | undefined;
    alt: string;
    fallback: ReactNode;
}

export function ChipImage({ src, alt, fallback }: ChipImageProps) {
    const [errorSrc, setErrorSrc] = useState<string | null>(null);
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
    const hasSrc = Boolean(src && src.trim());
    const isError = !hasSrc || errorSrc === src;
    const isLoaded = hasSrc && loadedSrc === src;

    if (isError) {
        return <>{fallback}</>;
    }

    return (
        <>
            {!isLoaded && fallback}
            <img
                src={src}
                alt={alt}
                width={28}
                height={28}
                className={isLoaded ? styles.image : `${styles.image} ${styles.imageHidden}`}
                onLoad={() => setLoadedSrc(src)}
                onError={() => setErrorSrc(src)}
            />
        </>
    );
}
