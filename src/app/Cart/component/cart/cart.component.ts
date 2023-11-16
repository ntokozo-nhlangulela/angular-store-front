import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsComponent } from 'src/app/Products/component/products/products.component';
import { ProductsService } from 'src/app/Products/product_service/products.service';
import { CartService } from '../../cart_service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartComponent, ProductsComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products$: any = [];
  public finalPrice!: string;
  public itemNumber = 0;

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private store: Store<{ carts: { cartItems: any[] } }>
  ) {
    store.select('carts').subscribe((cartState: { cartItems: any[] }) => {
      this.products$ = cartState.cartItems;
      console.log('state: ', this.products$);
    });
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.itemNumber = res.length;
      console.log(this.itemNumber);
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
