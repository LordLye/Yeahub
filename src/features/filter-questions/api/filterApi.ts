import { baseApi } from "@/shared/api";

type FilterListResponse<T> = {
    data: T[];
};

export const filterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<FilterListResponse<{ id: number; title: string }>, void>({
            query: () => ({
                url: "/skills",
                method: "GET",
            }),
            providesTags: ["Skills"],
        }),
        getSpecializations: builder.query<FilterListResponse<{ id: number; title: string }>, void>({
            query: () => ({
                url: "/specializations",
                method: "GET",
            }),
            providesTags: ["Specializations"],
        }),
    }),
});

export const { useGetSkillsQuery, useGetSpecializationsQuery } = filterApi;