import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  //#region data

  header;
  type;
  content;
  date;
  data;
  Show = false;

  //#endregion

  //#region constuctor

  constructor(public DataService: AuthServiceService) {
    this.DataService.getJob().subscribe(data => {
      console.log(data);
      this.data = data;

    })
  }

  //#endregion

  //#region click

  onChange(item) {
    this.Show = true;
    this.header = item.CustomerName
    this.type = item.InstallPlanName
    this.content = item.SerialNo
    this.date = item.start_service_date
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion

}
