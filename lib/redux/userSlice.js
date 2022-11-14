import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        role: (state, action) => {
            state.role = action.payload;
        },
        updateProfile: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
        }
    }
});

export const { login, logout, role, updateProfile } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectRole = (state) => state.user.role;

export default userSlice.reducer;