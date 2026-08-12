import { baseApi } from '@/shared/api';
import type { SpecializationsResponse } from '../model/types';

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<SpecializationsResponse, void>({
            query: () => ({
                url: '/specializations',
                method: 'GET',
            }),
            providesTags: ['Specializations'],
        }),
    }),
});

export const { useGetSpecializationsQuery } = specializationApi;
