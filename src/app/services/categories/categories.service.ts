import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { categoryState } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

 // define the subjects
 state: categoryState = {
  categories : [],
};


stateSubject: BehaviorSubject<categoryState> = new BehaviorSubject(this.state);
readonly stateObservable = this.stateSubject.asObservable();

constructor(
  private http: HttpClient
) { }

async init () {

  const categoryResult: any = await this.http.get(environment.url + 'category/get')
  .toPromise();

  const subCategoryResult: any = await this.http.get(environment.url + 'subcategory/get')
  .toPromise();

  if (categoryResult.data && subCategoryResult.data) {

    categoryResult.data.forEach(category => {
      category.subcategories = subCategoryResult.data.filter(cat => cat.category === category.id)
    });

    this.state.categories = categoryResult.data;

    this.stateSubject.next(this.state);
  }else {
    this.state.categories = [];
    this.stateSubject.next(this.state);
  }

  
}
}
