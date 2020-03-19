import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController  } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';

@Component({
  selector: 'app-customerpassword',
  templateUrl: './customerpassword.page.html',
  styleUrls: ['./customerpassword.page.scss'],
})
export class CustomerpasswordPage implements OnInit {
  getpassword;
  Cuscomment="";
  code="";
  installID;
  planID;
  data;
  type;

  constructor(private modalController: ModalController,
    public alertController: AlertController,
    private postDataService: PostDataService,
    private navParams: NavParams) { 

      console.table(this.navParams);
      this.getpassword = this.navParams.data.password;
      this.planID = this.navParams.data.planID;
      this.installID = this.navParams.data.installID;
      this.type = this.navParams.data.type
      let params = {
        installID: this.installID,
        planID: this.planID,
        jobtype: "detailtran"
      }
      console.log(params);
      this.postDataService.SaveCaseAll(params).then(data => {
        this.data = data
        this.Cuscomment = this.data.CusComment
        console.log(this.data.CusComment);
      });
    }

    ngOnInit() {
      
      
    }
   
    async closeModal() {  
      await this.modalController.dismiss(0);
    }

    async submit(){
      console.log(this.code);
      console.log(this.getpassword);
      if (this.type != 'INSTALL') {
        if (this.Cuscomment == "" || this.Cuscomment == null || this.code != this.getpassword) {
          if(this.Cuscomment == "" || this.Cuscomment == null){
            const alert = await this.alertController.create({
              header: 'แจ้งเตือน',
              message: 'กรุณากรอกความคิดเห็น',
              buttons: ['OK']
            });
        
            await alert.present();
          }
          else if (this.code != this.getpassword) {
            const alert = await this.alertController.create({
              header: 'แจ้งเตือน',
              message: 'รหัสยืนยันตัวตนลูกค้าไม่ถูกต้อง',
              buttons: ['OK']
            });
        
            await alert.present();
          }
        }
        
        if (this.code == this.getpassword && this.Cuscomment != "" && this.Cuscomment != null) {    
          let params = {
            code: this.code,
            Cuscomment: this.Cuscomment
          }
          await this.modalController.dismiss(params);
        }        
      }else{
        let params = {
          Cuscomment: this.Cuscomment
        }
        this.modalController.dismiss(params);
      }
      }
      
  }