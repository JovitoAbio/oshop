import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  // Get all products from the database
  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  // Get a specific product by its id
  getProduct(id: string) {
    return this.firestore.doc<Product>(`products/${id}`).valueChanges();
  }

  // Saves the new product into the database
  createProduct(product: Product){
    return this.firestore.collection('products').add(product);
  }

  updateProduct(id: string, product: Product){
    delete product.id;
    this.firestore.doc(`products/${id}`).update(product);
  }

  // Delete the selected product from the database
  deleteProduct(id: string){
    this.firestore.doc(`products/${id}`).delete();
  }
}
