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
  spare;
  InstallPlanNameNew;
  ItemsNameNew;
  ItemCodeNew;
  SerialNoNew;
  cat;
  public anArray: any = [];
  data;
  dataspare;
  serial = "";
  isShowType = true;
  isShowDevice = false;
  isShowSpare = false;
  isShowSpareDetail = false;
  isShowDeviceDetail = false;
  isEditDevice = false;
  isEditSpare = false;
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
  listreal = [];
  spareList = [];
  list;
  stock;
  No;
  true;
  AsList = [];
  status;
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
    this.modalController.dismiss();
  }

  GetSpareTran() {
    let param = {
      installID: this.installID,
      typedevice: "GetSpareTran",
      empID: this.empID,
      planID: this.planID,
    }
    this.postDataService.postdevice(param).then(data => {
      this.dataspare = data
      console.log(this.dataspare);
      for (let p = 0; p < this.dataspare.length; p++) {
        this.spareList.push(
          {
            AssID: this.dataspare[p].AssID,
            SKUID: this.dataspare[p].SKUID,
            SKUCode: this.dataspare[p].SKUCode,
            Name: this.dataspare[p].Name,
            No: this.dataspare[p].No,
            Unit: this.dataspare[p].Unit,
            Serial: this.dataspare[p].Serial,
            Balance: this.dataspare[p].Balance,
          });
        console.log(this.spareList);
      }
    });
  }
  GetSpareCM() {
    let params = {
      planID: this.planID,
      installID: this.installID,
      typedevice: "GetSpareCM",
      empID: this.empID
    }
    this.postDataService.postdevice(params).then(data => {
      this.data = data
      for (let j = 0; j < this.data.length; j++) {
        this.listreal.push(
          {
            AssID: this.data[j].AssID,
            SKUID: this.data[j].SKUID,
            SKUCode: this.data[j].SKUCode,
            Name: this.data[j].Name,
            No: this.data[j].No,
            Unit: this.data[j].Unit,
            Serial: this.data[j].Serial,
            Balance: this.data[j].Balance,
          });
      }
      console.log(this.listreal);
    });
  }

  chang(type) {
    if (type == "sparepart") {
      this.isShowType = false;
      this.isShowSpare = true;
      this.isShowDevice = false;
      this.isShowDeviceDetail = false;
      this.isEditSpare = true;
      this.GetSpareTran();
      this.GetSpareCM();
      // }      
    }
    if (type == "device") {
      this.isShowType = false;
      this.isShowDevice = true;
      this.isShowSpare = false;
      let devicetran = {
        planID: this.planID,
        installID: this.installID,
        typedevice: "GetDeviceTran",
        empID: this.empID
      }
      this.postDataService.postdevice(devicetran).then(status => {
        this.status = status
        console.log(this.status);
        if (this.status == false) {
          let params = {
            installID: this.installID,
            typedevice: "GetDevice",
            empID: this.empID
          }
          this.postDataService.postdevice(params).then(data => {
            this.data = data
          });
        } else {
          this.data = this.status;
        }
      });
    }
    if (type == "non") {
      let devicetran = {
        planID: this.planID,
        installID: this.installID,
        typedevice: "non",
        empID: this.empID
      }
      this.postDataService.postdevice(devicetran).then(status => {
        this.status = status
        console.log(this.status);
      });

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
    this.isEditDevice = true;
    console.log(this.serial);
    console.log(this.SerialNo);

    if (this.serial == "") {
      this.isShowDeviceDetail = false;
      let params = {
        installID: this.installID,
        typedevice: "GetDevice",
        empID: this.empID
      }
      this.postDataService.postdevice(params).then(asset => {
        this.data = asset
        console.log(this.asset);
      });
    }
    else if (this.serial == this.SerialNo) {
      this.alertMeanSN();
    }
    else if (this.serial != this.SerialNo) {
      let params = {
        installID: this.installID,
        typedevice: "GetDevice",
        empID: this.empID
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
            this.isShowDeviceDetail = false;
            this.isShowSpare = false;
            this.chkdata = 1;
            console.log(1);
            break;
          }
        }
        if (this.chkdata == 1) {
          let params = {
            installID: this.installID,
            typedevice: "SearchDevice",
            empID: this.empID,
            skuID: this.serial
          }
          this.postDataService.postdevice(params).then(asset => {
            this.data = asset
          });
        }
        if (this.chkdata == 0) {
          this.alertNotSearch();
        }
      });
    }
  }

  //#endregion

  //#region EditDevice
  EditDevice() {
    this.isEditDevice = true;
    let params = {
      installID: this.installID,
      typedevice: "GetDevice",
      empID: this.empID
    }
    this.postDataService.postdevice(params).then(data => {
      this.data = data
    });
  }

  EditSpare() {
    this.isEditSpare = true;
  }
  //#endregion

  select(i, item) {
    this.listreal.splice(i, 1);
    this.spareList.push(
      {
        AssID: item.AssID,
        SKUID: item.SKUID,
        SKUCode: item.SKUCode,
        Name: item.Name,
        No: item.No,
        Unit: item.Unit,
        Serial: item.Serial,
        Balance: item.Balance,
      });
  }
  //#region spare

  Add() {
    if (this.sparepart == "" || this.sparepart == null) {
      this.listreal.splice(0);
      let params = {
        planID: this.planID,
        installID: this.installID,
        typedevice: "GetSpareCM",
        empID: this.empID
      }
      this.postDataService.postdevice(params).then(data => {
        this.data = data
        for (let j = 0; j < this.data.length; j++) {
          this.listreal.push(
            {
              AssID: this.data[j].AssID,
              SKUID: this.data[j].SKUID,
              SKUCode: this.data[j].SKUCode,
              Name: this.data[j].Name,
              No: this.data[j].No,
              Unit: this.data[j].Unit,
              SerialNo: this.data[j].Serial,
              Balance: this.data[j].Balance,
            });
        }
      });
    } else {
      let params = {
        installID: this.installID,
        typedevice: "Searchsku",
        empID: this.empID,
        skuID: this.sparepart
      }
      this.postDataService.postdevice(params).then(asset => {

        this.data = asset
        console.log(this.data);

        if (this.data == false) {
          this.alertNotPart();
        } else {
          this.listreal.splice(0);
          for (let j = 0; j < this.data.length; j++) {
            this.listreal.push(
              {
                AssID: this.data[j].AssID,
                SKUID: this.data[j].SKUID,
                SKUCode: this.data[j].SKUCode,
                Name: this.data[j].Name,
                No: this.data[j].No,
                Unit: this.data[j].Unit,
                Serial: this.data[j].Serial,
                Balance: this.data[j].Balance,
              });
          }
        }
      });
    }
  }

  remove(index, item) {
    this.spareList.splice(index, 1);
    this.listreal.push(
      {
        AssID: item.AssID,
        SKUID: item.SKUID,
        SKUCode: item.SKUCode,
        Name: item.Name,
        No: item.No,
        Unit: item.Unit,
        Serial: item.Serial,
        Balance: item.Balance,
      });
  }
  //#endregion

  //#region barcode

  scan(type) {
    if (type == 'device') {
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        let barcode = barcodeData
        this.serial = barcode.text
        this.search();
      }).catch(err => {
        console.log('Error', err);
      });
    } else if (type == 'spare') {
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        let barcode = barcodeData
        this.sparepart = barcode.text
        this.Add();
      }).catch(err => {
        console.log('Error', err);
      });
    }

  }

  //#endregion

  //#region Add Spare
  AddCM(type, item) {
    if (type == "Devices") {
      let params = {
        planID: this.planID,
        installID: this.installID,
        idold: item.assetid,
        idnew: item.AssetID,
        typedevice: "SaveDeviceCM",
        empID: this.empID,
      }
      console.log(params);
      this.postDataService.postdevice(params).then(asset => {
        console.log(asset);
      });

      let param = {
        typedevice: "device"
      }
      console.log(param);
      this.modalController.dismiss(param);
    }
    else if (type == "Spareparts") {
      let params = {
        planID: this.planID,
        installID: this.installID,
        spare: this.spareList,
        typedevice: "SaveSpareCM",
        empID: this.empID,
      }
      console.log(params);

      this.postDataService.postdevice(params).then(asset => {
        console.log(asset);
      });

      let param = {
        typedevice: "sparepart"
      }
      console.log(params);
      this.modalController.dismiss(param);
    }
  }
  //#endregion

  check() {
    console.log();
    for (let i = 0; i < this.listreal.length; i++) {
      this.AsList.push(
        {
          AssID: this.listreal[i].AssID,
          SKUID: this.listreal[i].SKUID,
          SKUCode: this.listreal[i].SKUCode,
          SerialNo: this.listreal[i].SerialNo,
          Name: this.listreal[i].Name,
          Qty: this.listreal[i].No,
          Unit: this.listreal[i].Unit
        });
      console.log(this.AsList);
    }
    if (this.AsList.length > 0) {
      let params = {
        planID: this.planID,
        installID: this.installID,
        spare: this.AsList,
        typedevice: "SaveSpareCM",
        empID: this.empID,
      }
      console.log(params);

      this.postDataService.postdevice(params).then(asset => {
        console.log(asset);
      });

      let param = {
        typedevice: "sparepart"
      }
      console.log(params);
      this.modalController.dismiss(param);
    }
  }

  //#region alert
  async alertSN() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอก S/N',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertPt() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอก Part No.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertPartNo() {
    const alert = await this.alertController.create({
      message: 'Part No. ซ้ำ',
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

  async alertQty() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณากรอกจำนวนให้ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertNotPart() {
    const alert = await this.alertController.create({
      message: 'ไม่พบ Part No. นี้',
      buttons: ['OK']
    });
    await alert.present();
  }


} 
