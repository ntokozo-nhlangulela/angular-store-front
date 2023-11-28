import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/Products/model/product';
import { ApplicationState } from '../reducers/reducers';

export const selectFeature = (state: { appState: ApplicationState }) =>
  state.appState;

export const selectAllProducts = createSelector(
  selectFeature,
  (state: ApplicationState) => state.allProducts
);

export const selectCartItems = createSelector(
  selectFeature,
  (state: ApplicationState) => state.cartItems
);

export const selectTotalCartPrice = createSelector(
  selectCartItems,
  (cartItems: Product[]) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.quantity * item.price;
    }

    return total;
  }
);
