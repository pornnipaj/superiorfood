import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiKey = '';
  constructor(private http: HttpClient) {
  }

  // getJobAll() {
  //   return this.http.get
  //   (`${"http://superior.wingplusweb.com/API/Employee.ashx"}?apikey=${this.apiKey}`);
  //   // (
  //   //   'http://superior.wingplusweb.com/API/Employee.ashx'
  //   // );
  // }

  // getuser(email, password) {
  //   return this.http.get(
  //     'http://superior.wingplusweb.com/API/Login.ashx?email=' + email + '&password=' + password
  //   );
  // }

  getnew() {
    return this.http.get
    (`${"http://superior.wingplusweb.com/API/News.ashx"}?apikey=${this.apiKey}`);
    // (
    //   'http://superior.wingplusweb.com/API/News.ashx'
    // );
  }

  // getPlan() {
  //   return this.http.get(
  //     'http://superior.wingplusweb.com/API/ServicePlans.ashx'
  //   );
  // }

  getProduct() {
    return this.http.get
    // (`${"http://superior.wingplusweb.com/API/ProductAndManual.ashx"}?apikey=${this.apiKey}`);
    (
      'http://superior.wingplusweb.com/API/ProductAndManual.ashx'
    );
  }
}
