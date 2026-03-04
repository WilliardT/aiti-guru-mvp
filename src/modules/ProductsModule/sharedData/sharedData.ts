import type { IProduct } from '../interfaces/types.ts';

export const demoProducts: IProduct[] = [
  {
    id: 1,
    title: 'Ноутбук',
    price: 79999,
    rating: 4.7,
    brand: 'Demo',
    category: 'Ноутбуки',
    thumbnail: 'https://dummyjson.com/image/200x200?text=Laptop',
    sku: 'DEMO-1',
  },
  {
    id: 2,
    title: 'Наушники',
    price: 9999,
    rating: 4.4,
    brand: 'Demo',
    category: 'Аксессуары',
    thumbnail: 'https://dummyjson.com/image/200x200?text=Headphones',
    sku: 'DEMO-2',
  },
  {
    id: 3,
    title: 'Клавиатура',
    price: 5999,
    rating: 4.1,
    brand: 'Demo',
    category: 'Аксессуары',
    thumbnail: 'https://dummyjson.com/image/200x200?text=Keyboard',
    sku: 'DEMO-3',
  },
];
