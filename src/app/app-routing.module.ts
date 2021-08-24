import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { BillComponent } from './modules/bill/bill.component';
import { CartComponent } from './modules/cart/cart.component';
import { CatalogueComponent } from './modules/catalogue/catalogue.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { HomeComponent } from './modules/home/home.component';
import { SingleproductComponent } from './modules/singleproduct/singleproduct.component';

const routes: Routes = [
  
  {
    path: '',
    component:  HomeComponent
  },
  {
    path: 'product/:id',
    component:  SingleproductComponent
  },
  {
    path: 'catalogue/:id',
    component:  CatalogueComponent
  },
  {
    path: 'catalogue/:id/:sub',
    component:  CatalogueComponent
  },
  {
    path: 'cart',
    component:  CartComponent
  },
  {
    path: 'checkout',
    component:  CheckoutComponent
  },
  {
    path: 'billing',
    component:  BillComponent
  },
  {
    path: 'auth',
    component:  AuthenticationComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
