import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  databaseObj: SQLiteObject; // Database instance object
  name_model: string = "test"; // Input field model
  row_data: any = []; // Table rows
  readonly database_name: string = "db.db"; // DB name
  readonly table_name: string = "user"; // Table name
  user;
  item;

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {

    this.platform.ready().then(() => {
      this.getRows();
    }).catch(error => {
      console.log(error);
    })

  }

  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  ngOnInit() {
  }


  logout(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });

    window.location.href = "/login";
    localStorage.clear();
  }
}
