import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  id : any;
  product : any

  quantity: number =  1;

  otherProduct : any[] = [];

  cart : any[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(
    public stateService: CentralService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {

    window.scroll(0,0)
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this.getProduct(stateService.state.products, this.id, stateService.state.categories)

    this.stateService.stateObservable.subscribe(state => {
      if(state.cart && state.cart.length > 0) {
        this.cart = state.cart
      }
    })

    this.router.events.subscribe((url:any) => {

      this.stateService.setLoading(true);
      setTimeout(() => {
        this.stateService.setLoading(false);
      }, 2000)

      window.scroll(0,0)
      this.id = this.activateRoute.snapshot.paramMap.get('id');

      this.getProduct(stateService.state.products, this.id, stateService.state.categories)

      this.stateService.stateObservable.subscribe(state => {
        if(state.cart && state.cart.length > 0) {
          this.cart = state.cart
        }
      })
    });
  }


  successMessage(a): void{
    this.snack.open(a, '',
  
    {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'success-alert'
    }
  
    );
  }
  increase () {
    this.quantity++
  }

  decrease () {
    this.quantity--
  }
  ngOnInit(): void {
    
  }

  getProduct (products, id, categories) {

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

    this.product = products.filter(prod => Number(prod.id) === Number(id))[0]

    this.otherProduct = products.filter(prod => prod.cat === this.product.cat).slice(0,10)

  }


  order (product) {

    const checkProductExist = this.cart.filter(prod => Number(prod.id) === Number(product.id)).length > 0 ? true : false;
    if(checkProductExist) {
      for (let c of this.cart) {
        if(Number(c.id) === Number (product.id)) {
          c.number += this.quantity
        }
      }
    }
    else {
      this.cart.push({...product, number: this.quantity})
    }

    this.successMessage ("Produit ajouté, veuillez consulter le panier.")
    this.stateService.addToCart(this.cart)
  }

}
