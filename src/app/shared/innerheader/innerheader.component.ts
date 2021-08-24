import { Component, OnInit } from '@angular/core';

import { CentralService } from 'src/app/services/central.service';
import {State} from 'src/assets/config/interfaces'

@Component({
  selector: 'app-innerheader',
  templateUrl: './innerheader.component.html',
  styleUrls: ['./innerheader.component.scss']
})
export class InnerheaderComponent implements OnInit {

  moduleState : State
  
  constructor(
    public stateService: CentralService,
  ) { }

  ngOnInit(): void {
    this.stateService.stateObservable.subscribe(state => {
      this.moduleState  = state
    })
  }

}
