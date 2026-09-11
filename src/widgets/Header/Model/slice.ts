import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerHeight: null,
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderHeight: (state, action) => { state.headerHeight = action.payload; },
    },
});

export const { setHeaderHeight } = headerSlice.actions;
export const selectHeaderHeight = (state: any) => state.header.headerHeight;
export default headerSlice.reducer;