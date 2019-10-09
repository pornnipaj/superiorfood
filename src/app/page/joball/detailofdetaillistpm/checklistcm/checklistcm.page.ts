import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-checklistcm',
  templateUrl: './checklistcm.page.html',
  styleUrls: ['./checklistcm.page.scss'],
})
export class ChecklistcmPage implements OnInit {

  //#region data

  empID;
  planID;
  installID;
  InstallPlanName;
  ItemsName;
  ItemCode;
  SerialNo;
  cat;
  public anArray: any = [];
  data;
  serial = "";
  isShowType = true;
  isShowDevice = false;
  isShowSpare = false;
  isShowSpareDetail = false;
  isShowDeviceDetail = false;
  sparepart = "";

  //#endregion

  //#region constructor

  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public navCtrl: NavController,
    sanitizer: DomSanitizer, ) {
    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install;
    this.InstallPlanName = this.navParams.data.InstallPlanName;
    this.ItemsName = this.navParams.data.ItemsName;
    this.ItemCode = this.navParams.data.ItemCode;
    this.SerialNo = this.navParams.data.SerialNo;
    this.cat = this.navParams.data.Cat;
    console.log(this.ItemsName, this.ItemCode, this.SerialNo);
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion

  //#region click

  close() {
    this.modalController.dismiss(0);
  }

  chang(type) {
    if (type == "spare") {
      this.isShowType = false;
      this.isShowSpare = true;
    }
    if (type == "device") {
      this.isShowType = false;
      this.isShowDevice = true;
    }
  }

  //#endregion

  //#region device

  search() {
    if (this.serial == "") {
      alert("กรุณากรอก S/N")
    }
    if (this.serial == this.SerialNo) {
      alert("S/N ตรงกับเครื่องเดิม")
    }
    if (this.serial != this.SerialNo && this.serial != "") {
      this.isShowDeviceDetail = true;
      this.isShowSpare = false;
    }
  }

  //#endregion

  //#region spare

  Add() {
    this.anArray.push({ 'value': this.sparepart });
    this.isShowSpareDetail = true;
    if (this.sparepart == "") {
      alert("กรุณากรอก S/N")
      this.isShowSpareDetail = false;
    }
    // if (this.sparepart != "sparepart" && this.sparepart != "") {
    //   alert("S/N ไม่ตรงกับเลขในสต็อก")   
    //   this.isShowSpareDetail = false;
    // }
  }

  remove(item) {
    console.log(item.value);
    console.log(this.anArray);

    this.anArray.splice(item, 1)

    if (this.anArray == "") {
      this.isShowSpareDetail = false;
    }

  }

  //#endregion

} 
