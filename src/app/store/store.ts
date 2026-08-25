import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../../shared/api/baseApi";
import { productFilterReducer } from "@/features/filter-questions";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        productFilter: productFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });
