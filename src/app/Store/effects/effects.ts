import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/Products/product_service/products.service';
import { getAllProducts, getAllProductsComplete } from '../actions/actions';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllProducts),
      switchMap(() =>
        this.productService
          .getAllProducts()
          .pipe(map((result) => getAllProductsComplete({ products: result })))
      )
    );
  });
}
