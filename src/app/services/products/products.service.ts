import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productState, User } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  // define the subjects
  state: productState = {
    
    products: []
  };

  userState : User

  stateSubject: BehaviorSubject<productState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  async init () {

    const productsResult: any = await this.http.get(environment.url + 'product/get')
    .toPromise();
    const imagesResult: any = await this.http.get(environment.url + 'image/get')
    .toPromise();
    const promosResult: any = await this.http.get(environment.url + 'promo/get')
    .toPromise();
    const ratingsResult: any = await this.http.get(environment.url + 'rating/get')
    .toPromise()


    
    const theProducts = productsResult.data.filter(product => Number(product.state) === 1);

      theProducts.forEach(product => {
        product.images = imagesResult.data.filter(image => image.product === product.id);
        product.promo = promosResult.data.filter(promo => promo.product === product.id);
        product.ratings = ratingsResult.data.filter(rating => rating.product === product.id);

        console.log( product.images)
      });
    
      
      this.state.products = theProducts;
      this.stateSubject.next(this.state);
    
  }
}
