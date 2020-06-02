import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  data;
  apiServer_url = 'http://localhost:41669';
  // apiServer_url = 'https://cors-anywhere.herokuapp.com/http://superior2.wingplusweb.com/';
  // apiServer_url = 'https://superior2.wingplusweb.com/';
  // apiServer_url = 'https://superiortest.wingplusweb.com/';
  // apiServer_url = 'https://cors-anywhere.herokuapp.com/https://superior2.wingplusweb.com/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  //#region Server
  changpassword(pass) {
    console.log(pass);
    
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Login.ashx' + '?empID=' + pass.empID + '&type=' + pass.type + '&passold=' + pass.old + '&passnew=' + pass.new,
        JSON.stringify(pass), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  } 
  login(user) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Login.ashx' + '?email=' + user.email + '&password=' + user.password,
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

      this.http.post(this.apiServer_url + '/API/JobOverview.ashx' + '?empID=' + user.empID + '&month=' + user.month + '&year=' + user.year,
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

      this.http.post(this.apiServer_url + '/API/DetailJob.ashx' + '?planID=' + jobdetail.planID + '&tranID=' + jobdetail.tranID + '&type=' + jobdetail.type
        + '&insID=' + jobdetail.insID,
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

  postcheck(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/TranService.asmx/Tran', JSON.stringify(form), option).subscribe(data => {
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

      this.http.post(this.apiServer_url + '/API/DetailListpm.ashx' + '?cusID=' + detaillistpm.cusID + '&planID=' + detaillistpm.planID + '&month=' + detaillistpm.month
        + '&year=' + detaillistpm.year + '&jobtype=' + detaillistpm.type + '&date=' + detaillistpm.date + '&empid=' + detaillistpm.empid,
        JSON.stringify(detaillistpm), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
  postEmployee(emp) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Employee.ashx' + '?empID=' + emp.empid,
        JSON.stringify(emp), option).subscribe(data => {
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

      this.http.post(this.apiServer_url + '/API/WebService.asmx/Photo', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  postTran(tran) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/Web/CK_Check.aspx' + '?empID=' + tran.empID + '&serviceplanid=' + tran.serviceplanid + '&installplanid=' + tran.installplanid,
        JSON.stringify(tran), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
  postTranid(tran) {
    return new Promise((resovle, reject) => {

      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/Web/Test2.aspx' + '?empID=' + tran.empID + '&planID=' + tran.serviceplanid + '&installID=' + tran.installplanid,
        JSON.stringify(tran), option).subscribe(data => {
          resovle(data);
        }, error => {
          reject(error)
        });
    });
  }
  postdevice(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Device.asmx/Devices', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  postTranService(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/TranService.asmx/Tran', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  getImage(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/ImageService.asmx/ImageInstall', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  SaveCaseAll(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/SaveCaseAll.asmx/SaveCase', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  PostCus(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/Sparepart.asmx/Sparpart', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }

  GetDevice(form) {
    return new Promise((resovle, reject) => {
      let option: any = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiServer_url + '/API/StockList.asmx/stock', JSON.stringify(form), option).subscribe(data => {
        resovle(data);
      }, error => {
        reject(error)
      });
    });
  }
  //#endregion

}

