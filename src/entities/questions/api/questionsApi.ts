import { baseApi } from "@/shared/api";
import type { Question, QuestionsResponse } from "../model/types";

export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<QuestionsResponse, Record<string, string>>({
            query: (params) => ({
                url: "/questions/public-questions",
                method: "GET",
                params,
            }),
            providesTags: ["Question"],
        }),
        getQuestionById: builder.query<Question, number>({
            query: (id) => ({
                url: `/questions/public-questions/${id}`,
                method: "GET",
            }),
            providesTags: ["Question"],
        })
    }),
});

export const { useGetQuestionsQuery, useGetQuestionByIdQuery } = questionApi;
