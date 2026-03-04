import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IProductsApiResponse,
  IProductsModuleState,
} from '../../interfaces/types.ts';
import { getProductsThunk } from '../thunk/ProductsModuleThunk.ts';

const initialState: IProductsModuleState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
};

const productsModuleSlice = createSlice({
  name: 'productsModule',
  initialState,
  reducers: {},
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

export default productsModuleSlice.reducer;
