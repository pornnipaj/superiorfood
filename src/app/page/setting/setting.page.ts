import { Component, OnInit, ViewChild } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, IonList } from '@ionic/angular';
import { StorageService, User } from '../../storage.service';
import { NavController } from '@ionic/angular';

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
    public navCtrl: NavController
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
    this.navCtrl.navigateForward(['/login']);
  }
  //#endregion
  
}
