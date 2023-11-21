import { createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart_reducer';

export const selectFeature = (state: CartState) => state.cartItems;
export const selectTotal = (state: CartState) => state.total;

export const cartSelector = createSelector(
  selectFeature,
  (state) => state.fill
);
export const selectGetTotal = createSelector(selectTotal, (state) => state);
