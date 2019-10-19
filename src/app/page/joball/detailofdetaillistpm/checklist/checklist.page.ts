import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
 
  link;
  empID;
  planID;
  installID;
  tran;
  url: SafeResourceUrl;

  constructor(public modalController: ModalController,
    private navParams: NavParams,
    sanitizer: DomSanitizer,) {

    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install
    console.log(this.empID, this.planID, this.installID);
    this.tran = [];;

    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://superior.wingplusweb.com/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
    // this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41604/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
  }

  //#region start

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss(0);
  }

}
