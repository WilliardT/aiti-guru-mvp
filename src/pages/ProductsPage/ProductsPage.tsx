import { type FC } from 'react';
import ProductsModule from '../../modules/ProductsModule/ProductsModule.tsx';


const ProductsPage: FC = () => {

  return (
    <main className="appLayout appLayoutProducts">
      <ProductsModule />
    </main>
  );
};

export default ProductsPage;
