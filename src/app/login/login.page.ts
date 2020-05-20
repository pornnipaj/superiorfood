import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController, Platform, IonList } from '@ionic/angular';
import { PostDataService } from '../post-data.service';
import { NavController, LoadingController } from '@ionic/angular';
import { StorageService, User } from '../storage.service';
import { Network } from '@ionic-native/network/ngx';
import { AuthenticationService } from '../auth/authentication.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

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
  type;
  url: SafeResourceUrl;
  Tablet;
  link;
  //#endregion

  //#region constructor
  @ViewChild('mylist', { static: false }) mylist: IonList;
  constructor(public alertController: AlertController,
    public loadingController: LoadingController,
    public postDataService: PostDataService,
    public navCtrl: NavController,
    private platform: Platform,
    private storageService: StorageService,
    private network: Network,
    private authService: AuthenticationService,
    private DataService: AuthServiceService,
    sanitizer: DomSanitizer,) {
    this.checkNetwork();
    setTimeout(() => {
      this.ngOnInit();
    }, 500);

    this.user = [];
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://superior2.wingplusweb.com/Web/CK_Evaluation.aspx' + '?empID=b99f4959-d1e7-44ec-98e2-07a6d0247a6b' + '&serviceplanid=74179' + '&installplanid=f2682a00-469c-49d6-9fc6-a371c5c21781');

  }
  //#endregion


  //#region Check Network
  checkNetwork() {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();
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

  //#region login
  login() {
    this.load();
    this.user.email = this.user.email;
    this.user.password = this.user.password;
    this.user.type = "eservice"
    console.log(this.user);
    
    this.postDataService.login(this.user).then(data => {
      this.data = data;
      console.log(this.data);
      
      for (let i = 0; i < this.data.length; i++) {
        this.status = this.data[i].Status;
        this.name = this.data[i].Name;
        this.username = this.data[i].Username;
        this.position = this.data[i].Position;
        this.workall = this.data[i].WorkAll;
        this.workfinish = this.data[i].WorkFinish;
        this.empID = this.data[i].empID;
        this.role = this.data[i].roleID;
        this.Tablet = this.data[i].Tablet;
        this.link = this.data[i].Link;
      }
      if (this.status == false) {
        this.false();
      }
      else if (this.Tablet == "On" && this.status == true) {
        this.true();
      }
      else  {
        this.access();
      }
    });
  }
  //#endregion

  //#region check  
  async false() {
    const alert = await this.alertController.create({
      message: 'อีเมลล์ หรือ รหัสผ่านไม่ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
    this.storageService.resetLocalStorage();
  }

  async access() {
    const alert = await this.alertController.create({
      message: 'ระบบยังไม่เปิดใช้งาน',
      buttons: ['OK']
    });
    await alert.present();
    this.storageService.resetLocalStorage();
  }
  true() {
    this.newUser.id = 1;
    this.newUser.name = this.name;
    this.newUser.username = this.username;
    this.newUser.position = this.position;
    this.newUser.empID = this.empID;
    this.newUser.role = this.role;
    this.newUser.status = this.status;
    this.newUser.link = this.link;
    console.log(this.newUser);
    
    this.authService.login(this.newUser);
    this.storageService.addUser(this.newUser).then(item => {
      this.newUser = <User>{};
    });
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
    //this.storageService.resetLocalStorage();
    // this.checkspace();
  }
  //#endregion

}
