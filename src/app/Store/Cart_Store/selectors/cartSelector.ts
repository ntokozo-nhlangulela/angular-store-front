import { CartState } from '../reducers/cart_reducer';

export const selectFeature = (state: CartState) => state.cartItems;
