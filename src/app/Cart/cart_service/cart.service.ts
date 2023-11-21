/* eslint-disable @ngrx/prefer-selector-in-select */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/Products/model/product';
import {
  addToCart,
  cartTotal
} from 'src/app/Store/Cart_Store/actions/cart_actions';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: Product[] = [];
  productList = new BehaviorSubject<any>([]);
  myBehaviorSubject = new BehaviorSubject<number>(0);
  finalTotal = 0;
  formattedTotal = '';
  cartTotalSubject = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: Product) {
    this.cartItemList.push(product);
    this.productList.next(product);
  }

  addToCart(cartItem: Product) {
    this.cartItemList.push(cartItem);
    this.productList.next(this.cartItemList);
    this.getTotalPrice(cartItem);
    this.store.dispatch(addToCart({ cartItem }));

    console.log(this.cartItemList);
  }

  getTotalPrice(product: Product): string {
    this.finalTotal = this.finalTotal + product.price;
    console.log('Total ', this.finalTotal);
    this.formattedTotal = this.finalTotal.toFixed(2);
    console.log('Formated ', this.formattedTotal);
    this.cartTotalSubject.next('Ntokozo');

    console.log('sho sho', this.cartTotalSubject.getValue());
    const total = this.formattedTotal;
    this.store.dispatch(cartTotal({ total }));
    this.store.complete();

    return (this.formattedTotal = this.finalTotal.toFixed(2));
  }

  getCartTotal(): string {
    return this.cartTotalSubject.value;
  }

  removeCartItem(id: number) {
    this.cartItemList.map((a: any, index: any) => {
      if (id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
