import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  data: any;
  myDate;
  test:any;

  constructor(public DataService: AuthServiceService) {
    this.myDate = new Date().toISOString();

    this.DataService.geteData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });

    this.DataService.getTest().subscribe(test => {
      this.test = test;
      console.log(this.test);
    });
  }

  ngOnInit() {
  }

}
