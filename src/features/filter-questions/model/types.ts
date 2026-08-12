export type FiltersModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

export type ActiveState = {
    status: string[];
    skills: string[];
    specializationId: string[];
    rate: string[];
    complexity: string[];
};

export type SearchParamsLike = {
    get: (name: string) => string | null;
    toString: () => string;
};
