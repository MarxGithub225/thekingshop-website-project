import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/assets/config/interfaces';
import { CookiesService } from '../cookies/cookies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // define the subjects
   user: User = null;
   userSubject: BehaviorSubject<User> = new BehaviorSubject(this.user);
   readonly userObservable = this.userSubject.asObservable();

  constructor(
    private cookieService: CookiesService,
    private http: HttpClient,
    private snack: MatSnackBar,
  ) { }

  // initialize the authentication subscription
  initialize() {

    if (localStorage.getItem('THEKINGSHOP') !== null) {
      let data: any = JSON.parse(localStorage.getItem('THEKINGSHOP'));

      let result = this.getUser(data.ph0ne)

      result.then ((res:any) => {
        this.user = res;
        this.userSubject.next(this.user);
      })
     
      
    }
    else {
      this.user = null;
      this.userSubject.next(this.user);
    }

    
  }
  
  async getUser(phone): Promise<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    const options = { headers };

    let data: any = JSON.parse(localStorage.getItem('THEKINGSHOP'));

    const body = {
      phone : data.phone
    };

    const result: any = await this.http.post(environment.url + 'user/getUser',
    JSON.stringify(body),
    options)
    .toPromise()
    return result.data;
  }

  // register
  register(user): Promise<boolean> {
    
    let headers= new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
  
    let options = {
      headers : headers
    }
  
    const body = user
    
    return this.http.post(environment.url + 'user/register', 
    JSON.stringify(body), 
    options)
    .toPromise()
    .then(async (res: any) => {
      if(res.status) {
        return true;
      }
      else
      this.errorMessage('Une erreur est survenue, veuillez réessayer.')
        return false;
        
    }).catch(err => {
      this.errorMessage('Une erreur est survenue, veuillez réessayer.')
      return false;
      
    });

  }

  // login with email and password
  login(user): Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    const options = { headers };

    const body = {
      email : user.email,
      password : user.password
    };

    return this.http.post(environment.url + 'admins/signin', 
    JSON.stringify(body), options)
    .toPromise()
    .then(async (res: any) => {
      
      if (res.status) {
        this.user = res.data;
        this.userSubject.next(this.user);
        this.cookieService.set(res.data.id);
        return true;
        
      }
      else {
        this.errorMessage ("Utiisateur non reconnu.");
        return false;
      }
    }).catch(err => {
      this.errorMessage ("Utiisateur non reconnu.");
      return false;
    });
  }

  // logout
  logout = () => {
    this.cookieService.delete();
    window.location.href = '/';
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
  
  successMessage(a): void{
    this.snack.open(a, '',
  
    {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'success-alert'
    }
  
    );
  }
}
