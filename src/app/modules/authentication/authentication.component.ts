import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  view = "login";

  constructor() { }

  ngOnInit(): void {
  }


  setView (url) {
    this.view = url;
  }
}
