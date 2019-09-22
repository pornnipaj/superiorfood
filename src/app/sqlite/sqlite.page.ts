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
  username:string = "test"; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "db.db"; // DB name
  readonly table_name:string = "user"; // Table name

  // data = { name:"123", username:"asd", emp_id:"25618"};
data;
  constructor(
    private platform: Platform,
    private sqlite: SQLite
    ) { 

      this.data = [];

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
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (name varchar(50), username varchar(50), emp_id varchar(50), position varchar(50))', [])
        .then(() => {
          alert('Table Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
   
    insertRow() {
      this.databaseObj.executeSql('INSERT INTO user VALUES (?,?,?,?)', [this.data.name,this.data.username,this.data.emp_id,this.data.empID])
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
              this.data.user = this.row_data.push(res.rows.item(i).user);
              this.data.username = this.row_data.push(res.rows.item(i).username);
              this.data.position = this.row_data.push(res.rows.item(i).position);
              this.data.empID = this.row_data.push(res.rows.item(i).empID);
              console.log(this.data.user);              
            }
          }
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
   
    deleteRow() {
      this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE name = " + this.data.name, [])
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
