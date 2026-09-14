import { createSlice } from '@reduxjs/toolkit';

type HeaderState = {
    headerHeight: number | null;
};

const initialState: HeaderState = {
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
export const selectHeaderHeight = (state: { header: HeaderState }) => state.header.headerHeight ?? 0;
export default headerSlice.reducer;