import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { StorageService } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.page.html',
  styleUrls: ['./cm.page.scss'],
})
export class CmPage implements OnInit {

  //#region data
  items;
  name;
  type = "CM";
  data: any;
  Today;
  month;
  intMonth;
  intYear;
  textShow;
  all;
  finish;
  json: any;
  listpmdetail;
  job;
  myempID: string;
  empid: any;
  listpm;
  //#endregion

  //#region constructor
  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private storageService: StorageService,
    private postDataService: PostDataService) {
    this.json;
    this.listpmdetail = [];
    this.job = [];
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.myempID = this.items[i].empID;
        this.name = this.items[i].name;
        console.log(this.myempID);
      }
    });
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
    this.ChangeMonth();

  }
  //#endregion

  //#region loaditem
  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.myempID = this.items[i].empID;
        console.log(this.myempID);
      }
    });
  }
  //#endregion

  //#region click
  click(item, data) {
    console.log(item);
    let params = {
      item: item.value,
      type: this.type,
      date: data.planDate,
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(params)
      }
    };
    console.log(navigationExtras);
    this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
  }
  //#endregion

  //#region ChangeMonth
  ChangeMonth() {
    const month = new Date().getMonth() + 1;
    this.intMonth = month;
    const year = new Date().getFullYear();
    this.intYear = year;

    //#region changemonth  
    if (month == 1) {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 2) {
      this.month = 'กุมภาพันธ์'
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 3) {
      this.month = 'มีนาคม'
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 4) {
      this.month = 'เมษายน'
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 5) {
      this.month = 'พฤษภาคม'
      this.intMonth = 5;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 6) {
      this.month = 'มิถุนายน'
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 7) {
      this.month = 'กรกฎาคม'
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 8) {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 9) {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 10) {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 11) {
      this.month = 'พฤศจิกายน'
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }
    if (month == 12) {
      this.month = 'ธันวาคม'
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    //#endregion

    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empid = this.items[i].empID
        this.name = this.items[i].name;
      }
      this.job.empID = this.empid;
      this.job.month = this.intMonth;
      this.job.year = this.intYear;
      this.job.jobtype = this.type
      console.log(this.job);

      this.postDataService.postJobList(this.job).then(work => {
        this.listpm = work;
        console.log(this.listpm);


        for (let i = 0; i < this.listpm.length; i++) {
          this.listpm[i].customerdata = JSON.parse(this.listpm[i].customerdata);
        }

        console.log('listpm', this.listpm);

      });
    });
  }
  //#endregion

  //#region changeMonthNext
  changeMonthNext() {
    // const year = new Date().getFullYear();
    //#region nextmonth
    if (this.month == 'มกราคม') {
      this.month = 'กุมภาพันธ์'
      this.all = '2';
      this.finish = '2';
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กุมภาพันธ์') {
      this.month = 'มีนาคม'
      this.all = '3';
      this.finish = '3';
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มีนาคม') {
      this.month = 'เมษายน'
      this.all = '4';
      this.finish = '4';
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'เมษายน') {
      this.month = 'พฤษภาคม'
      this.all = '5';
      this.finish = '5';
      this.intMonth = 5;
    }
    else if (this.month == 'พฤษภาคม') {
      this.month = 'มิถุนายน'
      this.all = '6';
      this.finish = '6';
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มิถุนายน') {
      this.month = 'กรกฎาคม'
      this.all = '7';
      this.finish = '7';
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กรกฎาคม') {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'สิงหาคม') {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กันยายน') {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'พฤศจิกายน'
      this.all = '11';
      this.finish = '11';
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ธันวาคม'
      this.all = '12';
      this.finish = '12';
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ธันวาคม') {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.intYear = this.intYear + 1
      this.textShow = this.month + " " + this.intYear
    }
    // if (this.intYear > year) {
    //   this.intYear = year
    // }
    //#endregion
    console.log(this.intMonth)
    console.log(this.intYear)
    console.log(this.empid);


    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empid = this.items[i].empID
        this.name = this.items[i].name;
      }
      this.job.empID = this.empid;
      this.job.month = this.intMonth;
      this.job.year = this.intYear;
      this.job.jobtype = this.type
      console.log(this.job);

      this.postDataService.postJobList(this.job).then(work => {
        this.listpm = work;
        console.log(this.listpm);


        for (let i = 0; i < this.listpm.length; i++) {
          this.listpm[i].customerdata = JSON.parse(this.listpm[i].customerdata);
        }

        console.log('listpm', this.listpm);

      });
    });
  }
  //#endregion

  //#region changeMonthBack
  changeMonthBack() {
    //#region 
    if (this.month == 'มกราคม') {
      this.month = 'ธันวาคม'
      this.intMonth = 12;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กุมภาพันธ์') {
      this.month = 'มกราคม'
      this.intMonth = 1;
      this.textShow = this.month + " " + this.intYear
      this.intYear = this.intYear - 1
    }
    else if (this.month == 'มีนาคม') {
      this.month = 'กุมภาพันธ์'
      this.intMonth = 2;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'เมษายน') {
      this.month = 'มีนาคม'
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤษภาคม') {
      this.month = 'เมษายน'
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มิถุนายน') {
      this.month = 'พฤษภาคม'
      this.intMonth = 5;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กรกฎาคม') {
      this.month = 'มิถุนายน'
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'สิงหาคม') {
      this.month = 'กรกฎาคม'
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กันยายน') {
      this.month = 'สิงหาคม'
      this.all = '8';
      this.finish = '8';
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'กันยายน'
      this.all = '9';
      this.finish = '9';
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ตุลาคม'
      this.all = '10';
      this.finish = '10';
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ธันวาคม') {
      this.month = 'พฤศจิกายน'
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }

    //#endregion
    console.log(this.intMonth)
    console.log(this.intYear)
    console.log(this.empid);


    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empid = this.items[i].empID
        this.name = this.items[i].name;
      }
      this.job.empID = this.empid;
      this.job.month = this.intMonth;
      this.job.year = this.intYear;
      this.job.jobtype = this.type
      console.log(this.job);

      this.postDataService.postJobList(this.job).then(work => {
        this.listpm = work;
        console.log(this.listpm);


        for (let i = 0; i < this.listpm.length; i++) {
          this.listpm[i].customerdata = JSON.parse(this.listpm[i].customerdata);
        }

        console.log('listpm', this.listpm);

      });
    });
  }
  //#endregion

  //#region start
  ngOnInit() {
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empid = this.items[i].empID
        this.name = this.items[i].name;
      }
    });
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empid = this.items[i].empID
        this.name = this.items[i].name;
      }
      this.job.empID = this.empid;
      this.job.month = this.intMonth;
      this.job.year = this.intYear;
      this.job.jobtype = this.type
      console.log(this.job);

      this.postDataService.postJobList(this.job).then(work => {
        this.listpm = work;
        console.log(this.listpm);


        for (let i = 0; i < this.listpm.length; i++) {
          this.listpm[i].customerdata = JSON.parse(this.listpm[i].customerdata);
        }

        console.log('listpm', this.listpm);

      });
    });

  }
  //#endregion

  //#region load
  ionViewDidLoad() {
    setTimeout(() => {
      this.ngOnInit();
    }, 350);
  }
  //#endregion
}
