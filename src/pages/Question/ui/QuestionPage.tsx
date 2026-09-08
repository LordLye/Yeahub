import { useParams } from 'react-router-dom';
import styles from './QuestionPage.module.scss';

export function QuestionPage() {
    const { id } = useParams<{ id: string }>();

    if (!id || id === 'undefined') {
        return <div>Ошибка: Вопрос не найден или указан некорректный ID</div>;
    }

    return (
        <section>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Question Page</h1>
            </div>
        </section>
    );
}
