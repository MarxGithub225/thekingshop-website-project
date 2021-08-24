import { Component, OnInit } from '@angular/core';
import { CentralService } from './services/central.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit() {
    this.stateService.init();

    this.stateService.stateObservable.subscribe(state => {

    })
    
  }
}