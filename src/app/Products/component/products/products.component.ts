import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { Product } from '../../model/product';
import { ProductsService } from '../../product_service/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productsList: Product[] = [];
  public itemNumber = 0;

  constructor(
    private productsApi: ProductsService,
    private cartService: CartService
  ) {}

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
  }
  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
