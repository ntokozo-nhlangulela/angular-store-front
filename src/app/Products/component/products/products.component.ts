import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { Cart } from 'src/app/Cart/model/cart';
import { removeCartItem } from 'src/app/Store/Cart_Store/actions/cart_actions';
import { Product } from '../../model/product';
import { ProductsService } from '../../product_service/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, ProductsComponent],
})
export class ProductsComponent implements OnInit {
  public productsList: Product[] = [];
  public itemNumber = 0;
  public products: Product[] = [];
  currentCartItems: Cart[] = [];
  @Input() item!: Product;
  categories: string[] = [];
  selectedCategory: string | null = null;
  @ViewChild('categoriesList') categoriesList!: ElementRef;
  filteredproductList: Product[] = [];
  searchinput = '';
  finalTotal = 0;
  formattedTotal = '';

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private store: Store<{ carts: { cartItems: Product[] } }>
  ) {
    store.select('carts').subscribe((cartState: { cartItems: Product[] }) => {
      this.products = cartState.cartItems;
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
      });
    });

    this.productsApi.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.productsApi.getAllProducts().subscribe((products) => {
      this.productsList = products;
      this.filteredproductList = this.productsList;
    });
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
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
