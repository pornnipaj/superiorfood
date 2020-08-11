import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PostDataService } from '../../../../post-data.service';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

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
  urls: SafeResourceUrl;
  type;
  tranid;
  date;
  item;
  types;

  //#endregion data

  //#region constructor
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    sanitizer: DomSanitizer,
    public alertController: AlertController, ) {

    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install
    this.type = this.navParams.data.type;
    this.tranid = this.navParams.data.tranid;
    this.date = this.navParams.data.date;
    this.item = this.navParams.data.item;
    this.types = this.navParams.data.types;
    console.log(this.empID, this.planID, this.installID, this.type,this.tranid);
    this.tran = [];;
    if (this.type == "new") {
      this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
      //  this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41669/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);

    } else if (this.type == "edit") {
      this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
      // this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41669/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);

    }else if (this.type == "report") {
      this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/GenerateReport.aspx' + '?tranid=' + this.tranid);
      this.closeiframe();
      // this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41669/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
    }
  }
  //#endregion
  closeiframe(){
    this.alertSuccess();
    let params = {
      item: this.item,
      type: "getPM",
      date: this.date,
    }
    console.log(params);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(params)
      }
    };
    console.log(navigationExtras);
    this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
    //this.navCtrl.navigateForward(['/menu/overview']);   
  }  
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
      } else {
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

    //#region alert success
    async alertSuccess() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'บันทึกสำเร็จ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
}
