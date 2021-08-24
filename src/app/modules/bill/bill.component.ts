import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { CentralService } from 'src/app/services/central.service';
import { environment } from 'src/environments/environment';
import {State} from 'src/assets/config/interfaces'

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  number;

  name;
  phone;
  address;
  city;

  moduleState : State
  cart: any[] = [];
  constructor(public stateService: CentralService, private router: Router) { }

  ngOnInit(): void {

    this.stateService.stateObservable.subscribe(state => {
      this.moduleState  = state
      
      if(state.cart && state.cart.length > 0) {
        this.cart = state.cart

      }else {
        this.router.navigateByUrl('/')
      }

      
    })
    
    this.number = this.billNumber()

   
      if (localStorage.getItem('THEKINGSHOP') !== null) {
          let data: any = JSON.parse(localStorage.getItem('THEKINGSHOP'));

          this.name = data.name;
          this.phone = data.phone;
          this.address = data.address;
          this.city = data.city;

        }
  }

  total()
  {
    let total = 0;
    for (let c of this.cart) {
     total += Number(c.sellPrice) * Number (c.number)
    }

    return total;
  }

  billNumber () {
    // const date = new Date();
    // const Day = String(date.getDate()).padStart(2, '0');
    // const Month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    // const Year = date.getFullYear();

    // return  (Year + '-' + Month + '-' + Day);

    return new Date().getTime()
  }

  date () {
    const date = new Date();
    const Day = String(date.getDate()).padStart(2, '0');
    const Month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const Year = date.getFullYear();

    return  (Year + '/' + Month + '/' + Day);

  }

  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  goHome () {
    this.router.navigateByUrl('/');
    this.stateService.addToCart([])
  }
}
