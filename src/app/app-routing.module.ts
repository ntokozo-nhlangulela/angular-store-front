import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Cart/component/cart/cart.component';
import { ProductDetailsComponent } from './Products/component/product-details/product-details/product-details.component';
import { ProductsComponent } from './Products/component/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  { path: 'details/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
