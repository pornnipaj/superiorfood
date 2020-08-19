import { Component, OnInit, ViewChild } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, IonList,NavController,ModalController } from '@ionic/angular';
import { StorageService, User } from '../../storage.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { ChangpasswordPage } from '../setting/changpassword/changpassword.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { AlertController } from '@ionic/angular';
import { PostDataService } from '../../post-data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  //#region data
  user;
  name;
  VersionNumber;
  statusversion;
  link;
  //#endregion

  //#region constructor
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private storageService: StorageService,
    private authService: AuthenticationService,
    public navCtrl: NavController,
    public modalController: ModalController,
    private appVersion: AppVersion,
    public alertController: AlertController,
    private browserTab: BrowserTab,
    public postDataService: PostDataService,
  ) {
    this.appVersion.getVersionNumber().then((s) => {
      this.VersionNumber = s;
    });
  }
  //#endregion

  //#region start
  ngOnInit() {
    
  }
  //#endregion

  //#region logout
  logout() {
    this.storageService.resetLocalStorage();
    console.log("Logout Finish");
    this.authService.logout();

  }
  //#endregion

  //#region Changpassword
  async Changpassword() {
    const modal = await this.modalController.create({
      component: ChangpasswordPage,
      cssClass: 'my-custom-modal-css',
    });
    modal.onDidDismiss().then(data => {
    })
    return await modal.present();
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
          this.alertversionlast();
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
  async alertversionlast() {
    const alert = await this.alertController.create({
      message: 'เวอร์ชั่น' + this.VersionNumber + ' เป็นเวอร์ชั่นล่าสุด',
      buttons: [
         {
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
