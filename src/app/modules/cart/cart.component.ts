import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';
import {State} from 'src/assets/config/interfaces'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  cart : any[] = [];

  moduleState : State

  constructor(
    public stateService: CentralService,
  ) { }

  ngOnInit(): void {

    this.stateService.stateObservable.subscribe(state => {
      this.moduleState  = state
      
      if(state.cart && state.cart.length > 0) {
        this.cart = state.cart

        this.getProduct(this.cart)

      this.stateService.stateObservable.subscribe(state => {
        if(state.cart && state.cart.length > 0) {
          this.cart = this.getProduct(state.cart)
        }
      })
      }
    })

    
  }

  getProduct (products) {
    const today = new Date().getTime();

    
    products.forEach (product => {
      
      if (product.promo.length > 0) {

        if(Number(product.promo[0].start) <= today && Number(product.promo[0].end) >= today) {
          product.promotion = true;
          product.sellPrice = product.promo[0].price
        }else {
          product.promotion = false;
          product.sellPrice = product.price
        }
        
      }else {
        product.promotion = false;
        product.sellPrice = product.price
      }
    })

    return products;
  }

  increase (product) {
    for(let c of this.cart) {
      if(Number(c.id) === Number(product.id)) {
        c.number ++
      }
    }
  }

  decrease (product) {
    for(let c of this.cart) {
      if(Number(c.id) === Number(product.id)) {
        c.number --
      }
    }
  }


  remove (product) {
    for(let [index, c] of this.cart.entries()){
      if(Number(c.id) === Number(product.id)){
        this.cart.splice(index,1);
      }
    }
  }


  total()
  {
    let total = 0;
    for (let c of this.cart) {
     total += Number(c.sellPrice) * Number (c.number)
    }

    return total;
  }
}
