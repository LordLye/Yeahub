import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobileMenuOpen: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openAuthMenu: (state) => { state.isMobileMenuOpen = true; },
        closeAuthMenu: (state) => { state.isMobileMenuOpen = false; },
    },
});

export const { openAuthMenu, closeAuthMenu } = authSlice.actions;
export const selectIsAuthMenuOpen = (state: any) => state.auth.isMobileMenuOpen;
export default authSlice.reducer;
