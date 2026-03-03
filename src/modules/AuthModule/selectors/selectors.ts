import type { RootState } from '../../../core/store/rootStore.ts';

export const selectIsAuthenticated = (state: RootState) => state.authModule.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.authModule.isLoading;
