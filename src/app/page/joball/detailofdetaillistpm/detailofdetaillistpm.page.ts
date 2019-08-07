import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailofdetaillistpm',
  templateUrl: './detailofdetaillistpm.page.html',
  styleUrls: ['./detailofdetaillistpm.page.scss'],
})
export class DetailofdetaillistpmPage implements OnInit {
myDate;
  constructor() {
    this.myDate = new Date().toISOString();

  }

  ngOnInit() {
  }

}
