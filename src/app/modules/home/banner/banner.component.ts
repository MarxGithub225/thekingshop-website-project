import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
 
  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit(): void {
  }

}
