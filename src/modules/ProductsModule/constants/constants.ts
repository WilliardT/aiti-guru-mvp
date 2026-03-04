export const ProductsModuleConstants = {
  MODULE_NAME: 'ProductsModule',
} as const;

// вынести в общий http или в ENV
export const PRODUCTS_URL = 'https://dummyjson.com/products';
export const PRODUCTS_PAGE_SIZE = 20;
export const PRODUCTS_SEARCH_DEBOUNCE_MS = 350;
