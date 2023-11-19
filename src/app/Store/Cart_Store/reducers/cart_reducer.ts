import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/Cart/model/cart';
import {
  addToCart,
  emptyCart,
  loadCart,
  removeCartItem
} from '../actions/cart_actions';

export interface CartState {
  cartItems: Cart[];
}

export const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(removeCartItem, (state, { id }) => ({
    ...state,
    cartItems: state.cartItems.filter((cartItem) => cartItem.id != id),
  })),
  on(addToCart, (state, { cartItem }) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(loadCart, (state) => ({
    ...state,
  })),
  on(emptyCart, (state) => {
    return {
      ...state,
      cartItems: [],
    };
  })
);
