import {ProductItem} from './ProductItem';
import {Costumer} from './Costumer';

export interface Bill{
  id: number;
  billingDate: Date;
  costumerID: number;
  productItems: ProductItem[];
  costumer: Costumer | undefined;
}
