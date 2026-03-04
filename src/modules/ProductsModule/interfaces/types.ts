export interface IProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  sku?: string;
}

export interface IProductsApiResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductsQueryParams {
  limit: number;
  skip: number;
  search?: string;
}

export interface IProductsModuleState {
  items: IProduct[];
  isLoading: boolean;
  error: string | null;
  total: number;
}

