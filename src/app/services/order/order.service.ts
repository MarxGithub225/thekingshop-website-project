import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productState, User } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }
  

  // New Order

  async saveBanner(order): Promise<boolean>  {

    
    let headers= new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    let options = {
      headers : headers
    }

    const body = order
    
    return this.http.post(environment.url + 'order/register', 
    JSON.stringify(body), 
    options)
    .toPromise()
    .then(async (res: any) => {
      if(res.status) {
        return true;
      }
      else
        return true;
        
    }).catch(err => {
      return true;
      
    });

  }

  //ALERTS

errorMessage(a): void {
  this.snack.open(a, '',

  {
    duration: 5000,
    verticalPosition: 'bottom',
    panelClass: 'danger-alert'
  }

  ) ;
}
}
