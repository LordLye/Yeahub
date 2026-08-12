import { baseApi } from '@/shared/api';
import type { SkillsResponse } from '../model/types';

export const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<SkillsResponse, void>({
            query: () => ({
                url: '/skills',
                method: 'GET',
            }),
            providesTags: ['Skills'],
        }),
    }),
});

export const { useGetSkillsQuery } = skillApi;
