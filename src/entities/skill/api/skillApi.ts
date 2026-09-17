import { baseApi } from '@/shared/api';
import type { SkillsQueryParams, SkillsResponse } from '../model/types';

export const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<SkillsResponse, SkillsQueryParams>({
            query: (params) => ({
                url: '/skills',
                method: 'GET',
                params,
            }),
            providesTags: ['Skills'],
        }),
    }),
});

export const { useGetSkillsQuery, useLazyGetSkillsQuery } = skillApi;
