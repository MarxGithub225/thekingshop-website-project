import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
@Component({
  selector: 'app-mobilecategories',
  templateUrl: './mobilecategories.component.html',
  styleUrls: ['./mobilecategories.component.scss']
})
export class MobilecategoriesComponent implements OnInit {

  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit(): void {
  }


  closeMenu () {
    this.stateService.setMenuState(false)
  }
}
