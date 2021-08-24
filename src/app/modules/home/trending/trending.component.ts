import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  bestProducts: any[] = [];

  active = '2';

  baseUrl : string = environment.url.replace('/routes', '');
  
  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit(): void {

    this.stateService.stateObservable.subscribe(state => {
      this.getBestProducts(state.products, state.categories)
    })
  }


  getBestProducts (products, categories) {

    const today = new Date().getTime();

    
    products.forEach (product => {
      
      categories.forEach(categorie => {

        for (let sub of categorie.subcategories) {
          if(sub.id === product.category) {
            product.cat = categorie.id
          }
        }
      });

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

    this.bestProducts = products.sort((a,b)=> (a.views < b.views ? 1 : -1))

  }

  getProductByCat (cat) {
    return this.bestProducts.filter(product => product.cat === cat).slice(0,12)
  }
  
}
