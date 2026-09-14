import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: typeof window !== "undefined" && window.location.hostname === "localhost"
            ? "https://api.yeatwork.ru" // Локально ходим напрямую (надеясь, что локально CORS не мешает или настроен)
            : "/api",                   // На Vercel ходим через прокси

    }),
    tagTypes: ["Question", "Skills", "Specializations"],
    endpoints: () => ({}),
});
