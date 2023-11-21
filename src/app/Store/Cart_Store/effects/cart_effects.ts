import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { loadCart } from '../actions/cart_actions';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCart),
      exhaustMap(() =>
        this.cartService
          .getProducts()
          .pipe(map((cartItems: any[]) => loadCart({ cartItems })))
      )
    );
  });
}
