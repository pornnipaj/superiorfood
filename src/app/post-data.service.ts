import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";
@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  api_url = 'http://superior.wingplusweb.com/API/Login.ashx';

  constructor(private http: HttpClient, public https: Http) { }

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

      this.http.post(this.api_url + '?email=' + user.username + '&password=' + user.password,
        JSON.stringify(user), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postjobOverview(user) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://superior.wingplusweb.com/API/JobOverview.ashx' + '?empID=' + user.empID + '&month=' + user.month + '&year=' + user.year,
        JSON.stringify(user), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postjob(job) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:41603/API/ServicePlans.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
        JSON.stringify(job), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postjobDetail(jobdetail) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:41603/API/ServicePlansDetail.ashx' + '?planID=' + jobdetail.planID + '&tranID=' + jobdetail.tranID ,
        JSON.stringify(jobdetail), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postListpm(job) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:41603/API/Listpm.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
        JSON.stringify(job), option).subscribe(data => {    
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postDetailListpm(detaillistpm) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:41603/API/DetailListpm.ashx' + '?cusID=' + detaillistpm.cusID + '&planID=' + detaillistpm.planID ,
        JSON.stringify(detaillistpm), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
}