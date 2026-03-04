import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IProductsApiResponse,
  IProductsModuleState,
  IProduct,
} from '../../interfaces/types.ts';
import { getProductsThunk } from '../thunk/ProductsModuleThunk.ts';

const initialState: IProductsModuleState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
  sortBy: null,
  sortOrder: null,
};

const productsModuleSlice = createSlice({
  name: 'productsModule',
  initialState,
  reducers: {
    setProductsSorting: (
      state,
      action: PayloadAction<{ sortBy: keyof IProduct | null; sortOrder: 'asc' | 'desc' | null }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getProductsThunk.fulfilled, (state, action: PayloadAction<IProductsApiResponse>) => {
      state.items = action.payload.products;
      state.total = action.payload.total;
      state.isLoading = false;
    });

    builder.addCase(getProductsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Не удалось загрузить товары';
    });
  },
});

export const {
  setProductsSorting,
} = productsModuleSlice.actions;

export default productsModuleSlice.reducer;
