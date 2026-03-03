export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface IProductsModuleState {
  items: IProduct[];
  isLoading: boolean;
}
