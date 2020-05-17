import { switchMap } from 'rxjs/operators';
import { CategoryService } from './../shared/category.service';
import { ProductService } from './../shared/product.service';
import { Component } from '@angular/core';
import { Product } from '../shared/product.model';
import { Category } from '../shared/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.productService
      .getProducts()
      .pipe(switchMap(result => {
        this.products = result.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Product;
        })
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }



}
