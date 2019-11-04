import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController, Platform, IonList } from '@ionic/angular';
import { PostDataService } from '../post-data.service';
import { NavController, LoadingController } from '@ionic/angular';
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
  role;
  items: User[] = [];
  newUser: User = <User>{};
  newtest;
  //#endregion

  //#region constructor
  @ViewChild('mylist', { static: false }) mylist: IonList;
  constructor(public alertController: AlertController,
    public loadingController: LoadingController,
    public postDataService: PostDataService,
    public navCtrl: NavController,
    private platform: Platform,
    private storageService: StorageService,
    private DataService:AuthServiceService) {
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
    this.platform.ready().then(() => {
      this.loadItems();
    });

    this.user = [];

    this.DataService.getnew().subscribe(data => {
      console.log(data);
      alert("ข่าว" + data)
      this.data = data;
    });

    this.DataService.getnewTest().subscribe(newtest => {
      console.log(newtest);
      alert("ข่าวtest" + newtest)
      this.newtest = newtest;
    });
  }
  //#endregion

  //#region load
  async load() {
    const loading = await this.loadingController.create({
      message: 'กำลังเข้าสู่ระบบ...',
      duration: 500,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
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

  //#region login
  login() {
    this.load();
    this.user.email = this.user.email;
    this.user.password = this.user.password;
    this.postDataService.login(this.user).then(data => {
      this.data = data;
      console.log('Data Returner', this.data);
      alert("login" + data)
      for (let i = 0; i < this.data.length; i++) {
        this.status = this.data[i].Status;
        this.name = this.data[i].Name;
        this.username = this.data[i].Username;
        this.position = this.data[i].Position;
        this.workall = this.data[i].WorkAll;
        this.workfinish = this.data[i].WorkFinish;
        this.empID = this.data[i].empID;
        this.status = this.data[i].Status;
        this.role = this.data[i].HeadTechnician;
        this.check();
      }
    });
  }
  //#endregion

  //#region check  
  async check() {
    if (this.status == true) {
      this.newUser.id = 1;
      this.newUser.name = this.name;
      this.newUser.username = this.username;
      this.newUser.position = this.position;
      this.newUser.empID = this.empID;
      this.newUser.role = this.role;

      this.storageService.addUser(this.newUser).then(item => {
        this.newUser = <User>{};
      });
      this.navCtrl.navigateForward(['/menuhead/overview']);
    }    
    // if (this.role == true) {
    //   this.navCtrl.navigateForward(['/menuhead/overview']);
    // }
    // if (this.role == false) {
    //   this.navCtrl.navigateForward(['/menu/overview']);
    // }
    if (this.status == false) {
      const alert = await this.alertController.create({
        message: 'อีเมลล์ หรือ รหัสผ่านไม่ถูกต้อง',
        buttons: ['OK']
      });
      await alert.present();
      this.storageService.resetLocalStorage();
    }
  }
  //#endregion

  //#region checkspace
  checkspace() {
    cordova.exec(function (result) {
      // alert("Free Disk Space: " + result);
    }, function (error) {
      // alert("Error: " + error);
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
