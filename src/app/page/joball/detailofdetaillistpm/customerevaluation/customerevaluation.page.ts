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
  getworkclose;
  workclose;

  constructor(private postDataService: PostDataService,
    public modalController: ModalController,
    public alertController: AlertController,
    private navParams: NavParams, ) {

    console.table(this.navParams);
    this.resolution = this.navParams.data.resolution;
    this.resolutiondetail = this.navParams.data.resolutiondetail;
    this.installID = this.navParams.data.installID
    this.jobtype = this.navParams.data.jobtype
    this.planID = this.navParams.data.planID
    console.log(this.resolution);

    if (this.jobtype == "CM") {
      let params = {
        installID: this.installID,
        jobtype: "getresolution"
      }
      console.log(params);
      this.postDataService.SaveCaseAll(params).then(data => {
        this.data = data
        console.log(data);
      });
      let workclose = {
        planID:this.planID,
        installID: this.installID,
        jobtype: "getworkclose"
      }
      console.log(params);
      this.postDataService.SaveCaseAll(workclose).then(data => {
        this.getworkclose = data
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
        this.workclose = this.detail.remark
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
if (type == 'work') {
  this.workclose = value.detail.value
  console.log(this.workclose);
}
   
  }
  async submit() {
    console.log(this.resolution);
    console.log(this.resolutiondetail);
    console.log(this.workclose);
    
    if (this.jobtype == "CM") {
      if (this.resolutiondetail == null || this.resolutiondetail == "") {
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'กรุณากรอกรายละเอียดของปัญหา',
          buttons: ['OK']
        });

        await alert.present();
      }
    } 
      if (this.TecComment == null || this.TecComment == "") {
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'กรุณากรอกความคิดเห็นที่มีต่อร้าน',
          buttons: ['OK']
        });

        await alert.present();
      } else {
        let params = {
          resolution: this.resolution,
          resolutiondetail: this.resolutiondetail,
          workclose: this.workclose,
          TecComment: this.TecComment
        }
        this.modalController.dismiss(params);
      }    
  }
}
