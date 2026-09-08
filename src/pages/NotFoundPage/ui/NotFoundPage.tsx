import styled from './NotFoundPage.module.scss'

export function NotFoundPage() {
    return (
        <section className={styled.page}>
            <h1 className={styled.title}>404</h1>
            <p className={styled.text}>Страница не найдена</p>
        </section>
    );
}
