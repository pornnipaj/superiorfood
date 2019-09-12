import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username :string;
    password : string;
    
  constructor(public DataService: AuthServiceService,public alertController: AlertController) {
    
   }
  
  ngOnInit() {
  }

  async login() {
    console.log(this.username);
    console.log(this.password);
    if  (this.username == "admin" && this.password == "wingplus") {
      window.location.href="/menu";
    }
    else{
      const alert = await this.alertController.create({
        message: 'รหัสผ่านไม่ถูกต้อง',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    // this.DataService.insert(this.form).then((data:any) => {
    //   console.log(data);
    // });
  }

}
