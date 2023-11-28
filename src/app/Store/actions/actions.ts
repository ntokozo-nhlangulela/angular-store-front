import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/Products/model/product';

export const getAllProducts = createAction('Get All Products');
export const getAllProductsComplete = createAction(
  'Get All Products Complete',
  props<{ products: Product[] }>()
);
