import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listpm',
  templateUrl: './listpm.page.html',
  styleUrls: ['./listpm.page.scss'],
})
export class ListpmPage implements OnInit {
  myId = null;
  constructor(public DataService: AuthServiceService,private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
    console.log(this.myId);    
  }

}
