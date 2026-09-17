import { baseApi } from '@/shared/api';
import type { SpecializationsQueryParams, SpecializationsResponse } from '../model/types';

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<SpecializationsResponse, SpecializationsQueryParams>({
            query: (params) => ({
                url: '/specializations',
                method: 'GET',
                params,
            }),
            providesTags: ['Specializations'],
        }),
    }),
});

export const { useGetSpecializationsQuery, useLazyGetSpecializationsQuery } = specializationApi;
