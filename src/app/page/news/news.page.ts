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
    this.DataService.getnew().subscribe(data => {
      console.log(data);
      this.data = data;

    })
  }

  //#endregion

  //#region click

  onChange(item) {
    this.Show = true;
    this.header = item.title
    this.type = item.name
    this.content = item.content
    this.date = item.updated_at
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion

}
