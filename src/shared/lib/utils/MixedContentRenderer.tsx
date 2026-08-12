import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MixedContentRendererProps {
  dbText: string;
}

export function MixedContentRenderer({ dbText }: MixedContentRendererProps) {
  const cleanHtml = useMemo(() => {
    if (!dbText) return '';

    // 1. Превращаем элементы ``` в HTML. 
    // Нативный HTML-код парсер пропустит «как есть».
    const rawHtml = marked.parse(dbText, { async: false }) as string;

    // 2. Очищаем от XSS-атак, обязательно разрешая атрибут class 
    // для сохранения классов подсветки (например, language-javascript)
    return DOMPurify.sanitize(rawHtml, {
      ADD_ATTR: ['class']
    });
  }, [dbText]);

  return (
    <div 
      className="mixed-content-body"
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}
