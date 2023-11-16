import { createReducer, on } from '@ngrx/store';
import { addToCart, loadCart } from '../actions/cart_actions';

export interface CartState {
  cartItems: any[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { cartItem }) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(loadCart, (state) => ({
    ...state,
  }))
);
