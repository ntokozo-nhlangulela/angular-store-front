import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { Cart } from 'src/app/Cart/model/cart';
import { addToCart } from 'src/app/Store/Cart_Store/actions/cart_actions';
import { Product } from '../../model/product';
import { ProductsService } from '../../product_service/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductsComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productsList: Product[] = [];
  public itemNumber = 0;
  public products: any = [];
  currentCartItems: Cart[] = [];
  //allSkills$: Observable<ISkill[]>;

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private store: Store<{ carts: { cartItems: any[] } }>
  ) {
    store.select('carts').subscribe((cartState: { cartItems: any[] }) => {
      this.products = cartState.cartItems;
      console.log('state: ', this.products);
    });
  }

  ngOnInit(): void {
   // const mylist = this.store.dispatch(loadCart(CartItems));
    //console.log(mylist);
    this.productsApi.getAllProducts().subscribe((res) => {
      this.productsList = res;

      this.productsList.map((a: Product) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });

      this.cartService.getProducts().subscribe((res) => {
        this.itemNumber = res.length;
        console.log(this.itemNumber);
      });
    });
  }

  addToCart(cartItem: Product) {
    // const existingItem = this.productsList;
    // if (cartItem.id == cartItem.id) {
    //   cartItem.quantity = cartItem.quantity++;
    // } else {
    //   this.store.dispatch(addToCart({ cartItem }));
    // }
    // const existingItem = this.currentCartItems.find(
    //   (item) => item.id === cartItem.id
    // );
    // if (existingItem) {
    //   existingItem.quantity = existingItem.quantity + 1;
    //   this.store.dispatch(updateCartItem({ existingItem }));
    // } else {
    //   this.store.dispatch(addToCart({ cartItem }));
    // }
    this.store.dispatch(addToCart({ cartItem }));
  }
}
