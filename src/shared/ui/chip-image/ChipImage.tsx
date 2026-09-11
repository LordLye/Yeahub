import { useState, useEffect } from 'react';

interface ChipImageProps {
    src: string | null | undefined;
    alt: string;
    fallback: React.ReactNode;
}

export function ChipImage({ src, alt, fallback }: ChipImageProps) {
    const [isError, setIsError] = useState(false);

    // Сбрасываем ошибку, если вдруг src изменился (например, при переключении страниц)
    useEffect(() => {
        setIsError(false);
    }, [src]);

    // Если src пустой или уже упал в ошибку — сразу показываем иконку, не рендеря тег <img>
    if (!src || isError) {
        return <>{fallback}</>;
    }

    return (
        <img 
            src={src} 
            alt={alt} 
            onError={() => setIsError(true)} 
        />
    );
}
