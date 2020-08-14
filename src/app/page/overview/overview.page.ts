import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import * as $ from 'jquery';
import { HTTP } from '@ionic-native/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PostDataService } from '../../post-data.service';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { SignaturePage } from '../joball/detailofdetaillistpm/signature/signature.page'
import { ActivatedRoute, Data } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, PopoverController, ModalController, Events, LoadingController } from '@ionic/angular';
import { StorageService, User } from '../../storage.service';
import { ModalpopPage } from '../overview/modalpop/modalpop.page';
import { from } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})

export class OverviewPage implements OnInit {

  //#region  data

  Today;
  month;
  intMonth;
  intYear;
  textShow;
  all;
  finish;
  myId;
  test: any;
  myphoto: any;
  username;
  name;
  position;
  workallnow;
  workfinishnow;
  workall;
  workfinish;
  empID;
  user;
  jobOverview;
  items: User[] = [];
  cm;
  pm;
  install;
  uninstall;
  job;
  VersionNumber;
  statusversion;
  link;
  //#endregion

  //#region constructor

  constructor(public DataService: AuthServiceService,
    public http: HttpClient,
    public postDataService: PostDataService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private camera: Camera,
    private popoverController: PopoverController,
    private platform: Platform,
    private sqlite: SQLite,
    private events: Events,
    private localNotifications: LocalNotifications,
    private storageService: StorageService,
    private appVersion: AppVersion,
    public alertController: AlertController,
    private browserTab: BrowserTab) {

    setTimeout(() => {
      this.ngOnInit();
      this.checkversion();
    }, 500);
    this.user = [];
    this.test = [];
    this.ChangeMonth();

    this.Today = new Date();
  }
  loadpage() {
    setTimeout(() => {
      this.load();
      this.ngOnInit();
    }, 500);
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล...',
      duration: 500,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async Openpop(ev: any) {
    const popover = await this.popoverController.create({
      component: ModalpopPage,
      event: ev,
      translucent: true,
      componentProps: {
        pm: this.pm,
        cm: this.cm,
        install: this.install,
        uninstall: this.uninstall
      }
    });
    return await popover.present();
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

    console.log(this.intMonth)
    console.log(this.intYear)

    this.user.empID = this.empID;
    this.user.month = this.intMonth;
    this.user.year = this.intYear;

    this.postDataService.postjobOverview(this.user).then(work => {
      this.jobOverview = work;
      for (let i = 0; i < this.jobOverview.length; i++) {
        this.workall = this.jobOverview[i].WorkAll;
        this.workfinish = this.jobOverview[i].WorkFinish;
      }
    });
  }

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

    this.user.empID = this.empID;
    this.user.month = this.intMonth;
    this.user.year = this.intYear;

    this.postDataService.postjobOverview(this.user).then(work => {
      console.log('worknext', work);
      this.jobOverview = work;
      for (let i = 0; i < this.jobOverview.length; i++) {
        this.workall = this.jobOverview[i].WorkAll;
        this.workfinish = this.jobOverview[i].WorkFinish;
      }
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

    this.user.empID = this.empID;
    this.user.month = this.intMonth;
    this.user.year = this.intYear;

    this.postDataService.postjobOverview(this.user).then(work => {
      console.log('workback', work);
      this.jobOverview = work;
      for (let i = 0; i < this.jobOverview.length; i++) {
        this.workall = this.jobOverview[i].WorkAll;
        this.workfinish = this.jobOverview[i].WorkFinish;
      }
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
        this.name = this.items[i].name
        this.position = this.items[i].position
        this.username = this.items[i].username
        console.log(this.empID);
      }
      this.user.empID = this.empID;
      this.user.month = this.intMonth;
      this.user.year = this.intYear;
      console.log(this.user);
      this.postDataService.postjobOverview(this.user).then(work => {
        console.log('worknow', work);
        this.jobOverview = work;
        for (let i = 0; i < this.jobOverview.length; i++) {
          this.workall = this.jobOverview[i].WorkAll;
          this.workfinish = this.jobOverview[i].WorkFinish;
          this.cm = this.jobOverview[i].cm;
          this.pm = this.jobOverview[i].pm;
          this.install = this.jobOverview[i].install;
          this.uninstall = this.jobOverview[i].uninstall;
          this.job = this.jobOverview[i].job;
        }
      });
    });
    this.localNotifications.schedule({
      id: 1,
      text: 'งานทั้งหมด' + this.job + "งาน",
      data: { secret: 'key_data' },
      trigger: { every: { hour: 12 }, count: 1 },
    });
  }

  //#endregion

  //#region Check Version
  checkversion() {
    this.appVersion.getVersionNumber().then((s) => {
      this.VersionNumber = s;
      console.log(this.VersionNumber);
      let param = {
        version: this.VersionNumber,
        typedevice: "checkversion",
      }
      console.log(param);
      this.postDataService.postdevice(param).then(data => {
        this.statusversion = data;
        console.log(this.statusversion);
  
        if (this.statusversion == true) {
  
        } else {
          this.link = this.statusversion;
          this.alertversion();
        }
      });
    })
  }
  //#endregion

  //#region 
  async alertversion() {
    const alert = await this.alertController.create({
      message: 'กรุณาดาวน์โหลดเวอร์ชั่นใหม่',
      buttons: [
        {
          text: 'ดาวน์โหลดเวอร์ชั่นใหม่',
          handler: () => {
            this.openUrl();
          }
        }, {
          text: 'ยกเลิก',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  //#endregion

  //#region 
  openUrl() {
    console.log(this.link);
    this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {

        if (isAvailable) {

          this.browserTab.openUrl(this.link);
          //this.browserTab.openUrl('https://test.erpsuperior.com/APK/eServiceTest.apk');
          //this.browserTab.openUrl('https://drive.google.com/file/d/1CYrs3j1akx2gtIXRx3A_DvD8kX9bSsea/view?usp=sharing');

        } else {

          // if custom tabs are not available you may  use InAppBrowser

        }
      });
  }
  //#endregion
}
