import type { ListQueryParams, PaginatedResponse } from '@/shared/api';

export interface Specialization {
    id: number;
    title: string;
}

export type SpecializationsQueryParams = ListQueryParams;
export type SpecializationsResponse = PaginatedResponse<Specialization>;
