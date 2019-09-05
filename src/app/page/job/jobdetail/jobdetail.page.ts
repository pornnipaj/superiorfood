import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {
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
