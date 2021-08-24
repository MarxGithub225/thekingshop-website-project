import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.scss']
})
export class BestComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  bestProducts: any[] = [];

  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit(): void {

    this.stateService.stateObservable.subscribe(state => {
      this.getBestProducts(state.products)
    })
  }


  getBestProducts (products) {

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

    this.bestProducts = products.sort((a,b)=> (a.views < b.views ? 1 : -1)).slice(0,9)

  }
}
