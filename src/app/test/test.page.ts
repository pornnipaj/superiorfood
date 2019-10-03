import { Component, OnInit, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import { PostDataService } from '../post-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit { 
  
id=12;
myId;
sign
  constructor(public http: HttpClient,
    private route: ActivatedRoute,
     private postDataService:PostDataService ) {  
    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["sig"]);
      // this.sign = this.myId
      // this.tranID = this.myId.tranID
      console.log("receive", this.myId);

    });
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
  }
}
