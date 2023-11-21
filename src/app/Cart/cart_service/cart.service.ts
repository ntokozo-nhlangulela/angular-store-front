import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/Products/model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: Product[] = [];
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

  setProduct(product: Product) {
    this.cartItemList.push(product);
    this.productList.next(product);
  }

  getTotalPrice(product: Product): string {
    this.finalTotal = this.finalTotal + product.price;
    console.log('Total ', this.finalTotal);
    return (this.formattedTotal = this.finalTotal.toFixed(2));
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
