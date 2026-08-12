import { baseApi } from "@/shared/api";

export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<any, Record<string, string>>({
            query: (params) => ({
                url: "/questions/public-questions",
                method: "GET",
                params,
            }),
            providesTags: ["Question"],
        }),
    }),
});

export const { useGetQuestionsQuery } = questionApi;
