import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  header;
  type;
  content;
  date;
  data;
  Show = false;

  constructor(public DataService: AuthServiceService) {
    this.DataService.getJobAll().subscribe(data => {
      console.log(data);
      this.data = data;
      
    })
  }
  onChange(item) {
    this.Show = true;
    this.header = item.CustomerName
    this.type = item.InstallPlanName
    this.content = item.SerialNo
    this.date = item.start_service_date  
  }
  ngOnInit() {
  }

}
