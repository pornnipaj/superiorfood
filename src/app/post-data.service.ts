import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  api_url = 'http://superior.wingplusweb.com/API/ServicePlans.ashx?id=';
 // api_url:any;
  constructor(private http: HttpClient) { }

  url(link){
    this.api_url = link;
  }

  insert(body) {
    return new Promise((resovle, reject) => {
      body['key'] = 'insert';
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.api_url, JSON.stringify(body), option).subscribe(data => {
        // resovle(data);
      }, error => {
        reject(error)
      });
    });
  }

  getData() {
    alert(1);
    return this.http.get(     
      'http://superior.wingplusweb.com/API/ServicePlans.ashx'
    );
  }

  // post(body) {
  //   return new Promise((resovle, reject) => {
  //     // var headers = new Headers();
  //     // headers.append("Accept", "application/json");
  //     // headers.append("Content-Type", "application/json");

  //     let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

  //     this.http.post(this.api_url, JSON.stringify(body), option).subscribe(data => {
  //       resovle(data);        
  //     }, error => {
  //       reject(error)
  //     });
  //   });
  // }
}