import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bannerState } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

   
  // define the subjects
 state: bannerState = {
  banners : []
};


stateSubject: BehaviorSubject<bannerState> = new BehaviorSubject(this.state);
readonly stateObservable = this.stateSubject.asObservable();

constructor(
  private http: HttpClient,
) { }

  async init () {

    const result: any = await this.http.get(environment.url + 'banner/get')
    .toPromise();

    const today = new Date().getTime();
    if (result.data) {

      let data = [];
      result.data.forEach(slider => {
        
        if(Number(slider.end) >= today && Number(slider.state) === 1) {
          data.push(slider)
        }
      });
      this.state.banners =data;
      this.stateSubject.next(this.state);
    }else {
      this.state.banners = [];
      this.stateSubject.next(this.state);
    }

    
  }
}
