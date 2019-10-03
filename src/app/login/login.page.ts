import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController, Platform, IonList } from '@ionic/angular';
import { PostDataService } from '../post-data.service';
import { NavController } from '@ionic/angular';
import { StorageService, User } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //#region data

  name;
  username;
  position;
  empID;
  workall;
  workfinish;
  data;
  user;
  status;
  items: User[] = [];
  newUser: User = <User>{};

  //#endregion

  //#region constructor

  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(public alertController: AlertController,
    public postDataService: PostDataService,
    public navCtrl: NavController,
    private platform: Platform,
    private storageService: StorageService) {

      setTimeout(() => {
        this.ngOnInit();
      }, 500);
      
    this.platform.ready().then(() => {
      this.loadItems();
    });

    this.user = [];
  }

  //#endregion


  //#region adddata to storage
  addUser() {
    this.newUser.id = 1;
    this.newUser.name = "name";
    this.newUser.username = "username";
    this.newUser.position = "position";
    this.newUser.empID = "empID";

    this.storageService.addUser(this.newUser).then(item => {
      this.newUser = <User>{};
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      // alert(items)
    });
  }

  deleteItem(user: User) {
    this.storageService.deleteUser(user.id).then(item => {
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }
  //#endregion

  //#region event click


  login() {
    this.user.email = this.user.email;
    this.user.password = this.user.password;

    this.postDataService.login(this.user).then(data => {
      this.data = data;
      console.log('Data Returner', this.data);
      for (let i = 0; i < this.data.length; i++) {
        this.status = this.data[i].Status;
        this.name = this.data[i].Name;
        this.username = this.data[i].Username;
        this.position = this.data[i].Position;
        this.workall = this.data[i].WorkAll;
        this.workfinish = this.data[i].WorkFinish;
        this.empID = this.data[i].empID;
        this.status = this.data[i].Status;
        this.check();
      }
    });  
    
  }

  async check() {
    if (this.status == true) {
      this.newUser.id = 1;
      this.newUser.name = this.name;
      this.newUser.username = this.username;
      this.newUser.position = this.position;
      this.newUser.empID = this.empID;

      this.storageService.addUser(this.newUser).then(item => {
        this.newUser = <User>{};
      });

      this.navCtrl.navigateForward(['/menu/overview']);
    }
    if (this.status == false) {
      const alert = await this.alertController.create({
        message: 'อีเมลล์ หรือ รหัสผ่านไม่ถูกต้อง',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  checkspace() {
    cordova.exec(function (result) {
      alert("Free Disk Space: " + result);
    }, function (error) {
      alert("Error: " + error);
    }, "File", "getFreeDiskSpace", []);

  }

  //#endregion

  //#region start

  ngOnInit() {
    this.storageService.resetLocalStorage();
    // this.checkspace();
    
  }

  //#endregion

}
