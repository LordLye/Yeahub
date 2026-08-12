type FiltersModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

type ActiveState = {
	status: string[];
	skills: string[];
	specializationId: string[];
	rate: string[];
	complexity: string[];
};

type SearchParamsLike = {
	get: (name: string) => string | null;
	toString: () => string;
};

interface SpecializationItem {
	id: number;
	title: string;
}

interface SkillsItem {
	id: number;
	title: string;
}

export type { FiltersModalProps, ActiveState, SearchParamsLike, SpecializationItem, SkillsItem };