import { Component, OnInit, Pipe } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { StorageService } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';

@Component({
  selector: 'app-listpm',
  templateUrl: './listpm.page.html',
  styleUrls: ['./listpm.page.scss'],
})

export class ListpmPage implements OnInit {
  //#region data

  items;
  name;
  type = "PM";
  data: any;
  Today;
  month;
  intMonth;
  intYear;
  textShow;
  json: any;
  listpmdetail;
  job;
  myempID: string;
  empid: any;
  listpm;
  myId;
  emp;
  //#endregion

  //#region constructor

  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.route.queryParams.subscribe(params => {
        this.myId = JSON.parse(params["data"]);
        this.emp = this.myId.PersonID
        console.log(this.emp);
        
      });

    this.json;
    this.listpmdetail = [];

    this.job = [];

    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.myempID = this.items[i].empID;
        this.name = this.items[i].name;
        // console.log(this.myempID);
      }
    });
this.ChangeMonth();
  }

  //#endregion

  //#region click

  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.myempID = this.items[i].empID;
        // console.log(this.myempID);
      }
    });
  }

  click(item) {

    console.log(item);

    let params = { 
      item: item.value,
      type: this.type, 
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

  //#region Month
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
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 9) {
      this.month = 'กันยายน'
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    if (this.intMonth == 10) {
      this.month = 'ตุลาคม'
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

    // if (this.intYear > year) {
    //   this.intYear = year
    // }
    console.log(this.intMonth)
    console.log(this.intYear)
    console.log(this.empid);


    this.job.empID = this.emp;
    this.job.month = this.intMonth;
    this.job.year = this.intYear;
    this.job.jobtype = this.type

    this.postDataService.postJobList(this.job).then(work => {
      this.listpm = work;
      console.log(this.listpm);


      for (let i = 0; i < this.listpm.length; i++) {
        this.listpm[i].customerdata = JSON.parse(this.listpm[i].customerdata);
      }

      console.log('listpm', this.listpm);

    });
  }

  changeMonthNext() {
    // const year = new Date().getFullYear();
    //#region nextmonth
    if (this.month == 'มกราคม') {
      this.month = 'กุมภาพันธ์'
      this.intMonth = 2;
      this.intYear = this.intYear - 1
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กุมภาพันธ์') {
      this.month = 'มีนาคม'
      this.intMonth = 3;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มีนาคม') {
      this.month = 'เมษายน'
      this.intMonth = 4;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'เมษายน') {
      this.month = 'พฤษภาคม'
      this.intMonth = 5;
    }
    else if (this.month == 'พฤษภาคม') {
      this.month = 'มิถุนายน'
      this.intMonth = 6;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'มิถุนายน') {
      this.month = 'กรกฎาคม'
      this.intMonth = 7;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กรกฎาคม') {
      this.month = 'สิงหาคม'
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'สิงหาคม') {
      this.month = 'กันยายน'
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'กันยายน') {
      this.month = 'ตุลาคม'
      this.intMonth = 10;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'พฤศจิกายน'
      this.intMonth = 11;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ธันวาคม'
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


    this.job.empID = this.emp;
    this.job.month = this.intMonth;
    this.job.year = this.intYear;
    this.job.jobtype = this.type

    this.postDataService.postJobList(this.job).then(work => {
      this.listpm = work;
      console.log(this.listpm);

    });
  }

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
      this.intMonth = 8;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'ตุลาคม') {
      this.month = 'กันยายน'
      this.intMonth = 9;
      this.textShow = this.month + " " + this.intYear
    }
    else if (this.month == 'พฤศจิกายน') {
      this.month = 'ตุลาคม'
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


    this.job.empID = this.emp;
    this.job.month = this.intMonth;
    this.job.year = this.intYear;
    this.job.jobtype = this.type

    this.postDataService.postJobList(this.job).then(work => {
      this.listpm = work;
      console.log(this.listpm);

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


    this.job.empID = this.emp;
    this.job.month = this.intMonth;
    this.job.year = this.intYear;
    this.job.jobtype = this.type

    this.postDataService.postJobList(this.job).then(work => {
      this.listpm = work;
      console.log(this.listpm);

    });

  }
  //#endregion

}
