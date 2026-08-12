export interface Question {
    id: number;
    title: string;
    shortAnswer: string;
    rate: number;
    complexity: string;
}

export interface QuestionsResponse {
    data: Question[];
    total: number;
    limit: number;
}
