import { useState, useEffect } from 'react';

interface ChipImageProps {
    src: string | null | undefined;
    alt: string;
    fallback: React.ReactNode;
}

export function ChipImage({ src, alt, fallback }: ChipImageProps) {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
    }, [src]);

    if (!src || src.trim() === '') {
        return <>{fallback}</>;
    }

    if (isError) {
        return <>{fallback}</>;
    }

    return (
        <>
            <img
                src={src}
                alt={alt}
                width={28}
                height={28}
                style={{ display: 'none' }}
                onError={() => setIsError(true)}
            />
            {fallback}
        </>
    );
}
