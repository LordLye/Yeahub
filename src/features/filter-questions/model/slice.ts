import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
    isFilterOpen: boolean;
};

const initialState: initialStateType = {
    isFilterOpen: false,
};

export const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState,
    reducers: {
        openMobileFilters: (state) => {
            state.isFilterOpen = true;
        },
        closeMobileFilters: (state) => {
            state.isFilterOpen = false;
        },
        toggleMobileFilters: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        },
    },
});

export const { openMobileFilters, closeMobileFilters, toggleMobileFilters } = productFilterSlice.actions;

export const selectIsFilterOpen = (state: { productFilter: initialStateType }) => state.productFilter.isFilterOpen;

export default productFilterSlice.reducer;
