import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  
  apiLocal_url = 'http://localhost:41603/API/WebService.asmx/Photo';
  apiServer_url = 'http://superior.wingplusweb.com/API/WebService.asmx/Photo';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient, public https: Http) { }

  login(user) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://superior.wingplusweb.com/API/Login.ashx' + '?email=' + user.email + '&password=' + user.password,
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

      this.http.post('http://superior.wingplusweb.com/API/Job.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
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

      this.http.post('http://localhost:41603/API/DetailJob.ashx' + '?planID=' + jobdetail.planID + '&tranID=' + jobdetail.tranID + '&insID=' + jobdetail.insID,
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

      this.http.post('http://superior.wingplusweb.com/API/Listpm.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
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

      this.http.post('http://localhost:41603/API/DetailListpm.ashx' + '?cusID=' + detaillistpm.cusID + '&planID=' + detaillistpm.planID + '&month=' + detaillistpm.month + '&year=' + detaillistpm.year ,
        JSON.stringify(detaillistpm), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postPlan(plan) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://superior.wingplusweb.com/API/ServicePlans.ashx' + '?empID=' + plan.empID + '&month=' + plan.month + '&year=' + plan.year,
        JSON.stringify(plan), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
  
  postServicaPlan(serviceplan) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://superior.wingplusweb.com/API/DetailListpm.ashx' + '?empID=' + serviceplan.empID + '&month=' + serviceplan.month + '&year=' + serviceplan.year,
        JSON.stringify(serviceplan), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
  
  postphoto(form) {
    return new Promise((resovle, reject) => {      
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiLocal_url, JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  
  postTran(tran) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post('http://localhost:41603/Web/Test2.aspx' + '?empID=' + tran.empID + '&planID=' + tran.planID + '&installID=' + tran.installID + '&startDate=' + tran.startDate,
        JSON.stringify(tran), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
}