/* eslint-disable @ngrx/prefer-selector-in-select */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsComponent } from 'src/app/Products/component/products/products.component';
import { Product } from 'src/app/Products/model/product';
import { ProductsService } from 'src/app/Products/product_service/products.service';
import {
  emptyCart,
  removeCartItem
} from 'src/app/Store/Cart_Store/actions/cart_actions';
import { NavBarComponent } from '../../../Nav-bar/nav-bar/nav-bar.component';
import { CartService } from '../../cart_service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, CartComponent, ProductsComponent, NavBarComponent],
})
export class CartComponent implements OnInit, AfterViewInit {
  public products$: Product[] = [];
  public finalPrice!: string;
  public itemNumber = 0;
  public id!: number;
  cartTotal$: Observable<string>;

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private store: Store<{ carts: { cartItems: Product[]; total: '' } }>,
    private route: Router
  ) {
    store.select('carts').subscribe((cartState: { cartItems: Product[] }) => {
      this.products$ = cartState.cartItems;
      console.log('state: ', this.products$);
    });
  }

  ngOnInit(): void {
    console.log('Hwye');
    this.cartService.getProducts().subscribe((res) => {
      this.itemNumber = res.length;
      console.log(this.itemNumber);
    });

    // this.cartService.getCartTotal().subscribe((x) => {
    //   console.log('Cart component click', x);
    //   this.finalPrice = x;
    // });

    console.log('Cart component click', this.cartService.getCartTotal());

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select('carts').subscribe((x) => {
      console.log('State', x.total);
      this.finalPrice = x.total;
    });

    //this.finalPrice = this.cartService.getTotalPrice(item);
    //  console.log('Checking Total', this.finalPrice);
  }

  ngAfterViewInit(): void {
    console.log(this.products$);
  }

  emptyCart() {
    this.products$ = [];
    this.store.dispatch(emptyCart({ cartItems: this.products$ }));
  }

  removeCartItem(id: number): void {
    const x = this.products$.find((x) => x.id === id);
    console.log('Checking X ', x);
    this.products$.forEach((element, index) => {
      if (element.id === x?.id) {
        this.products$.slice(index, index);
      }
    });
    this.store.dispatch(removeCartItem({ id }));
  }

  goToProducts() {
    this.route.navigateByUrl('/products');
  }
}
