import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-changsparepart',
  templateUrl: './changsparepart.page.html',
  styleUrls: ['./changsparepart.page.scss'],
})
export class ChangsparepartPage implements OnInit {

  installID;
  planID;
  data;
  empID;
  SerialNo;
  jobtype;
  AsList = [];
  Device = [];
  Devicestorage = [];
  Spare = [];
  Sparestorage = [];
  PM = [];
  PMstorage = [];
  true;
  type;
  skuID;
  isShowDevice = false;
  isShowSpare = false;
  isShowPM = false;
  status;
  qty;
  modal;

  constructor(private modalController: ModalController,
    private postDataService: PostDataService,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    private navParams: NavParams) {

    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.installID;
    this.jobtype = this.navParams.data.jobtype;
    this.empID = this.navParams.data.empID;
    this.type = this.navParams.data.type;
    console.log(this.type);

    if (this.jobtype == "INSTALL") {
      if (this.type == 'device') {
        let param = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetDeviceInTran",
          empID: this.empID
        }
        console.log(param);
        this.postDataService.postdevice(param).then(status => {
          this.status = status
          console.log(this.status);
          if (this.status == false) {
            this.isShowDevice = false;
          } else {
            this.isShowDevice = true;
            for (let u = 0; u < this.status.length; u++) {
              this.Device.push({
                AssetID: this.status[u].AssetID,
                AssetNo: this.status[u].AssetNo,
                SKUID: this.status[u].SKUID,
                SerialNo: this.status[u].SerialNo,
                AssetTypeID: this.status[u].AssetTypeID,
              })
            }
          }
          let params = {
            planID: this.planID,
            installID: this.installID,
            typedevice: "GetDeviceIN",
            empID: this.empID
          }
          console.log(params);
          this.postDataService.postdevice(params).then(data => {
            this.data = data
            console.log(this.data);
            for (let i = 0; i < this.data.length; i++) {
              this.Devicestorage.push({
                AssetID: this.data[i].AssetID,
                AssetNo: this.data[i].AssetNo,
                SKUID: this.data[i].SKUID,
                SerialNo: this.data[i].SerialNo,
                AssetTypeID: this.data[i].AssetTypeID,
              })
            }
          });
          console.log(this.Devicestorage);
          console.log(this.Device);
        });
      } else {
        let item = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetItemSpareIN",
          empID: this.empID
        }
        console.log(item);
        this.postDataService.postdevice(item).then(qty => {
          this.qty = qty;
        });
        let param = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetSpareInTran",
          empID: this.empID
        }
        console.log(param);
        this.postDataService.postdevice(param).then(status => {
          this.status = status
          console.log(this.status);
          if (this.status == false) {
            this.isShowSpare = false;
          } else {
            this.isShowSpare = true;
            for (let u = 0; u < this.status.length; u++) {
              this.Spare.push({
                AssID: this.status[u].AssID,
                SKUID: this.status[u].SKUID,
                SKUCode: this.status[u].SKUCode,
                Name: this.status[u].Name,
                Unit: this.status[u].Unit,
                No: this.status[u].No,
                Serial: this.status[u].Serial,
              })
            }
          }
          let params = {
            planID: this.planID,
            installID: this.installID,
            typedevice: "GetSpareINALL",
            empID: this.empID
          }
          console.log(params);
          this.postDataService.postdevice(params).then(data => {
            this.data = data
            console.log(this.data);
            for (let i = 0; i < this.data.length; i++) {
              this.Sparestorage.push({
                AssID: this.data[i].AssID,
                SKUID: this.data[i].SKUID,
                SKUCode: this.data[i].SKUCode,
                Name: this.data[i].Name,
                Unit: this.data[i].Unit,
                No: this.data[i].No,
                Serial: this.data[i].Serial,
              })
            }
          });
          console.log(this.Sparestorage);
          console.log(this.Spare);
        });
      }
    }
    else if (this.jobtype == "PM") {
      let param = {
        planID: this.planID,
        installID: this.installID,
        typedevice: "GetSpareInTran",
        empID: this.empID
      }
      console.log(param);
      this.postDataService.postdevice(param).then(status => {
        this.status = status
        console.log(this.status);
        if (this.status == false) {
          this.isShowPM = false;
        } else {
          this.isShowPM = true;
          for (let u = 0; u < this.status.length; u++) {
            this.PM.push({
              AssID: this.status[u].AssID,
                SKUID: this.status[u].SKUID,
                SKUCode: this.status[u].SKUCode,
                Name: this.status[u].Name,
                Unit: this.status[u].Unit,
                No: this.status[u].No,
                Serial: this.status[u].Serial,
            })
          }
        }
        let params = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetSparePM",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.PMstorage.push({
              AssID: this.data[i].AssID,
                SKUID: this.data[i].SKUID,
                SKUCode: this.data[i].SKUCode,
                Name: this.data[i].Name,
                Unit: this.data[i].Unit,
                No: this.data[i].No,
                Serial: this.data[i].Serial,
            })
          }
        });
        console.log(this.PMstorage);
        console.log(this.PM);
      });
    }
  }

  DeleteDevice(index, i) {
    this.Device.splice(i, 1);
    this.Devicestorage.push({
      AssetID: index.AssetID,
      AssetNo: index.AssetNo,
      SKUID: index.SKUID,
      SerialNo: index.SerialNo,
      AssetTypeID: index.AssetTypeID,
    })
  }

  AddDevice(index, i) {
    if (this.Device.length == 1) {
      this.alertNotDevice();
    } else {
      this.isShowDevice = true;
      this.Devicestorage.splice(i, 1);
      this.Device.push({
        AssetID: index.AssetID,
        AssetNo: index.AssetNo,
        SKUID: index.SKUID,
        SerialNo: index.SerialNo,
        AssetTypeID: index.AssetTypeID,
      })
    }
  }

  DeleteSpare(index, i) {
    this.Spare.splice(i, 1);
    this.Sparestorage.push({
      AssID: index.AssID,
      SKUID: index.SKUID,
      SKUCode: index.SKUCode,
      Name: index.Name,
      Unit: index.Unit,
      No: index.No,
      Serial: index.Serial,
    })
    console.log(this.Sparestorage);

  }

  AddSpare(index, i) {
    this.isShowSpare = true;
    this.Sparestorage.splice(i, 1);
    this.Spare.push({
      AssID: index.AssID,
      SKUID: index.SKUID,
      SKUCode: index.SKUCode,
      Name: index.Name,
      Unit: index.Unit,
      No: index.No,
      Serial: index.Serial,
    })
    console.log(this.Spare);

  }

  DeletePM(index, i) {
    this.PM.splice(i, 1);
    this.PMstorage.push({
      AssID: index.AssID,
      SKUID: index.SKUID,
      SKUCode: index.SKUCode,
      Name: index.Name,
      Unit: index.Unit,
      No: index.No,
      Serial: index.Serial,
    })
  }

  AddPM(index, i) {
    if (index.No == 0 || index.No > index.Balance) {
      this.alertQty();
    } else {
      this.isShowPM = true;
      this.PMstorage.splice(i, 1);
      this.PM.push({
        AssID: index.AssID,
        SKUID: index.SKUID,
        SKUCode: index.SKUCode,
        Name: index.Name,
        Unit: index.Unit,
        No: index.No,
        Serial: index.Serial,
      })
    }
  }

  ngOnInit() {
  }

  async closeModal(i) {

    await this.modalController.dismiss(i);
  }

  checkin() {
    if (this.jobtype == "INSTALL") {
      this.closeModal(0);
    } else {
      let params = {
        installID: this.installID,
        planID: this.planID,
        typedevice: "CheckInstall",
        empID: this.empID
      }
      console.log(params);
      this.postDataService.postdevice(params).then(status => {
        this.modal = status
        console.log(this.modal);
        if (this.modal = true) {
          this.modal = 0
        } else {
          this.modal = 1
        }
        this.closeModal(this.modal);
      });
    }
  }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let barcode = barcodeData
      this.skuID = barcode.text
      if (this.skuID != null) {
        this.Searchsku();
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async submit(data) {
    let params = {
      installID: this.installID,
      planID: this.planID,
      typedevice: "SaveSparePM",
      spare: this.PM,
      empID: this.empID
    }
    console.log(params);
    this.postDataService.postdevice(params).then(data => {
      this.data = data
      console.log(this.data);
      if (data == true) {
        this.modalController.dismiss(1);
      }
    });
  }

  SaveSpareIn(Spare) {
    if (this.Spare.length == 0) {
      this.alertNotSpare();
    } else {
      let params = {
        installID: this.installID,
        planID: this.planID,
        typedevice: "SaveSpareIN",
        spare: this.Spare,
        empID: this.empID
      }
      console.log(params);
      this.postDataService.postdevice(params).then(data => {
        this.data = data
        if (this.data == false) {
          this.alertaccess();
        } else {
          this.checkin();
        }
        console.log(this.data);
      });
    }
  }

  saveDevice(item) {
    if (item.length == 0) {
      this.alertNotSpare();
    } else {
      let assID;
      for (let i = 0; i < item.length; i++) {
        assID = item[i].AssetID
      }
      console.log(assID);
      let params = {
        planID: this.planID,
        installID: this.installID,
        typedevice: "SaveDeviceIN",
        empID: this.empID,
        assID: assID
      }
      console.log(params);
      this.postDataService.postdevice(params).then(data => {
      });
    }

  }

  Searchsku() {
    console.log(this.skuID);

    if (this.type == 'device') {
      if (this.skuID == null || this.skuID == "") {
        let params = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetDeviceIN",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          this.Devicestorage.splice(0);
          for (let i = 0; i < this.data.length; i++) {
            this.Devicestorage.push({
              AssetID: this.data[i].AssetID,
              AssetNo: this.data[i].AssetNo,
              SKUID: this.data[i].SKUID,
              SerialNo: this.data[i].SerialNo,
              AssetTypeID: this.data[i].AssetTypeID,
            })
          }
        });
      } else {
        let params = {
          installID: this.installID,
          planID: this.planID,
          skuID: this.skuID,
          typedevice: "SearchDevice",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          if (this.data == false) {
            this.alertNotSearchDevice();
          } else {
            for (let i = 0; i < this.data.length; i++) {
              this.Devicestorage.splice(0);
              this.Devicestorage.push({
                AssetID: this.data[i].AssetID,
                AssetNo: this.data[i].AssetNo,
                SKUID: this.data[i].SKUID,
                SerialNo: this.data[i].SerialNo,
                AssetTypeID: this.data[i].AssetTypeID,
              })
            }
          }
          console.log(this.data);
        });
      }
    } else {
      if (this.skuID == null || this.skuID == "") {
        let params = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetSpareINALL",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          console.log(this.data);
          this.data = data;
          this.Sparestorage.splice(0);
          for (let i = 0; i < this.data.length; i++) {
            this.Sparestorage.push({
              AssID: this.data[i].AssID,
              SKUID: this.data[i].SKUID,
              SKUCode: this.data[i].SKUCode,
              Name: this.data[i].Name,
              Unit: this.data[i].Unit,
              No: this.data[i].No,
              Serial: this.data[i].Serial,
            })
          }
        });
      } else {
        let params = {
          installID: this.installID,
          skuID: this.skuID,
          typedevice: "Searchsku",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          if (this.data == false) {
            this.alertNotSearchDevice();
          } else {
            this.Sparestorage.splice(0);
            for (let i = 0; i < this.data.length; i++) {
              this.Sparestorage.push({
                AssID: this.data[i].AssID,
                SKUID: this.data[i].SKUID,
                SKUCode: this.data[i].SKUCode,
                Name: this.data[i].Name,
                Unit: this.data[i].Unit,
                No: this.data[i].No,
                Serial: this.data[i].Serial,
              })
            }
          }
        });
      }
    }

  }

  async alertaccess() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณาเลือกจำนวนอุปกรณ์ให้ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertQty() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณากรอกจำนวนให้ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertNotDevice() {
    const alert = await this.alertController.create({
      message: 'ไม่สามารถเพิ่มเครื่องได้',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertNotSpare() {
    const alert = await this.alertController.create({
      message: 'กรุณาเลือกอุปกรณ์',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertNotSearchDevice() {
    const alert = await this.alertController.create({
      message: 'ไม่พบ Serial No. / Part No. นี้',
      buttons: ['OK']
    });
    await alert.present();
  }
}
