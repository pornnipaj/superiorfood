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

  constructor(public modalController: ModalController,
    navParams: NavParams,
    private postDataService:PostDataService) { 

      this.CusID = (navParams.get('cusID'))
      this.EmpID = (navParams.get('EmpID'))
      this.ProID = (navParams.get('ProID'))
      this.JobID = (navParams.get('JobID'))
      console.log(this.JobID);
      
      this.Sum = this.No * this.UnitPrice;
      let params = {
        ProID: this.ProID,
        Type: "Device",
      }
      console.log(params);
      this.postDataService.PostCus(params).then(Device => {
        this.Device = Device;
        console.log(Device);
      });
    }

  ngOnInit() {
    
  }
  close() {
    this.modalController.dismiss();
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
      JobID: this.JobID,
      ProID: this.ProID,
      AsID: this.AsID,
      Unit: this.Unit,
      Qty: this.No,
      UnitPrice: this.UnitPrice,
      Amount: this.Sum,
      Remark: this.Remark,
      Type: "jobDevice",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(Device => {
      this.Device = Device;
      console.log(Device);
    });

  }
  getAsID(value){
    this.AsID = value.detail.value
    console.log(this.AsID); 
    console.log(value);      

  }
  
}
