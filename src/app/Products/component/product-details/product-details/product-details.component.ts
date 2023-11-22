import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { Product } from 'src/app/Products/model/product';
import { ProductsService } from 'src/app/Products/product_service/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  routeSub: Subscription | undefined;
  product = new Product();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.getSingleProduct(productId).subscribe((res: any) => {
        this.product = res;
      });
    });
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }
}
