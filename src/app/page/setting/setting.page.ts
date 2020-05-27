import { Component, OnInit, ViewChild } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, IonList,NavController,ModalController } from '@ionic/angular';
import { StorageService, User } from '../../storage.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { ChangpasswordPage } from '../setting/changpassword/changpassword.page';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  //#region data
  user;
  name;
  //#endregion

  //#region constructor
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private storageService: StorageService,
    private authService: AuthenticationService,
    public navCtrl: NavController,
    public modalController: ModalController,
  ) {
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
  }  //#endregion

}
