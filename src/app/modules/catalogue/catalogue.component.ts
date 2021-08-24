import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');

  id : any;
  sub : any;
  bestProducts: any[] = [];

  active = 2;

  categories: any[] = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public stateService: CentralService
  ) { 

    
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.sub = this.activateRoute.snapshot.paramMap.get('sub');
    
    this.stateService.stateObservable.subscribe(state => {
      this.getBestProducts(state.products, state.categories, this.id, this.sub)
    })

    router.events.subscribe((url:any) => {

      this.stateService.setLoading(true);
      setTimeout(() => {
        this.stateService.setLoading(false);
      }, 2000)

      this.id = this.activateRoute.snapshot.paramMap.get('id');
      this.sub = this.activateRoute.snapshot.paramMap.get('sub');

      this.stateService.stateObservable.subscribe(state => {
        this.getBestProducts(state.products, state.categories, this.id, this.sub)
      })
    });
    

    
  }

  

  

  ngOnInit(): void {


  }


  getBestProducts (products, categories, id, sub) {

    this.categories = [];

    const today = new Date().getTime();

    
    products.forEach (product => {
      
      categories.forEach(categorie => {

        for (let sub of categorie.subcategories) {
          if(Number(sub.id) === Number(product.category)) {
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

    this.bestProducts = sub ? products.filter(product => Number(product.category) === Number(id)).sort((a,b)=> (a.views < b.views ? 1 : -1)) : products.filter(product => Number(product.cat) === Number(id)).sort((a,b)=> (a.views < b.views ? 1 : -1))

    this.categories = categories.filter(cat => this.bestProducts.some(best => Number(best.cat) === Number(cat.id)))[0].subcategories
  }

  
}

