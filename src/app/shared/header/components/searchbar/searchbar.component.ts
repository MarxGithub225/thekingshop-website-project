import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import {State} from 'src/assets/config/interfaces'
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  moduleState : State

  menuOpened :  boolean =  false;

  constructor(
    public stateService: CentralService,
  ) { }

  ngOnInit(): void {
    this.stateService.stateObservable.subscribe(state => {
      this.moduleState  = state
    })
  }


  openMenu () {
    this.stateService.setMenuState(true)
  }

  closeMenu () {
    this.stateService.setMenuState(false)
  }
}
