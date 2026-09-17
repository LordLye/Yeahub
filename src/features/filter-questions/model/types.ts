export type ActiveState = {
    status: string[];
    skills: string[];
    specializationId: string[];
    rate: string[];
    complexity: string[];
    titleOrDescription: string;
};

export type SearchParamsLike = {
    get: (name: string) => string | null;
    toString: () => string;
};
