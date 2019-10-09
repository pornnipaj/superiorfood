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
  workfinish;
  cusID;
  planID;
  detaillistpm;
  data;
  Customername;
  Name;
  month;
  year;
  insID;
  item;
  type;

  //#endregion

  //#region constructor

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    private storageService: StorageService) {
    this.detaillistpm = [];

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.item = this.myId.item
      this.type = this.myId.type

      this.cusID = this.item.cusID
      this.planID = this.item.planID
      this.workfinish = this.item.WorkFinish
      this.month = this.item.month
      this.year = this.item.year
      console.log("receive", this.cusID);
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
    this.detaillistpm.cusID = this.cusID;
    this.detaillistpm.planID = this.planID;
    this.detaillistpm.month = this.month;
    this.detaillistpm.year = this.year;
    this.detaillistpm.type = this.type;
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

  click(data, item) {
    console.log('Data', data);
    console.log('item', item);


    if (item.Workfinish == 0) {
      let params = {
        planID: this.planID,
        install: item,
      }

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(params)
        }
      };
      this.navCtrl.navigateForward(['/joball/listpm/detailofdetaillistpm'], navigationExtras);
      // console.log("sent", navigationExtras);
    }

    if (item.Workfinish == 1) {
      console.log(item.installId);

      let params = {
        data: data,
        installID: item.installId,
      }

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(params)
        }
      };
      this.navCtrl.navigateForward(['/joball/listpm/detaillistpm/jobdetail'], navigationExtras);
      console.log("sent", navigationExtras);
    }
  }

  //#endregion

}
