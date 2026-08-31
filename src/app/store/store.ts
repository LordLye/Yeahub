import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../../shared/api/baseApi";
import { productFilterReducer } from "@/features/filter-questions";
import { authReducer } from "@/features/auth";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        productFilter: productFilterReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });
