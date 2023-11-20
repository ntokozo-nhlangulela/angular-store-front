import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((res: Product[]) => {
        return res;
      })
    );
  }

  getSingleProduct(id: number) {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`).pipe(
      map((res: Product) => {
        console.log(res);
        return res;
      })
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://fakestoreapi.com/products/categories'
    );
  }
}
