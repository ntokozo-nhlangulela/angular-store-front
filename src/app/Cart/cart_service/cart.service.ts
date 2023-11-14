import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/Products/model/product';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: Cart[] = [];
  productList = new BehaviorSubject<Product[]>([]);
  myBehaviorSubject = new BehaviorSubject<number>(0);
  finalTotal = 0;
  formattedTotal = '';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: Product[]) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(cartItem: Cart) {
    this.cartItemList.push(cartItem);
    this.productList.next(this.cartItemList);
    this.getTotalPrice(cartItem);

    console.log(this.cartItemList);
  }

  getTotalPrice(product: any): string {
    this.finalTotal = this.finalTotal + product.total;
    console.log('Total ', this.finalTotal);
    return (this.formattedTotal = this.finalTotal.toFixed(2));
  }

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
