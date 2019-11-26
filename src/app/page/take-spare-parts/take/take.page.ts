import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { PostDataService } from '../../../post-data.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.page.html',
  styleUrls: ['./take.page.scss'],
})
export class TakePage implements OnInit {
  Device;
  ProID;
  CusID;
  EmpID;
  proID;
  JobID;
  Machine;
  No;
  Unit;
  UnitPrice;
  Sum;
  AsID;
  Remark;
  JobDeviceID;

  constructor(public modalController: ModalController,
    navParams: NavParams,
    private postDataService:PostDataService) { 

      this.CusID = (navParams.get('cusID'))
      this.EmpID = (navParams.get('EmpID'))
      this.JobID = (navParams.get('JobID'))
      this.JobDeviceID = (navParams.get('JobDeviceID'))

      console.log(this.JobID,this.JobDeviceID);
      
      this.Sum = this.No * this.UnitPrice;  
      
      let params = {
        Type: "Machine",
      }
      this.postDataService.PostCus(params).then(Machine => {
        this.Machine = Machine;
      });
      if (this.JobDeviceID != "") {
        alert("123")
      }
    }

  ngOnInit() {
    
  }
  close() {
    this.modalController.dismiss(this.JobID);
  }
  onSum(){
    this.Sum = this.No * this.UnitPrice
  }
  PostSpare(){
    console.log(this.No);
    console.log(this.Unit);
    console.log(this.UnitPrice);
    console.log(this.Sum);
    let params = {
      EmpID: this.EmpID,
      CusID: this.CusID,
      JobID: this.JobID,
      ProID: this.ProID,
      AsID: this.AsID,
      Unit: this.Unit,
      Qty: this.No,
      UnitPrice: this.UnitPrice,
      Amount: this.Sum,
      Remark: this.Remark,
      Type: "Job",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(JobID => {
     this.JobID = JobID;
      console.log(JobID);
      this.modalController.dismiss(this.JobID);
    });  

  }
  getProId(value) {
    this.ProID = value.detail.value;
    console.log(this.ProID);
    let params = {
      ProID: this.ProID,
      Type: "Device",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(Device => {
      this.Device = Device;
    });
  }
  getAsID(value){
    this.AsID = value.detail.value
    console.log(this.AsID); 
    console.log(value);   
  }
  
}
