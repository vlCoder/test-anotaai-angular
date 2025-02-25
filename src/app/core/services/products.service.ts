import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Product } from '../models/products.model';
import { normalString } from '../utils/normalstr-utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    this.httpClient.get<Product[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Error loading products:', error);
        return of([]);
      }),
      shareReplay(1)
    ).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products => {
        const normalizedSearchTerm = normalString(searchTerm);
        return products.filter(product =>
          normalString(product.title).includes(normalizedSearchTerm) ||
          normalString(product.description).includes(normalizedSearchTerm)
        );
      })
    );
  }

  getAll() {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }

  deleteProduct(productId: number) {
    this.products$ = this.products$.pipe(
      map(products => {
        return products.filter(product =>
          product.id !== productId
        );
      })
    );
  }
}