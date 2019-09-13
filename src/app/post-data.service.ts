import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  api_url = 'http://localhost:41603/API/Receipt.aspx';
 // api_url:any;
  constructor(private http: HttpClient) { }

  url(link){
    this.api_url = link;
  }

  insertData(data){
    return this.http.post(this.api_url,data,{
      headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Host': 'http://localhost:41603/API/Receipt.aspx',
        'Origin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    });
  }
    
  insert(body) {
    return new Promise((resovle, reject) => {
      body['key'] = 'insert';
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.api_url, JSON.stringify(body), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }

  getData() {
    // alert(1);
    return this.http.get(     
      'http://localhost:41603/API/Receipt.aspx'
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