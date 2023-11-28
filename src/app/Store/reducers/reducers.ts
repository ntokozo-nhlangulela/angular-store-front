import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/Products/model/product';
import { getAllProductsComplete } from '../actions/actions';

export interface ApplicationState {
  cartItems: Product[];
  allProducts: Product[];
  categories: string[];
  selectedCategory: string;
  searchTerm: string;
}

export const initialState: ApplicationState = {
  cartItems: [],
  allProducts: [],
  categories: [],
  selectedCategory: 'default',
  searchTerm: '',
};

export const reducer = createReducer(
  initialState,
  on(getAllProductsComplete, (state, { products }) => ({
    ...state,
    allProducts: products,
  }))
);
