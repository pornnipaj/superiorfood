import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public myGlobalVar: string;
  db: SQLiteObject = null;
  constructor(private http: HttpClient) {
  }
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }
  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS datis(id INTEGER PRIMARY KEY AUTOINCREMENT, dati TEXT, isTrue INTEGER DEFAULT 0, dateCreated datetime default CURRENT_TIMESTAMP)';
    return this.db.executeSql(sql, []);

  }

  createFirstRunningApp(){ //solo la primera vez se corre
    let allDate = [
      'Blablabla',
      'Something',
      'YellowBlueRed',
    ];
    let sql = 'INSERT INTO datis(dati) VALUES(?)';
    for (let dati of allDate) {
      this.db.executeSql(sql, [dati]);
    }
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
  getJobAll() {
    return this.http.get(
      'http://superior.wingplusweb.com/API/Employee.ashx'
    );
  }
  getTest() {
    return this.http.get(
      'http://stock.wingplusapp.com/DataService.ashx'
    );
  }
  getuser(username, password){
    return this.http.get(
      'http://superior.wingplusweb.com/API/Login.ashx?username=' + username + '&password=' + password
    );
}
getJobOverview(empID, month,year){
  return this.http.get(
    'http://superior.wingplusweb.com/API/JobOverview.ashx' + '?empID=' + empID + '&month=' + month + '&year=' + year
  );
}
}
