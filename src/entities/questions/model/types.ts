export interface QuestionSkill {
    id: number;
    title: string;
}

export interface Question {
    id: number;
    title: string;
    shortAnswer: string;
    longAnswer?: string;
    description?: string;
    rate: number;
    complexity: string;
    questionSkills?: QuestionSkill[];
    keywords?: string[];
    createdBy?: { id: string; username: string };
}

export interface QuestionsResponse {
    data: Question[];
    total: number;
    limit: number;
}
