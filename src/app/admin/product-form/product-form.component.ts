import { Product } from './../../shared/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$: Category[];
  product: Product = {
    id: '',
    title: '',
    price: null,
    category: '',
    imageUrl: ''
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public productService: ProductService) {
      this.categoryService.getCategories().subscribe(result => {
        this.categories$ = result.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Category;
        })
      });

      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) {
        this.productService.getProduct(this.id).subscribe(result => {
          this.product = result;
        })
      }
    }

  ngOnInit() { }

  save(form: NgForm) {
    if(this.id)
      this.productService.updateProduct(this.id, form.value);
    else
      this.productService.createProduct(form.value);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }
}
