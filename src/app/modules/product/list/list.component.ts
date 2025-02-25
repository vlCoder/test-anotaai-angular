import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../../core/services/products.service';
import { Observable, Subject, debounceTime, map, of, takeUntil } from 'rxjs';
import { Product } from '../../../core/models/products.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TypeLabel } from '../../../core/enums/types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  filteredProducts$: Observable<Product[]> = new Observable<Product[]>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
  ) {
    this.loadProducts();
  }

  loadProducts() {
    this.filteredProducts$ = this.productsService.products$.pipe(
      map(products => {
        return products.map(product => {
          const typeLabel = TypeLabel.get(product.type);
          return {
            ...product,
            type: typeLabel ? typeLabel : ''
          }
        });
      }),
    );
  }

  onSearchTermChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productsService.searchProducts(searchTerm).pipe(
      debounceTime(500),
      map(products => {
        return products.map(product => {
          const typeLabel = TypeLabel.get(product.type);
          return {
            ...product,
            type: typeLabel ? typeLabel : ''
          }
        });
      }),
      
      takeUntil(this.unsubscribe$)
    ).subscribe(filteredProducts => {
      this.filteredProducts$ = of(filteredProducts);
    });
  }

  handleOnDelete(id: number) {
    this.productsService.deleteProduct(id)
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}