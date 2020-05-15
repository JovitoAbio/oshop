import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }

  createCategory(category: Category){
    return this.firestore.collection('categories').add(category);
  }

  updatePolicy(category: Category){
    delete category.id;
    this.firestore.doc('policies/' + category.id).update(category);
  }

  deletePolicy(id: string){
    this.firestore.doc('policies/' + id).delete();
  }

}
