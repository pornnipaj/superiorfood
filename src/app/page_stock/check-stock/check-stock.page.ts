import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-stock',
  templateUrl: './check-stock.page.html',
  styleUrls: ['./check-stock.page.scss'],
})
export class CheckStockPage implements OnInit {
  No = 1;
  stock = [];
  constructor() { }

  ngOnInit() {
  }

  save() {
    let a = "a"
    this.stock.push(a);
    console.log(this.stock);

  }
}
