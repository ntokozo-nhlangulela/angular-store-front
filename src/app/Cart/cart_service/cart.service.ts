import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: any = [];
  productList = new BehaviorSubject<any>([]);
  myBehaviorSubject = new BehaviorSubject<number>(0);
  finalTotal = 0;
  formattedTotal = '';
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(cartItem: any) {
    this.cartItemList.push(cartItem);
    this.productList.next(this.cartItemList);
    this.getTotalPrice(cartItem);
    //this.store.dispatch(addToCart({ cartItem }));

    //console.log(this.cartItemList);
  }

  getTotalPrice(product: any): string {
    this.finalTotal = this.finalTotal + product.total;
    console.log('Total ', this.finalTotal);
    return (this.formattedTotal = this.finalTotal.toFixed(2));
  }
  // login(username: string, password: string) {
  //   // Send a POST request to the FakeStore API for authentication
  //   return this.http.post(this.apiUrl, { username, password });
  // }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
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
