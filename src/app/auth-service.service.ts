import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public myGlobalVar: string;

  constructor(private http: HttpClient) {
  }

  getJob() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/ServicePlans.ashx'
    );
  }
  getJobDetail() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/ServicePlansDetail.ashx'
    );
  }
  getJobAll() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/Employee.ashx'
    );
  }
  getTest() {
    return this.http.get(
      'http://stock.wingplusapp.com/DataService.ashx'
    );
  }
  getuser(username, password){
    return this.http.get(
      'http://superior.wingplusweb.com/API/Login.ashx?username=' + username + '&password=' + password
    );
}
getJobOverview(empID, month,year){
  return this.http.get(
    'http://superior.wingplusweb.com/API/JobOverview.ashx' + '?empID=' + empID + '&month=' + month + '&year=' + year
  );
}
}
