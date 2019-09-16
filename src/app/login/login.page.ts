import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PostDataService } from '../post-data.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string
  password: string
  data;
  user;
  status;
  constructor(public DataService: AuthServiceService,
    public alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    public postDataService: PostDataService,
    public navCtrl: NavController, ) {

    this.user = [];
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
  login() {
    this.user.username = this.username;
    this.user.password = this.password;

    this.postDataService.login(this.user).then(form => {
      console.log('form', form);
    });

    this.DataService.getuser(this.user.username, this.user.password).subscribe(data => {
      this.data = data;
      // console.log('Data Returner', this.data);
      for (let i = 0; i < this.data.length; i++) {
        this.status = this.data[i].Status;
        // console.log(this.status);
        this.check(data);
      }
    });
    
  }

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
