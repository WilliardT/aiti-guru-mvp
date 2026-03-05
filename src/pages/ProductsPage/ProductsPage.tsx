import { type FC } from 'react';
import AppLayout from '@core/components/AppLayout/AppLayout.tsx';
import ProductsModule from '../../modules/ProductsModule/ProductsModule.tsx';


const ProductsPage: FC = () => {

  return (
    <AppLayout variant="top">
      <ProductsModule />
    </AppLayout>
  );
};

export default ProductsPage;
