import {Product} from './Product';
import {Bill} from './Bill';

export interface ProductItem{
  id: number;
  price: number;
  quantity: number;
  productID: number;
  product: Product;
  bill: Bill | undefined | string;
}
