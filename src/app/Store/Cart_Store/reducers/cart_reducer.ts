import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/Cart/model/cart';
import {
  addToCart,
  cartTotal,
  emptyCart,
  loadCart,
  removeCartItem
} from '../actions/cart_actions';

export interface CartState {
  cartItems: Cart[];
  total: string;
}

export const initialState: CartState = {
  cartItems: [],
  total: '',
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
  }),
  on(cartTotal, (state,{ total }) => {
    return {
      ...state,
      total: total,
    };
  })
);
