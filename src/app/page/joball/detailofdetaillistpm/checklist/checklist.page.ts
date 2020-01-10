import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PostDataService } from '../../../../post-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  //#region data
  link;
  empID;
  planID;
  installID;
  tran;
  url: SafeResourceUrl;
  //#endregion data

  //#region constructor
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    private postDataService: PostDataService,
    sanitizer: DomSanitizer,
    public alertController: AlertController,) {

    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install
    console.log(this.empID, this.planID, this.installID);
    this.tran = [];;

    // this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41669/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
  }
  //#endregion

  //#region start

  ngOnInit() {
  }
  //#endregion
  
  //#region close  
  close() {
    let params = {
      jobtype: "CheckList",
      installID: this.installID,
      planID: this.planID
    }
    console.log(params);
    this.postDataService.SaveCaseAll(params).then(data => {
      console.log(data);
      if (data == "true") {
        this.modalController.dismiss(0);
      }else{
        this.alertFail()
        // this.modalController.dismiss(1);
      }
    });
    
  }
  //#endregion

  async alertFail() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['OK']
    });

    await alert.present();
  }
}
