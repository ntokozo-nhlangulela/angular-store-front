import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/Products/model/product';

export const loadCart = createAction(
  '[CartItems] Load cart items',
  props<{ cartItems: any[] }>()
);

export const addToCart = createAction(
  '[CartItems] Add to Cart',
  props<{ cartItem: any }>()
);

export const removeCartItem = createAction(
  '[CartItems] Remove Cart Item',
  props<{ id: number }>()
);

//update => updating quantity for a specific item
export const updateCartItem = createAction(
  '[CartItems] Update Cart Item',
  props<{ existingItem: any }>()
);

export const emptyCart = createAction(
  '[CartItems] Empty Cart',
  props<{ cartItems: Product[] }>()
);

export const cartTotal = createAction(
  '[CartItems] Total Cart',
  props<{ total: any }>()
);
