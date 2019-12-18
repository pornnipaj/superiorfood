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
  SerialNo;

  constructor(private modalController: ModalController,
    private postDataService: PostDataService,
    private barcodeScanner: BarcodeScanner,
    private navParams: NavParams) { 

      this.planID = this.navParams.data.planID;
      this.installID = this.navParams.data.installID;

      let params = {
        installID: this.installID,
        planID: this.planID,
        jobtype: "changspare"
      }
      console.log(params);
      this.postDataService.SaveCaseAll(params).then(data => {
        this.data = data
        console.log(this.data);
      });
    }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let barcode = barcodeData
      this.SerialNo = barcode.text
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async submit(item){
    let params = {
      installID: this.installID,
      planID: this.planID,
      jobtype: "savespare",
      spare:item
    }
    console.log(params);
    this.postDataService.SaveCaseAll(params).then(data => {
      this.data = data
      console.log(this.data);
    });
    await this.modalController.dismiss(0);
  }
}
