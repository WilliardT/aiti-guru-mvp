import { type FC } from 'react';
import type { IProduct } from '../../../interfaces/types.ts';
import { formatPrice } from '../../../helpers/helpersInputs.ts';
import styles from './ProductItem.module.scss';


const ProductItem: FC<{
  product: IProduct;
}> = ({
  product
}) => {

  return (
    <div className={styles.item}>
      <h3>{product.title}</h3>
      <p>{formatPrice(product.price)}</p>
    </div>
  );
};

export default ProductItem;
