import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PostDataService } from '../../../../post-data.service';
import { AlertController } from '@ionic/angular';

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
  asset;
  productname;
  installcode;
  installname;
  installserial;
  installtype;
  assetnew;
  assetold;
  chkdata;
  spareList = [];
  list;
  stock;
  No;
  //#endregion

  //#region constructor

  constructor(public modalController: ModalController,
    private barcodeScanner: BarcodeScanner,
    private navParams: NavParams,
    public navCtrl: NavController,
    public alertController: AlertController,
    private postDataService: PostDataService,
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

    this.stock = [];
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
    if (type == "sparepart") {
      this.isShowType = false;
      this.isShowSpare = true;
      this.isShowDevice = false;
    }
    if (type == "device") {
      this.isShowType = false;
      this.isShowDevice = true;
      this.isShowSpare = false;
    }
    if (type == "non") {
      let param = {
        typedevice: "non"
      }
      console.log(param);

      this.modalController.dismiss(param);
    }
  }

  //#endregion

  //#region device

  search() {
    console.log(this.serial);
    console.log(this.SerialNo);

    if (this.serial == "") {
      this.alertSN();
    }
    else if (this.serial == this.SerialNo) {
      this.alertMeanSN();
    }
    else if (this.serial != this.SerialNo) {

      let params = {
        installID: this.installID,
        typedevice: "GetDevice"
      }
      this.postDataService.postdevice(params).then(asset => {
        this.asset = asset
        this.chkdata = 0;
        console.log(this.asset);

        for (let i = 0; i < this.asset.length; i++) {
          const a = this.asset[i].SerialNo
          if (this.serial == a) {
            this.productname = this.asset[i].type;
            this.installcode = this.asset[i].AssetCode;
            this.installname = this.asset[i].AssetNo;
            this.installserial = this.asset[i].SerialNo;
            this.assetnew = this.asset[i].AssetID;
            this.assetold = this.asset[i].assetid;
            this.isShowDeviceDetail = true;
            this.isShowSpare = false;
            this.chkdata = 1;
            console.log(1);
            break;
          }
        }

        if (this.chkdata == 0) {
          this.alertNotSearch();
        }
      });
    }
  }

  //#endregion

  //#region spare

  Add() {
    if (this.sparepart == "") {
      this.alertSN();
    }
    if (this.sparepart.length > 0) {
      let params = {
        installID: this.installID,
        typedevice: "GetDevice"
      }
      this.postDataService.postdevice(params).then(asset => {
        this.asset = asset
        this.chkdata = 0;
        console.log(this.asset);

        for (let i = 0; i < this.asset.length; i++) {
          const a = this.asset[i].SerialNo
          if (this.sparepart == a) {
            this.productname = this.asset[i].type;
            this.installcode = this.asset[i].AssetCode;
            this.installname = this.asset[i].AssetNo;
            this.installserial = this.asset[i].SerialNo;
            this.assetnew = this.asset[i].AssetID;
            this.assetold = this.asset[i].assetid;
            let task = this.sparepart;
            let no = 1;
            this.spareList.push({SN:task,NO:no});
            this.sparepart = "";
            this.chkdata = 1;
            this.isShowSpareDetail = true;
            break;
        }
      }
      });
    }

    if (this.sparepart == "" || this.sparepart == null) { 
      this.alertSN();               
    }else if(this.chkdata == 0 ){
      this.alertStock();   
    }
  }

  remove(index) {
    this.spareList.splice(index, 1);
  }
  //#endregion

  //#region barcode

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let barcode = barcodeData
      this.serial = barcode.text
      this.sparepart = barcode.text
    }).catch(err => {
      console.log('Error', err);
    });
  }

  //#endregion
  //#region Add Spare
  AddCM(type) {
    if (type == "Device") {      
      let params = {
        planID: this.planID,
        installID: this.installID,
        idold: this.assetold,
        idnew: this.assetnew,
        typedevice: "device",
        empID: this.empID,
        sparepart: this.sparepart
      }
      console.log(params);
      this.postDataService.postdevice(params).then(asset => {
        console.log(asset);
      });
      let param = {
        idnew: this.assetnew,
        idold: this.assetold,
        typedevice: "device"
      }
      console.log(param);
      this.modalController.dismiss(param);
    }
    if (type == "Sparepart") {
      let param = {
        sparepart: this.spareList,        
        typedevice: "sparepart"
      }
      // console.log(param);
      console.log(this.spareList);
      this.list = JSON.stringify(this.spareList)
        console.log(this.list);
        console.log(JSON.parse(this.list));

      let params = {
        planID: this.planID,
        installID: this.installID,
        idold: this.assetold,
        idnew: this.assetnew,
        typedevice: "sparepart",
        empID: this.empID,
        spare: this.spareList
      
      }
      console.log(params);
      this.postDataService.postdevice(params).then(asset => {
        console.log(asset);
      });
      this.modalController.dismiss(param);
    }
  }
  //#endregion
  //#region alert
  async alertSN() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอก S/N',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertMeanSN() {
    const alert = await this.alertController.create({
      message: 'S/N ตรงกับเครื่องเดิม',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertNotSearch() {
    const alert = await this.alertController.create({
      message: 'ไม่พบ S/N นี้',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertStock() {
    const alert = await this.alertController.create({
      message: 'S/N ไม่ตรงกับเลขในสต็อก',
      buttons: ['OK']
    });

    await alert.present();
  }
  //#endregion
} 
