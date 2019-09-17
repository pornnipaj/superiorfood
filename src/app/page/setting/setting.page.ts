import { Component, OnInit, ViewChild } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, IonList } from '@ionic/angular';
import { StorageService , User } from '../../storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  databaseObj: SQLiteObject; // Database instance object
  row_data: any = []; // Table rows
  readonly database_name: string = "db.db"; // DB name
  readonly table_name: string = "user"; // Table name
  user;
  name;
  items: User[] = [];
  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private storageService: StorageService,
    public navCtrl: NavController
  ) {
this.loadItems();
  }

  ngOnInit() {
  }


  logout(user: User) { 
    this.storageService.deleteUser(user.id).then(item => {
      this.mylist.closeSlidingItems();
    });
    this.navCtrl.navigateForward(['/login']);
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);      
    });
  }


  deleteItem(user: User) {
    this.storageService.deleteUser(user.id).then(item => {
      this.mylist.closeSlidingItems();
      window.location.reload();
    });
  }
}
