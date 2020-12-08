import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PostDataService } from '../../../post-data.service';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-parts-waiting-list',
  templateUrl: './parts-waiting-list.page.html',
  styleUrls: ['./parts-waiting-list.page.scss'],
})
export class PartsWaitingListPage implements OnInit {
  //#region data
  JobID;
  empID;
  url: SafeResourceUrl;

  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    sanitizer: DomSanitizer,
    public alertController: AlertController,) {
      this.empID = this.navParams.data.empID;
      this.JobID = this.navParams.data.JobID;
    this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/PartsWaitingList.aspx' + '?empID=' + this.empID + '&JobID=' + this.JobID);
  }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss(0);
  }
}
