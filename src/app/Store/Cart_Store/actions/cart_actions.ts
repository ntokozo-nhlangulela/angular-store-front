import { createAction, props } from '@ngrx/store';

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
