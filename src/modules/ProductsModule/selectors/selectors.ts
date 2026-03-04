import type { RootState } from '@core/store/rootStore.ts';
import { IProduct } from "@modules/ProductsModule/interfaces/types.ts";

export const selectProducts =
  (state: RootState): IProduct[] => state.productsModule.items;

export const selectProductsLoading =
  (state: RootState): boolean => state.productsModule.isLoading;

export const selectProductsError =
  (state: RootState): string | null => state.productsModule.error;

export const selectProductsTotal =
  (state: RootState): number => state.productsModule.total;

export const selectProductsSortBy =
  (state: RootState): keyof IProduct | null => state.productsModule.sortBy;

export const selectProductsSortOrder =
  (state: RootState): 'asc' | 'desc' | null => state.productsModule.sortOrder;
