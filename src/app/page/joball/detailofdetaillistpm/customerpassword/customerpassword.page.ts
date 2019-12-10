import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-customerpassword',
  templateUrl: './customerpassword.page.html',
  styleUrls: ['./customerpassword.page.scss'],
})
export class CustomerpasswordPage implements OnInit {
  getpassword;
  code="";

  constructor(private modalController: ModalController,
    public alertController: AlertController,
    private navParams: NavParams) { }

    ngOnInit() {
      console.table(this.navParams);
      this.getpassword = this.navParams.data.password;
      
    }
   
    async closeModal() {
      await this.modalController.dismiss(this.code);
    }

    async submit(){
      console.log(this.code);
      console.log(this.getpassword);
      
      
      if (this.code == this.getpassword) {    
        await this.modalController.dismiss(this.code);
      }

      if (this.code != this.getpassword) {
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'รหัสยืนยันตัวตนลูกค้าไม่ถูกต้อง',
          buttons: ['OK']
        });
    
        await alert.present();
      }
      
    }
  }