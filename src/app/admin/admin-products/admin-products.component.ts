import { Product } from './../../shared/product.model';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) {
    this.subscription = this.productService.getProducts().subscribe(result => {
      this.filteredProducts = this.products$ = result.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      })
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products$.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;
  }

}
