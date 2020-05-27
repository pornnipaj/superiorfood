import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { PostDataService } from '../../../post-data.service';
import { StorageService, User } from '../../../storage.service';

@Component({
  selector: 'app-changpassword',
  templateUrl: './changpassword.page.html',
  styleUrls: ['./changpassword.page.scss'],
})
export class ChangpasswordPage implements OnInit {

  pass;
  status;
  empID;
  type;
  items;

  constructor(public modalController: ModalController,
    public alertController: AlertController,
    public postDataService: PostDataService, 
    private storageService: StorageService) {
    this.pass = [];
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  ngOnInit() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
         console.log(this.empID);        
      }
    });
  }

  close() {
    this.modalController.dismiss();
  }

  chang(form) {
    console.log(form.value);
  }
  login() {
    console.log(this.pass.old);
    console.log(this.pass.new);
    console.log(this.pass.newretry);
    this.pass.old = this.pass.old;
    this.pass.new = this.pass.new;
    this.pass.newretry = this.pass.newretry;
    if (this.pass.new != this.pass.newretry) {
      this.alertFail();
    } else {
      this.pass.old = this.pass.old;
      this.pass.empID = this.empID;
      this.pass.new = this.pass.new;
      this.pass.type = "changpasss"
      console.log(this.pass);
      this.postDataService.changpassword(this.pass).then(status => {
        this.status = status;
        console.log(this.status);
        if (this.status == false) {
          this.alertFail();
        }if (this.status == true) {
          this.alertSuccess();
          this.modalController.dismiss();
        }
      });      
    }
  }

  async alertFail() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'รหัสผ่านไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'บันทึกรหัสผ่านสำเร็จ',
      buttons: ['OK']
    });

    await alert.present();
  }

}
