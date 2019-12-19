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

  getnew() {
    return this.http.get
    (
      'https://cors-anywhere.herokuapp.com/http://superior2.wingplusweb.com//API/News.ashx'
    );
  }

  getProduct() {
    return this.http.get
    (
      'https://cors-anywhere.herokuapp.com/http://superior2.wingplusweb.com//API/ProductAndManual.ashx'
    );
  }
  getresolution(){
    return this.http.get
    (
    'https://cors-anywhere.herokuapp.com/http://superior2.wingplusweb.com//API/Resolutio.asmx/Detail'
    );
  }
}
