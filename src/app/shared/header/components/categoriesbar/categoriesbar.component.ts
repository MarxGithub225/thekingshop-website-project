import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-categoriesbar',
  templateUrl: './categoriesbar.component.html',
  styleUrls: ['./categoriesbar.component.scss']
})
export class CategoriesbarComponent implements OnInit {

  constructor(
    public stateService: CentralService
  ) {}

  ngOnInit(): void {
  }

}
