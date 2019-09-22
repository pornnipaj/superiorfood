import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-detaillistpm',
  templateUrl: './detaillistpm.page.html',
  styleUrls: ['./detaillistpm.page.scss'],
})
export class DetaillistpmPage implements OnInit {

  //#region data

  myId;
  isShowWait;
  isShowSuccess;
  workfinish;
  cusID;
  planID;
  detaillistpm;
  data;

  //#endregion

  //#region constructor

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private postDataService: PostDataService) {
    this.detaillistpm = [];
    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params.currency);
      this.cusID = this.myId.cusID
      this.planID = this.myId.planID
      this.workfinish = this.myId.WorkFinish
      console.log("receive", this.myId);
    });

  }

  //#endregion

  //#region start

  ngOnInit() {

    if (this.workfinish == 0) {
      this.isShowWait = true;
      this.isShowSuccess = false;
    }
    if (this.workfinish != 0) {
      this.isShowSuccess = true;
      this.isShowWait = false;
    }

    this.detaillistpm.cusID = this.cusID;
    this.detaillistpm.planID = this.planID;

    this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
      this.data = work;
      console.log(this.data);
      
      
    });

  }

  //#endregion

  //#region click

  click(item) {
    if (this.workfinish == 0) {

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(this.myId)
        }
      };
      this.navCtrl.navigateForward(['/joball/listpm/detailofdetaillistpm'], navigationExtras);
      console.log("sent", this.myId);
    }

    if (this.workfinish == 1) {
      
      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(item)
        }
      };
      this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
      console.log("sent", navigationExtras);
    }
  }

  //#endregion

}
