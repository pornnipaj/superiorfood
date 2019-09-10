import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
api_url = 'http://localhost:41603/API/Receipt.aspx'
EmpID;
  constructor(private http: HttpClient) {
    this.EmpID = "";
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
  getJobAll(){
    return this.http.get(
      'http://superior.wingplusweb.com/API/Employee.ashx'
    );    
  }
  getTest(){
    return this.http.get(
    'http://stock.wingplusapp.com/DataService.ashx'
    );
  }
  insert(body) {
    return new Promise((resovle, reject) => {
      // var headers = new Headers();
      // headers.append("Accept", "application/json");
      // headers.append("Content-Type", "application/json");

      var header = { headers: {'Content-Type': 'application/json'} };

      this.http.post(this.api_url, JSON.stringify(body), header).subscribe(data => {
        resovle(data);        
      }, error => {
        reject(error)
      });
    });
  }  
}
