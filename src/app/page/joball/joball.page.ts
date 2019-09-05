import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-joball',
  templateUrl: './joball.page.html',
  styleUrls: ['./joball.page.scss'],
})
export class JoballPage implements OnInit {
  data: any;
  constructor(public DataService: AuthServiceService) { 

    this.DataService.getEm().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
    
  }

  ngOnInit() {
  }

}
