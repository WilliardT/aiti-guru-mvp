import { createSlice } from '@reduxjs/toolkit';
import type { IProduct, IProductsModuleState } from '../../interfaces/types.ts';
import { getProductsThunk } from '../thunk/ProductsModuleThunk.ts';

const initialState: IProductsModuleState = {
  items: [],
  isLoading: false,
};

const productsModuleSlice = createSlice({
  name: 'productsModule',
  initialState,
  reducers: {
    setProducts: (state, action: { payload: IProduct[] }) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProductsThunk.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProductsThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setProducts } = productsModuleSlice.actions;

export default productsModuleSlice.reducer;
