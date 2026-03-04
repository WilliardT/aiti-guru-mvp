import axios from 'axios';
import type {
  IProductsApiResponse,
  IProductsQueryParams,
} from '../interfaces/types.ts';
import { PRODUCTS_URL } from '../constants/constants.ts';


export const getProductsApi = async (
  params: IProductsQueryParams,
): Promise<IProductsApiResponse> => {
  const { search, ...restParams } = params;
  const query = search?.trim();

  const url = query
    ? `${PRODUCTS_URL}/search`
    : PRODUCTS_URL;

  try {
    const response = await axios.get<IProductsApiResponse>(url, {
      params: query
        ? {
          ...restParams,
          q: query,
        }
        : restParams,
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as { message?: string } | undefined)?.message;

      throw new Error(message ?? 'Не удалось загрузить товары');
    }

    throw new Error('Не удалось загрузить товары');
  }
};
