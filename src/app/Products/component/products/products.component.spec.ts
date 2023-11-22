import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CartService } from 'src/app/Cart/cart_service/cart.service';
import { removeCartItem } from 'src/app/Store/Cart_Store/actions/cart_actions';
import { Product } from '../../model/product';
import { ProductsService } from '../../product_service/products.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService;
  const productMock = {
    id: 1,
    title: 'Product 1',
    price: 12,
    description: 'Hello djj',
    category: 'Mens',
    image: '',
    total: 0,
    quantity: 0,
  };
  const categoriesMock = ['Category 1', 'Category 2'];
  const productServiceMock: any = {
    getAllProducts(): Observable<Product[]> {
      return of([productMock]);
    },
    getCategories(): Observable<any[]> {
      return of([categoriesMock]);
    },
  };
  const cartServiceMock: any = {
    addToCart(): void {},
    getProducts(): Observable<Product[]> {
      return of([productMock]);
    },
  };
  const storeMock: any = {
    dispatch(): void {},
  };

  const routerMock: any = {
    navigate(): void {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ProductsComponent,
        CommonModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot(provideMockStore),
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: StoreModule, useValue: storeMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories and products on initialization', () => {
    const categories = ['Category 1', 'Category 2'];
    const products: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 12,
        description: 'Hello djj',
        category: 'Mens',
        image: '',
        total: 0,
        quantity: 0,
      },
    ];

    spyOn(productService, 'getCategories').and.returnValue(of(categories));
    spyOn(productService, 'getAllProducts').and.returnValue(of(products));

    component.ngOnInit();

    expect(component.categories).toEqual(categories);
    expect(component.productsList).toEqual(products);
    expect(component.filteredproductList).toEqual(products);
  });

  it('should add item to cart', () => {
    const item: Product = {
      id: 1,
      title: 'Product 1',
      price: 12,
      description: 'Hello djj',
      category: 'Mens',
      image: '',
      total: 0,
      quantity: 0,
    };
    spyOn(cartServiceMock, 'addToCart');
    component.addToCart(item);
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(item);
  });

  it('should remove cart item', () => {
    const itemId = 1;
    spyOn(storeMock, 'dispatch');
    component.removeCartItem(itemId);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      removeCartItem({ id: itemId })
    );
  });

  it('should navigate to details page', () => {
    const itemId = 1;
    spyOn(routerMock, 'navigate');
    component.gotoDetails(itemId);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/details/${itemId}`]);
  });

  it('should update filtered product list on search input change', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 12,
        description: 'Hello djj',
        category: 'Mens',
        image: '',
        total: 0,
        quantity: 0,
      },
      {
        id: 2,
        title: 'Product 2',
        price: 15,
        description: 'Hello abc',
        category: 'Womens',
        image: '',
        total: 0,
        quantity: 0,
      },
    ];
    component.productsList = products;

    component.searchinput = 'Product 1';
    component.onSearchChange();
    expect(component.filteredproductList.length).toBe(1);
    expect(component.filteredproductList[0].title).toBe('Product 1');

    component.searchinput = 'Hello';
    component.onSearchChange();
    expect(component.filteredproductList.length).toBe(2);

    component.searchinput = '';
    component.onSearchChange();
    expect(component.filteredproductList.length).toBe(2);
  });

  it('should update filtered product list on category selection', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 12,
        description: 'Hello djj',
        category: 'Mens',
        image: '',
        total: 0,
        quantity: 0,
      },
      {
        id: 2,
        title: 'Product 2',
        price: 15,
        description: 'Hello abc',
        category: 'Womens',
        image: '',
        total: 0,
        quantity: 0,
      },
    ];
    component.productsList = products;

    component.selectedCategory = 'Mens';
    component.onSelected();
    expect(component.filteredproductList.length).toBe(2);
    expect(component.filteredproductList[0].category).toBe('Mens');

    component.selectedCategory = 'Womens';
    component.onSelected();
    expect(component.filteredproductList.length).toBe(2);
    expect(component.filteredproductList[0].category).toBe('Womens');

    component.selectedCategory = 'default';
    component.onSelected();
    expect(component.filteredproductList.length).toBe(2);
  });
});
