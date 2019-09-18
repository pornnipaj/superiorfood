import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";
@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  api_url = 'http://superior.wingplusweb.com/API/Login.ashx';
  username: string;
  // api_url:any;
  constructor(private http: HttpClient, public https: Http) { }

  // insertDatas() {
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded' );
  //   let options = new RequestOptions({ headers: headers });

  //   let postParams =  {
  //     name: this.username
  //   } 
  //   this.https.post("http://localhost:9090/restexample/RestController.php?view=insert", JSON.stringify(postParams), options)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //     }, error => {
  //       console.log(error);// Error getting the data
  //     });
  //     }

  url(link) {
    this.api_url = link;
  }

  // insertData(data) {
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   const requestOptions = new RequestOptions({ headers: headers });

  //   this.http.post("http://127.0.0.1:3000/customers", data, requestOptions)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //      }, error => {
  //       console.log(error);
  //     });

  //   // return this.http.post(this.api_url + "?dataid=" + data.emp_id, data, {
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'Accept': 'application/json',
  //   //     'Access-Control-Allow-Origin': '*',
  //   //     'Access-Control-Allow-Methods': 'POST',
  //   //     'Access-Control-Allow-Headers': 'Content-Type'
  //   //   }
  //   // });
  // }

  
   insert(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.api_url + '?id=' + form.emp_id, JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }

  login(user) {
    // console.log(user);
    return new Promise((resovle, reject) => {
      
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.api_url + '?username=' + user.username + '&password=' + user.password, 
      JSON.stringify(user), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }

  postjobOverview(user){
    return new Promise((resovle, reject) => {
      
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://superior.wingplusweb.com/API/JobOverview.ashx' + '?empID=' + user.empid + '&month=' + user.month + '&year=' + user.year, 
      JSON.stringify(user), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
}