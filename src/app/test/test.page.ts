import { Component, OnInit, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import { PostDataService } from '../post-data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit { 
  
id=12;
  
  constructor(public http: HttpClient, private postDataService:PostDataService ) {  
    }

  ngOnInit() {
  }
  post(){       
    let params={ 
    SubscriptionPassword: 'passx',
    UserID: this.id,
    UserPassword: '00100100957', 
    BranchID: '01',
    AllowHttp: true
  }
    this.postDataService.post(params).then((data:any) => {
      console.log(data);
    });
  }
}
