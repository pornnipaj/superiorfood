import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  true;
  type;
  skuID;

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
        });
      } else {
        let params = {
          planID: this.planID,
          installID: this.installID,
          typedevice: "GetSpareIN",
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          console.log(this.data);
        });
      }
    }
    else if (this.jobtype == "PM") {
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
      });
    }
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss(0);
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
  check(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].No <= data[i].Balance && data[i].No != 0) {
        this.AsList.push(
          {
            SKUID: data[i].SKUID,
            SKUCode: data[i].SKUCode,
            Name: data[i].Name,
            Qty: data[i].No,
            Unit: data[i].Unit
          });
        console.log(this.AsList);
      }
    }
    if (this.AsList.length > 0) {
      if (this.jobtype == "INSTALL") {
        let params = {
          installID: this.installID,
          planID: this.planID,
          typedevice: "SaveSpareIN",
          spare: this.AsList,
          empID: this.empID
        }
        console.log(params);
        this.postDataService.postdevice(params).then(data => {
          this.data = data
          console.log(this.data);
          if (data == true) {
            this.modalController.dismiss(0);
          }
        });
      }
      else if (this.jobtype == "PM") {
        let params = {
          installID: this.installID,
          planID: this.planID,
          typedevice: "SaveSparePM",
          spare: this.AsList,
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
    }
  }

  async submit(data) {
    console.log(data);
    for (let s = 0; s < data.length; s++) {
      this.true = 0;
      if (data[s].No > data[s].Balance) {
        this.alertQty();
        this.true = 1;
        break;
      }
    }
    if (this.true == 0) {
      this.check(data)
    }
  }

  async alertQty() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณากรอกจำนวนให้ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
  }

  saveDevice(item){
    let params = {
      planID: this.planID,
      installID: this.installID,
      typedevice: "SaveDeviceIN",
      empID: this.empID,
      assID:item.AssetID
    }
    console.log(params);
    this.postDataService.postdevice(params).then(data => {
      this.modalController.dismiss(data);
    });    
  }

  Searchsku(){
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
        console.log(this.data);
      });
    }else{
    let params = {
      skuID: this.skuID,
      typedevice: "Searchsku",
      empID: this.empID
    }
    console.log(params);
    this.postDataService.postdevice(params).then(data => {
      this.data = data
      console.log(this.data);
    });  
  }
  }
}
