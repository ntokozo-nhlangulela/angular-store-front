import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsComponent } from 'src/app/Products/component/products/products.component';
import { Product } from 'src/app/Products/model/product';
import { ProductsService } from 'src/app/Products/product_service/products.service';
import {
  emptyCart,
  removeCartItem
} from 'src/app/Store/Cart_Store/actions/cart_actions';
import { CartService } from '../../cart_service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartComponent, ProductsComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  public products$: Product[] = [];
  public finalPrice!: number;
  public itemNumber = 0;
  public id!: number;
  formattedTotal = '';

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private store: Store<{ carts: { cartItems: Product[] } }>,
    private route: Router
  ) {
    store.select('carts').subscribe((cartState: { cartItems: Product[] }) => {
      this.products$ = cartState.cartItems;
      console.log('state: ', this.products$);
    });
    console.log('state: ', this.products$);
  }

  ngOnInit(): void {
    console.log('Hwye');
    this.cartService.getProducts().subscribe((res) => {
      this.itemNumber = res.length;
      console.log(this.itemNumber);
    });
    //this.getTotal();
    //this.getTotalPrice();
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

  // private calculateFinalPrice(): void {
  //   if (this.products$.length != 0) {
  //     // Assuming each product has a 'price' property
  //     this.finalPrice = this.products$.reduce(
  //       (acc, product) => acc + (product.price || 0)
  //     );
  //     console.log('......', this.finalPrice);
  //   }
  // }

  getTotalPrice(product: any): string {
    this.finalPrice = this.finalPrice + product.total;
    console.log('Total ', this.finalPrice);
    return (this.formattedTotal = this.finalPrice.toFixed(2));
  }
}
