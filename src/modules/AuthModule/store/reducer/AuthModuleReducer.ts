import { createSlice } from '@reduxjs/toolkit';
import type { IAuthModuleState } from '../../interfaces/types.ts';
import { signInThunk } from '../thunk/AuthModuleThunk.ts';

const initialState: IAuthModuleState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authModuleSlice = createSlice({
  name: 'authModule',
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(signInThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });

    builder.addCase(signInThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Auth request failed';
    });
  },
});

export const { signOut } = authModuleSlice.actions;

export default authModuleSlice.reducer;
