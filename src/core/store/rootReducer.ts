import AuthModuleReducer from '../../modules/AuthModule/store/reducer/AuthModuleReducer.ts';
import ProductsModuleReducer from '../../modules/ProductsModule/store/reducer/ProductsModuleReducer.ts';

const rootReducer = {
  authModule: AuthModuleReducer,
  productsModule: ProductsModuleReducer,
};

export { rootReducer };
