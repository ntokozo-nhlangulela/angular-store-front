import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CartComponent } from './Cart/component/cart/cart.component';
import { ContactUs } from './ContactUs/model/contact-us';
import { NavBarComponent } from './Nav-bar/nav-bar/nav-bar.component';
import { ProductsComponent } from './Products/component/products/products.component';
import { CartEffects } from './Store/Cart_Store/effects/cart_effects';
import { cartReducer } from './Store/Cart_Store/reducers/cart_reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CartComponent,
    ContactUs,
    ProductsComponent,
    NavBarComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ carts: cartReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([CartEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
