import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { PostDataService } from '../../../post-data.service';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-take-new',
  templateUrl: './take-new.page.html',
  styleUrls: ['./take-new.page.scss'],
})
export class TakeNewPage implements OnInit {
  No;
  Unit;
  UnitPrice;
  Sum;
  EmpID;
  CusID;
  JobID;
  ProID;
  AsID;
  Remark;
  Device;
  Machine;
  Reference;
  EngineerTel;
  list;

  constructor(private navParams: NavParams,
    public modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private postDataService: PostDataService) {

    this.JobID = this.navParams.data.JobID;
    this.CusID = this.navParams.data.CusID;
    this.EmpID = this.navParams.data.EmpID;
    this.Reference = this.navParams.data.Reference;
    this.EngineerTel = this.navParams.data.EngineerTel;
    console.log(this.JobID, this.CusID,this.EmpID,this.Reference);
    
    let params = {
      Type: "Machine",
    }
    this.postDataService.PostCus(params).then(Machine => {
      this.Machine = Machine;
    });

  }

  ngOnInit() {
   
  }

  close() {
    this.modalController.dismiss(this.JobID);
  }

  PostSpare() {
    if (this.ProID != null && this.AsID != null && this.No != null) {
      let params = {
        EmpID: this.EmpID,
        CusID: this.CusID,
        JobID: this.JobID,
        ProID: this.ProID,
        AsID: this.AsID,
        Unit: this.Unit,
        Qty: this.No,
        Reference: this.Reference,
        Remark: this.Remark,
        EngineerTel:this.EngineerTel,
        Type: "Job",
      }
      console.log(params);
      this.postDataService.PostCus(params).then(JobID => {
        this.JobID = JobID
        console.log(JobID); 
        this.modalController.dismiss(this.JobID,this.list);
      });
    }else if (this.ProID == null){
      this.alertMachine();
    }else if (this.AsID == null){
      this.alertDevice();
    }else if (this.No == null || this.No == ""){
      this.alertQty();
    }
    }
    
getProId(value) {
    this.ProID = value.detail.value;
    console.log(this.ProID);
    let params = {
      ProID: this.ProID,
      EmpID:this.EmpID,
      Type: "Device",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(Device => {
      this.Device = Device;
    });
  }

  getAsID(value) {
    this.AsID = value.detail.value
    console.log(this.AsID);
    console.log(value);
  }

  //#region alertMachine
  async alertMachine() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณาเลิอกประเภทเครื่อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  //#endregion

    //#region alertDevice
    async alertDevice() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'กรุณาเลิอกอะไหล่',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion

    //#region alertQty
    async alertQty() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'กรุณากรอกจำนวนที่ต้องการเบิก',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
}

