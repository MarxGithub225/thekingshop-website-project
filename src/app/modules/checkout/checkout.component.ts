import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';
import { State} from 'src/assets/config/interfaces'
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  cart : any[] = [];
  users : any[] = [];

  moduleState : State

  name;
  phone;
  address;
  city = "Abidjan";


  userId : any;
  
  shipping = 1000;

  loading = false;

  constructor(
    public stateService: CentralService,
    private router: Router,
    private oder: OrderService,
    private auth: AuthService
  ) {

    if (localStorage.getItem('THEKINGSHOP') !== null) {
      let data: any = JSON.parse(localStorage.getItem('THEKINGSHOP'));

      this.name = data.name;
      this.phone = data.phone;
      this.address = data.address;
      this.city = data.city;

    }

   }
  

  ngOnInit(): void {

    this.stateService.stateObservable.subscribe(state => {
      this.moduleState  = state
      
      if(state.users && state.users.length > 0) {
        this.users = state.users

      }

      if(state.user) {
        this.userId = state.user.id
      }

      if(state.cart && state.cart.length > 0) {
        this.cart = state.cart

      }else {
        this.router.navigateByUrl('/')
      }
    })

    
  }

  set(data) {
    localStorage.setItem('THEKINGSHOP', JSON.stringify(data));
  }

  getChange (event) {
    if(event.target.value === 'Abidjan') {
      this.shipping = 1000;
    }else {
      this.shipping = 2000;
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


  next () {

    this.loading = true;
    
    this.set ({name: this.name, phone: this.phone, city: this.city, address: this.address})

    let data = [];

    console.log(this.cart)
    this.cart.forEach((c, i) => {

      data.push({quantity: c.number, product: c.id, price: c.sellPrice})
      
    })

    
    const userExist = this.users.filter(u => u.phone === this.phone).length ? true : false

    if(userExist) {

      let oderData = {
        state : 0,
        date : new Date().getTime(),
        user : this.userId,
        order: data,
        name: this.name,
        phone: this.phone
      }

      this.oder.saveBanner(oderData)
      .then(res => {
        if(res) {
          this.loading = false;
          this.router.navigateByUrl('/billing');
        }
      })
    }else {

      this.auth.register(
        {
          date : new Date().getTime(), 
          phone: this.phone,
          name: this.name,
          address: this.address,
          city: this.city
        }
        )
      .then(res => {
        if(res) {
          let oderData = {
            state : 0,
            date : new Date().getTime(),
            user : this.users.length ? Number (this.users[this.users.length-1].id) + 1 : 1,
            order: data,
            name: this.name,
            phone: this.phone
          }
    
          this.oder.saveBanner(oderData)
          .then(res => {
            if(res) {
              this.loading = false;
              this.router.navigateByUrl('/billing');
            }
          })
        }
      })

    }
    
  }
}
