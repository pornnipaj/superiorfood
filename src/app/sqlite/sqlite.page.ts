import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {  Platform } from '@ionic/angular';

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.page.html',
  styleUrls: ['./sqlite.page.scss'],
})
export class SqlitePage implements OnInit {
  
  databaseObj: SQLiteObject; // Database instance object
  name_model:string = "test"; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "db.db"; // DB name
  readonly table_name:string = "user"; // Table name

  constructor(
    private platform: Platform,
    private sqlite: SQLite
    ) { 
      this.platform.ready().then(() => {
        this.createDB();
        this.createTable();
      }).catch(error => {
        console.log(error);
      })
    }

    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          alert('db Database Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
  
    createTable() {
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(50), , Username varchar(50))', [])
        .then(() => {
          alert('Table Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
   
    insertRow() {
      if (!this.name_model.length) {
        alert("Enter Name");
        return;
      }
      this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
        .then(() => {
          alert('Row Inserted!');
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
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
   
    deleteRow(item) {
      this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
        .then((res) => {
          alert("Row Deleted!");
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

  ngOnInit() {
  }

}
