import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController, Platform, IonList } from '@ionic/angular';
import { PostDataService } from '../post-data.service';
import { NavController, LoadingController } from '@ionic/angular';
import { StorageService, User } from '../storage.service';
import { Network } from '@ionic-native/network/ngx';
import { AuthenticationService } from '../auth/authentication.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  disconnectSubscription;
  connectSubscription;
  text ="";
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
    sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,) {    
      this.network.onDisconnect().subscribe(() => {
        this.text = "...กรุณาเชื่อมต่ออินเทอร์เน็ต..."        
      });

    setTimeout(() => {
      this.ngOnInit();
      // this.checkNetwork();
    }, 500);

    this.user = [];
    this.route.queryParams.subscribe(params => {
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['/menu/overview']);
        } else {
          this.router.navigate(['login']);
        }
      });
      
    });
    
  }
  //#endregion


  //#region Check Network
  checkNetwork() {
    this.network.onDisconnect().subscribe(() => {
      alert('network was disconnected :-(');
    });
    this.network.onConnect().subscribe(() => {
      alert('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      
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
 