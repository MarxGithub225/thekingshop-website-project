import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { State } from 'src/assets/config/interfaces';
import { AuthService } from './auth/auth.service';
import { BannersService } from './banners/banners.service';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';


@Injectable({
  providedIn: 'root'
})
export class CentralService {

  // define the subjects
  state: State = {
    loading: true,
    user: null,
    categories: [],
    banners: [],
    products: [],
    cart : [],
    users : [],
    menuOpened : false
  };

  stateSubject: BehaviorSubject<State> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private bannersService: BannersService,
    private productService: ProductsService,
    private userService: UsersService
  ) { 

    setTimeout(() => {
      this.setLoading(false);
    }, 2000)
  }

  private authInit() {
    this.authService.initialize();
    this.authService.userObservable.subscribe(user => this.state = {...this.state, user});

  }

  private categoriesInit() {
    this.categoriesService.init()
    this.categoriesService.stateObservable.subscribe(datas => {
      this.state = {...this.state, categories: datas.categories}
      this.stateSubject.next(this.state);
    });
  }

  private bannersInit() {
    this.bannersService.init()
    this.bannersService.stateObservable.subscribe(datas => {
      this.state = {...this.state, banners: datas.banners}
      this.stateSubject.next(this.state);
    });
  }

  private productsInit() {
    this.productService.init()
    this.productService.stateObservable.subscribe(datas => {
      this.state = {...this.state, products: datas.products}
      this.stateSubject.next(this.state);
    });
  }

  private usersInit() {
    this.userService.init()
    this.userService.stateObservable.subscribe(datas => {
      this.state = {...this.state, users: datas.users}
      this.stateSubject.next(this.state);
    });
  }

  init() {
    this.authInit();
    this.categoriesInit();
    this.bannersInit();
    this.productsInit();
    this.usersInit();
  }

  // functions related to the service
  public setLoading(status: Boolean) {
    this.state.loading = status;
    this.stateSubject.next(this.state);
  }

  public setMenuState(status: Boolean) {
    this.state.menuOpened = status;
    this.stateSubject.next(this.state);
  }

  addToCart (cart: any[]) {
    this.state.cart = cart
  }
}
