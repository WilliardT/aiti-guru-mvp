import { type FC } from 'react';
import styles from './ProductsModule.module.scss';
import ProductsList from './components/ProductsList/ProductsList.tsx';

const ProductsModule: FC = () => {

  return (
    <section className={styles.productsModule}>
      <ProductsList />
    </section>
  );
};

export default ProductsModule;
