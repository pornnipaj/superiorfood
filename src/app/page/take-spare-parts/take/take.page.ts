import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';

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
  JobID;
  Machine;
  No;
  Unit;
  UnitPrice;
  Sum;
  AsID;
  Remark;
  JobDeviceID;
  item;
  ProductName;
  AssetNo;

  constructor(public modalController: ModalController,
    private navParams: NavParams,
    private postDataService: PostDataService,
    private storageService: StorageService) {

    this.item = (navParams.get('item'))
    this.JobID = this.item.JobID
    this.CusID = this.item.CusID
    this.JobDeviceID = this.item.JobDeviceID
    this.No = this.item.Qty
      this.Unit = this.item.Unit
      this.Remark = this.item.Remark
      this.AsID = this.item.AssetID
      this.ProductName = this.item.AssetType
      this.AssetNo = this.item.AssetNo
    console.log(this.item);

    this.Sum = this.No * this.UnitPrice;

    this.storageService.getUser().then(items => {
      for (let i = 0; i < items.length; i++) {
        this.EmpID = items[i].empID;
      }
    });

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
    this.modalController.dismiss();
  }
  onSum() {
    this.Sum = this.No * this.UnitPrice
  }
  PostSpare() {
    console.log(this.No);
    console.log(this.Unit);
    console.log(this.UnitPrice);
    console.log(this.Sum);
    let params = {
      EmpID: this.EmpID,
      CusID: this.CusID,
      JobID: this.JobID,
      JobDeviceID: this.JobDeviceID,
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
}
