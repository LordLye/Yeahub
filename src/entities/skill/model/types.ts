import type { ListQueryParams, PaginatedResponse } from '@/shared/api';

export interface Skill {
    id: number;
    title: string;
    imageSrc?: string;
}

export type SkillsQueryParams = ListQueryParams;
export type SkillsResponse = PaginatedResponse<Skill>;
