import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
    isMobileMenuOpen: boolean;
};

const initialState: AuthState = {
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
export const selectIsAuthMenuOpen = (state: { auth: AuthState }) => state.auth.isMobileMenuOpen;
export default authSlice.reducer;
