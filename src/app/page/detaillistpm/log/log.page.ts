import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PostDataService } from '../../../post-data.service';
import { AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  empID;
  insID;
  planID;
  url: SafeResourceUrl;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    sanitizer: DomSanitizer,
    public alertController: AlertController,) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/PartsWaitingList.aspx' + '?empID=' + this.empID + '?insID=' + this.insID + '?planID=' + this.planID);
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss(0);
  }

}
