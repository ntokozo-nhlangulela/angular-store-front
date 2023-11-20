import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Products/model/product';
import { ProductsService } from 'src/app/Products/product_service/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  routeSub: Subscription | undefined;
  product = new Product();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
      const productId = params['id'];
      this.productService.getSingleProduct(productId).subscribe((res: any) => {
        this.product = res;
        console.log('Single Product', this.product);
      });
    });
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }
}
