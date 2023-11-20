import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { Cart } from 'src/app/Cart/model/cart';
import {
  addToCart,
  removeCartItem
} from 'src/app/Store/Cart_Store/actions/cart_actions';
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
  @Input() item!: Product;
  categories: string[] = [];
  selectedCategory: string | null = null;
  @ViewChild('categoriesList') categoriesList!: ElementRef;
  filteredproductList: Product[] = [];
  searchinput = '';

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private router: Router,
    private store: Store<{ carts: { cartItems: any[] } }>
  ) {
    store.select('carts').subscribe((cartState: { cartItems: any[] }) => {
      this.products = cartState.cartItems;
      console.log('state: ', this.products);
    });
  }

  ngOnInit(): void {
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

    this.productsApi.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    console.log(this.categories);
    this.productsApi.getAllProducts().subscribe((products) => {
      this.productsList = products;
      this.filteredproductList = this.productsList;
      console.log(this.productsList);
    });
  }

  addToCart(cartItem: Product) {
    this.store.dispatch(addToCart({ cartItem }));
  }

  removeCartItem(id: number): void {
    this.store.dispatch(removeCartItem({ id }));
  }

  gotoDetails(id: number) {
    this.router.navigate([`/details/${id}`]);
  }

  onSearchChange() {
    const searchTerm = this.searchinput.toLowerCase();
    console.log(searchTerm);
    if (searchTerm === '') {
      this.filteredproductList = this.productsList;
    } else {
      this.filteredproductList = this.productsList.filter(
        (product) =>
          (this.selectedCategory === null ||
            product.category === this.selectedCategory) &&
          (product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm))
      );
    }
  }

  onSelected(): void {
    this.selectedCategory = this.categoriesList.nativeElement.value;
    if (this.selectedCategory === 'default') {
      this.filteredproductList = this.productsList;
    } else {
      this.filteredproductList = this.productsList.filter(
        (x) => x.category === this.selectedCategory
      );
    }
  }
}
