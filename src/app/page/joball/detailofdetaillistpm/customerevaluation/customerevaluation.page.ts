import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';

@Component({
  selector: 'app-customerevaluation',
  templateUrl: './customerevaluation.page.html',
  styleUrls: ['./customerevaluation.page.scss'],
})
export class CustomerevaluationPage implements OnInit {
  resolution;
  resolutiondetail="";
  data;
  installID;
  TecComment="";
  jobtype;
  planID;
  detail;
  header;
  empID;
  workclose;

  constructor(private postDataService: PostDataService,
    public modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private navParams: NavParams, ) {

    console.table(this.navParams);
    this.resolution = this.navParams.data.resolution;
    this.resolutiondetail = this.navParams.data.resolutiondetail;
    this.installID = this.navParams.data.installID
    this.jobtype = this.navParams.data.jobtype
    this.planID = this.navParams.data.planID
    this.header = this.navParams.data.header
    this.empID = this.navParams.data.empID
    this.workclose = this.navParams.data.workclose
    console.log(this.workclose);

    if (this.jobtype == "CM" && this.workclose != 'workclose' || this.jobtype == "CM" && this.workclose == 'workclose') {
      let params = {
        installID: this.installID,
        jobtype: "getresolution"
      }
      console.log(params);
      this.postDataService.SaveCaseAll(params).then(data => {
        this.data = data
        console.log(data);
      });      
    }
    let params = {
      installID: this.installID,
      planID: this.planID,
      jobtype: "detailtran"
    }
    console.log(params);
    this.postDataService.SaveCaseAll(params).then(detail => {
      this.detail = detail
      console.log(this.detail);
      this.TecComment = this.detail.TecComment 
      if (this.jobtype == "CM") {
        this.resolution = this.detail.ResolutionID
        this.resolutiondetail = this.detail.Resolutiondetail
      }   else{
        this.resolutiondetail = "resolutiondetail"
      }            
    });

  }

  ngOnInit() {
    
  }
  close() {
    this.modalController.dismiss();
  }
  onChange(value,type) {
    console.log(value);
if (type == 'resolution') {
  this.resolution = value.detail.value
  console.log(this.resolution);
}
   
  }
  async submit() {
    console.log(this.resolution);
    console.log(this.resolutiondetail);
    
    if (this.jobtype == "CM" && this.workclose != 'workclose') {
      if (this.resolutiondetail == null || this.resolutiondetail == "") {
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'กรุณากรอกรายละเอียดของปัญหา',
          buttons: ['OK']
        });

        await alert.present();
      }else{
        let params = {
          installID: this.installID,
          planID: this.planID,
          empID:this.empID,
          workclose:this.workclose,
          jobtype: "saveclosecustomer",
          resolution:this.resolution,
          resolutiondetail:this.resolutiondetail
        }
        console.log(params);
        this.postDataService.SaveCaseAll(params).then(data => {
          if (data == true) {
            this.alertSuccess();
            this.navCtrl.navigateForward(['/menu/overview']);
            this.modalController.dismiss();
          }
          if (data == false) {
            this.alertFail();
          }
        });
      }
    }else{ 
      if (this.TecComment == null || this.TecComment == "") {
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'กรุณากรอกความคิดเห็น',
          buttons: ['OK']
        });

        await alert.present();
      } else {
        let params = {
          resolution: this.resolution,
          resolutiondetail: this.resolutiondetail,
          TecComment: this.TecComment
        }
        this.modalController.dismiss(params);
      }   
    } 
  }

    //#region alert success
    async alertSuccess() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'บันทึกสำเร็จ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
  
    //#region alert success
    async alertFail() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'บันทึกไม่สำเร็จ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
  
}
