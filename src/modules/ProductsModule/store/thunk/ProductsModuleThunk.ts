import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsModuleTypes } from './ActionTypes.ts';

export const getProductsThunk = createAsyncThunk(
  ProductsModuleTypes.GET_PRODUCTS,
  async () => {
    return [];
  },
);
