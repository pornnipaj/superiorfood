import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PostDataService } from '../post-data.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = "test"; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "db.db"; // DB name
  readonly table_name:string = "user"; // Table name
  name;
  username;
  position;
  empid;
  workall;
  workfinish;
  data;
  user;
  status;
  constructor(public DataService: AuthServiceService,
    public alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    public postDataService: PostDataService,
    public navCtrl: NavController, 
    private platform: Platform,
    private sqlite: SQLite) {

    this.user = [];

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
        this.createTable();
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

  
  login() {
    console.log(this.user.username);
    console.log(this.user.password);

    this.postDataService.login(this.user).then(form => {
      console.log('form', form);
    });

    this.DataService.getuser(this.user.username, this.user.password).subscribe(data => {
      this.data = data;
      console.log('Data Returner', this.data);
      for (let i = 0; i < this.data.length; i++) {
        this.status = this.data[i].Status;
        this.name = this.data[i].Name;
        this.username = this.data[i].Username;
        this.position = this.data[i].Position;
        this.workall = this.data[i].WorkAll;
        this.workfinish = this.data[i].WorkFinish;
        this.data.empID = this.data[i].empID;
        this.status = this.data[i].Status;
        this.check(data);
        this.insertRow();
      }
    });    
      }

      insertRow() {
        this.data.user = this.user;
        this.data.username = this.username;
        this.data.position = this.position;
        this.data.empid = this.empid;
        alert(this.data.user);

        this.databaseObj.executeSql('INSERT INTO user VALUES (?,?,?,?)', [this.data.name,this.data.username,this.data.emp_id,this.data.empid])
            .then(() => {
              alert(this.data);
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
            alert(this.row_data.push(res.rows.item(i)))
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  
  ngOnInit() {

    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // console.log(this.screenOrientation.type);
  }

  // async login() {
  //   console.log(this.username);
  //   console.log(this.password);
  //   if  (this.username == "admin" && this.password == "wingplus") {
  //     window.location.href="/menu";
  //   }
  //   else{
  //     const alert = await this.alertController.create({
  //       message: 'รหัสผ่านไม่ถูกต้อง',
  //       buttons: ['OK']
  //     });

  //     await alert.present();
  //   }
  //   // this.DataService.insert(this.form).then((data:any) => {
  //   //   console.log(data);
  //   // });
  // }

  async check(data){
  if (this.status == true) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };    
    this.navCtrl.navigateForward(['/menu/overview'], navigationExtras);
  }
  if (this.status == false) {
    const alert = await this.alertController.create({
      message: 'รหัสผ่านไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
}

  // show() {
  //   this.DataService.getuser(this.user.username, this.user.password).subscribe(data => {
  //     this.data = data;
  //     console.log('Data Returner', this.data);
  //   });
  // }
}
