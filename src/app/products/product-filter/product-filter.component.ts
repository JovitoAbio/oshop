import { CategoryService } from './../../shared/category.service';
import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories: Category[] = [];
  @Input('category') category: string;
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      })
    });
  }

}
