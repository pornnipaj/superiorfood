import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  
  apiLocal_url = 'http://localhost:41604';
  apiServer_url = 'http://superior.wingplusweb.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient, public https: Http) { }

  login(user) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiLocal_url +'/API/Login.ashx' + '?email=' + user.email + '&password=' + user.password,
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

      this.http.post(this.apiServer_url +'/API/JobOverview.ashx' + '?empID=' + user.empID + '&month=' + user.month + '&year=' + user.year,
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

      this.http.post(this.apiServer_url + '/API/Job.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
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

      this.http.post(this.apiServer_url + '/API/DetailJob.ashx' + '?planID=' + jobdetail.planID + '&tranID=' + jobdetail.tranID + '&insID=' + jobdetail.insID,
        JSON.stringify(jobdetail), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }

  postJobList(job) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/JobList.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year
      + '&jobtype=' + job.jobtype,
        JSON.stringify(job), option).subscribe(data => {    
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }


  postListpm(job) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Listpm.ashx' + '?empID=' + job.empID + '&month=' + job.month + '&year=' + job.year,
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

      this.http.post(this.apiServer_url + '/API/DetailListpm.ashx' + '?cusID=' + detaillistpm.cusID + '&planID=' + detaillistpm.planID + '&month=' + detaillistpm.month + '&year=' + detaillistpm.year + '&jobtype=' + detaillistpm.type ,
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

      this.http.post(this.apiServer_url + '/API/ServicePlans.ashx' + '?empID=' + plan.empID + '&month=' + plan.month + '&year=' + plan.year,
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

      this.http.post(this.apiServer_url + '/API/DetailListpm.ashx' + '?empID=' + serviceplan.empID + '&month=' + serviceplan.month + '&year=' + serviceplan.year,
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

      this.http.post(this.apiLocal_url + '/API/WebService.asmx/Photo', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  
  postTran(tran) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiLocal_url + '/Web/CK_Check.aspx' + '?empID=' + tran.empID + '&serviceplanid=' + tran.serviceplanid + '&installplanid=' + tran.installplanid,
        JSON.stringify(tran), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error) 
        });
    });
  }
}