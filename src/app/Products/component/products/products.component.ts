import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  public productsList: any;
  public itemNumber = 0;
  public users: any;

  constructor(private productsApi: ProductsService) {}

  ngOnInit(): void {
    this.productsApi.getAllProducts().subscribe((res) => {
      this.productsList = res;

      this.productsList.map((a: Product) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }
}
