import { Icon } from '@/shared/ui/icon';
import styled from './QuestionHeaderCard.module.scss'
import questionImage from "@/shared/assets/images/questionImage.png";

export function QuestionHeaderCard({ question, isOpenInfo }: { question: any; isOpenInfo: any; }) {
    if (!question) return null;

    const handleInfoButtonClick = () => {
        isOpenInfo(true);
    };

    return (
        <section className={styled.card}>
            <img className={styled.image} src={questionImage} alt="3D-логотип Figma из разноцветных объемных фигур на светлом фоне" />
            <div className={styled.content}>
                <div className={styled.TitleContainer}>
                    <h1 className={styled.title}>{question.title}</h1>
                    <button className={styled.infoButton} type="button" onClick={handleInfoButtonClick}>
                        <Icon className={styled.icon} name="infoMenu" width={22} height={22} />
                    </button>
                </div>
                <p className={styled.description}>{question.description}</p>
            </div>
        </section>
    );
}
