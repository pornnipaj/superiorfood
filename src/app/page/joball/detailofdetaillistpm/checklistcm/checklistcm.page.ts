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
  InstallPlanNameNew;
  ItemsNameNew;
  ItemCodeNew;
  SerialNoNew;
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
    this.modalController.dismiss(0);
  }

  chang(type) {
    if (type == "sparepart") {      
    // let sparetran = {
    //   planID: this.planID,
    //   installID: this.installID,
    //   typedevice: "GetSpareTran",
    //   empID: this.empID
    // }
    // this.postDataService.postdevice(sparetran).then(status => {
    //   this.status = status
    //   console.log(this.status);        
    // });
      this.isShowType = false;
      this.isShowSpare = true;
      this.isShowDevice = false;
      // if (this.status != false) {
      //   for (let j = 0; j < this.status.length; j++) {
      //     this.listreal.push(
      //       {
      //         SKUID: this.data[j].SKUID,
      //         SKUCode: this.data[j].SKUCode,
      //         Name: this.data[j].Name,
      //         No: this.data[j].No,
      //         Unit: this.data[j].Unit,
      //         Balance: this.data[j].Balance,
      //       });
      //   }    
      //   console.log(this.listreal);
            
      // }else{
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
                SKUID: this.data[j].SKUID,
                SKUCode: this.data[j].SKUCode,
                Name: this.data[j].Name,
                No: this.data[j].No,
                Unit: this.data[j].Unit,
                Balance: this.data[j].Balance,
              });
          }
        });
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
      });     
      let params = {
        installID: this.installID,
        typedevice: "GetDevice",
        empID: this.empID
      }
      this.postDataService.postdevice(params).then(data => {
        this.data = data
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
    if (this.sparepart == "" || this.sparepart == null) {
      this.alertPt();
    }
    if (this.listreal.length > 0) {

      // let params = {
      //   installID: this.installID,
      //   typedevice: "GetSpareCM",
      //   empID: this.empID
      // }
      // this.postDataService.postdevice(params).then(data => {
      //   this.data = data
      //   this.chkdata = 0;
      //   console.log(this.asset);
      //   if (this.spareList.length == 0) {
      //     for (let i = 0; i < this.asset.length; i++) {
      //       const a = this.asset[i].SerialNo  
      //       if (this.sparepart == a) {
      //         this.productname = this.asset[i].type;
      //         this.installcode = this.asset[i].AssetCode;
      //         this.installname = this.asset[i].AssetNo;
      //         this.installserial = this.asset[i].SerialNo;
      //         this.asset = this.asset[i].AssetID;
      //         let task = this.sparepart;
      //         let no = 1;
      //         this.spareList.push({PartNo:task,NO:no,assetID:this.asset});
      //         this.sparepart = "";
      //         this.chkdata = 1;
      //         this.isShowSpareDetail = true;
      //         break;     
      //       }
      //     } 
      let params = {
        installID: this.installID,
        typedevice: "GetSpareCMAll",
        empID: this.empID,
        // SKUCode: this
      }
      this.postDataService.postdevice(params).then(data => {
        this.data = data
        this.chkdata = 0;
        console.log(this.data);
        console.log(this.listreal);

        for (let i = 0; i < this.data.length; i++) {
          const a = this.data[i].SKUCode
          if (this.sparepart == a) {
            for (let j = 0; j < this.listreal.length; j++) {
              const b = this.listreal[j].SKUCode
              if (this.sparepart != b) {
                console.log(this.data[i].SKUCode);
                this.listreal.push({
                  SKUID: this.data[i].SKUID,
                  SKUCode: this.data[i].SKUCode,
                  Name: this.data[i].Name,
                  No: this.data[i].No,
                  Unit: this.data[i].Unit,
                  Balance: this.data[i].Balance,
                });
                break;
              } else {
                this.alertNotPart();
              }
            }
          }
        }
      });
    }
  }

  // for (let s = 0; s < this.spareList.length; s++) {
  //   if (this.sparepart == this.spareList[s].PartNo) {
  //     console.log(this.spareList[s].PartNo);            
  //   }else{

  //     for (let i = 0; i < this.asset.length; i++) {
  //       const a = this.asset[i].SerialNo  
  //       if (this.sparepart == a) {
  //         this.productname = this.asset[i].type;
  //         this.installcode = this.asset[i].AssetCode;
  //         this.installname = this.asset[i].AssetNo;
  //         this.installserial = this.asset[i].SerialNo;
  //         this.asset = this.asset[i].AssetID;
  //         let task = this.sparepart;
  //         let no = 1;
  //         this.spareList.push({PartNo:task,NO:no,assetID:this.asset});
  //         this.sparepart = "";
  //         this.chkdata = 1;
  //         this.isShowSpareDetail = true;
  //         break;      
  //     }
  //   }
  //   }

  // }


  remove(index) {
    this.spareList.splice(index, 1);
  }

  removelist(index) {
    this.listreal.splice(index, 1);
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
  AddCM(type, item) {
    if (type == "Device") {
      let params = {
        planID: this.planID,
        installID: this.installID,
        idold: this.assetold,
        idnew: this.assetnew,
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
    else if (type == "Devices") {
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
    else if (type == "Sparepart" || type == "Spareparts") {
      for (let s = 0; s < item.length; s++) {
        this.true = 0;
        if (item[s].No > item[s].Balance) {
          this.alertQty();
          this.true = 1;
          break;
        }
      }
      if (this.true == 0) {
        this.check()
      }
    }
  }
  //#endregion

  check() {
    console.log();

    for (let i = 0; i < this.listreal.length; i++) {
      if (this.listreal[i].No <= this.listreal[i].Balance
        && this.listreal[i].No != 0) {
        this.AsList.push(
          {
            SKUID: this.listreal[i].SKUID,
            SKUCode: this.listreal[i].SKUCode,
            Name: this.listreal[i].Name,
            Qty: this.listreal[i].No,
            Unit: this.listreal[i].Unit
          });
        console.log(this.AsList);
      }
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
      message: 'ไม่พบ Patr No. นี้',
      buttons: ['OK']
    });
    await alert.present();
  }
} 
