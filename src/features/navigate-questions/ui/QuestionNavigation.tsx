import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from './QuestionNavigation.module.scss'

export function QuestionNavigation() {
    return (
        <section className={styled.container}>
            <button className={styled.button}>
                <ChevronLeft className={styled.icon}/>
                <span className={styled.text}>Предыдущий</span>
            </button>
            
            <button className={styled.button}>
                <span className={styled.text}>Следующий</span>
                <ChevronRight className={styled.icon}/>
            </button>
        </section>
    );
}
