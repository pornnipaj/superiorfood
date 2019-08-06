import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
data: any;

  constructor(public DataService: AuthServiceService) {

    this.DataService.geteData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  ngOnInit() {
  }

}
