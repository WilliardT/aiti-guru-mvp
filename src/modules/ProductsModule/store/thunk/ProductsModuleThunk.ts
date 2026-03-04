import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsModuleTypes } from './ActionTypes.ts';
import { getProductsApi } from '../../api/productsModuleApi.ts';
import type {
  IProductsApiResponse,
  IProductsQueryParams,
} from '../../interfaces/types.ts';


export const getProductsThunk = createAsyncThunk<
  IProductsApiResponse,
  IProductsQueryParams,
  { rejectValue: string }
>(
  ProductsModuleTypes.GET_PRODUCTS,
  async (params, { rejectWithValue }) => {
    try {
      const productsData = await getProductsApi(params);

      return productsData;

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Не удалось загрузить товары';

      return rejectWithValue(message);
    }
  },
);
