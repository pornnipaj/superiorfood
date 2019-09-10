import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
@Component({
  selector: 'app-listpm',
  templateUrl: './listpm.page.html',
  styleUrls: ['./listpm.page.scss'],
})
export class ListpmPage implements OnInit {

  constructor(public DataService: AuthServiceService) { 
    
    console.log(this.DataService.EmpID)
  }

  ngOnInit() {
  }

}
