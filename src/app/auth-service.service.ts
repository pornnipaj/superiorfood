import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
test;
  constructor(private http: HttpClient) { }

  geteJob() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/ServicePlans.ashx'
    );
  }
  geteData() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/ServicePlansDetail.ashx'
    );
  }
  getEm(){
    return this.http.get(
      'http://superior.wingplusweb.com/API/Employee.ashx'
    );    
  }
  getTest(){
    return this.http.get(
    'http://stock.wingplusapp.com/DataService.ashx'
    );
  }
}
