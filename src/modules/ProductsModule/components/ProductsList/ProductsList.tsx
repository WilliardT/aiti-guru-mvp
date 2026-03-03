import { type FC } from 'react';
import ProductItem from './ProductItem/ProductItem.tsx';
import { demoProducts } from '../../sharedData/sharedData.ts';
import type { IProduct } from '../../interfaces/types.ts';
import styles from './ProductsList.module.scss';


const ProductsList: FC = () => {

  return (
    <div className={styles.list}>
      <div>
        <h1>Товары</h1>

        <div>
          {demoProducts.map((product: IProduct) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsList;
