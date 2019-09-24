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
  Customername;
  Name;
  month;
  year;
  //#endregion

  //#region constructor

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    private storageService:StorageService) {
    this.detaillistpm = [];
    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params.currency);
      this.cusID = this.myId.cusID
      this.planID = this.myId.planID
      this.workfinish = this.myId.WorkFinish
      this.month = this.myId.month
      this.year = this.myId.year
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
    this.detaillistpm.month = this.month;
    this.detaillistpm.year = this.year;
console.log(this.detaillistpm);

    this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
      this.data = work;
      console.log(this.data);
      for (let i = 0; i < this.data.length; i++) {
        this.Customername = this.data[i].CustomerName;   
        this.data[i].productInstall = JSON.parse(this.data[i].productInstall);     
      }
      
    });

  }

  //#endregion

  //#region click

  click(item) {
    console.log(item);
    
    if (this.workfinish == 0) {

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(item)
        }
      };
      this.navCtrl.navigateForward(['/joball/listpm/detailofdetaillistpm'], navigationExtras);
      console.log("sent", navigationExtras);
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
