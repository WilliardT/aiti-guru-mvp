import type { RootState } from '../../../core/store/rootStore.ts';

export const selectProducts = (state: RootState) => state.productsModule.items;
export const selectProductsLoading = (state: RootState) => state.productsModule.isLoading;
export const selectProductsError = (state: RootState) => state.productsModule.error;
export const selectProductsTotal = (state: RootState) => state.productsModule.total;
