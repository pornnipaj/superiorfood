import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../post-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../../storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-picserial',
  templateUrl: './picserial.page.html',
  styleUrls: ['./picserial.page.scss'],
})
export class PicserialPage implements OnInit {
  datas;
  empID;
  data;
  item;
  type;
  apiServer_url;
  photo1;
  picserial = null;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 960,
    targetHeight: 1067,
  }

  constructor(private route: ActivatedRoute,
    private camera: Camera,
    public navCtrl: NavController,
    private storageService: StorageService,
    private postDataService: PostDataService) {
    this.route.queryParams.subscribe(params => {
      this.datas = JSON.parse(params["data"]);
      this.empID = this.datas.empID;
      this.type = this.datas.type;
      this.data = this.datas.data;
      this.item = this.datas.item;
      console.log(this.datas);
      console.log(this.data);
      console.log(this.empID);
      console.log(this.item);
      this.GetSerial();
    });
    this.apiServer_url = this.postDataService.apiServer_url;
  }

  ngOnInit() {
  }

  GetSerial() {
    let params = {
      installID: this.item.installId,
      typedevice: "checkserial"
    }
    console.log(params);
    this.postDataService.postdevice(params).then(picserial => {
      this.picserial = this.apiServer_url + picserial;
      console.log(this.picserial);

    });
  }
  TakeSerial() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photo1 = base64Image;
      if (this.photo1 == null || "") {

      } else {
        let params = {
          planID: this.item.planID,
          installID: this.item.installId,
          photo: this.photo1,
          empID: this.empID,
          jobtype: "SaveImgSerial"
        }
        console.log(params);
        this.postDataService.SaveCaseAll(params).then(picserial => {
          this.picserial = this.apiServer_url + picserial;
          if (this.type == 'CM') {
            let params = {
              item: this.item,
              type: this.type,
            }
            let navigationExtras: NavigationExtras = {
              queryParams: {
                data: JSON.stringify(params)
              }
            };
            console.log(navigationExtras);
            this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
          } else {
            let params = {
              planID: this.item.planID,
              install: this.item,
              data: this.data,
              insID: this.item.installId,
              sparetype: this.item.sparepart,
              item: this.item,
              type: this.type,
            }
            console.log(params);
            console.log(this.item);

            const navigationExtras: NavigationExtras = {
              queryParams: {
                data: JSON.stringify(params)
              }
            };
            this.navCtrl.navigateForward(['joball/listpm/detailofdetaillistpm'], navigationExtras);
            console.log("sent", navigationExtras);
          }
        });
      }
    }, (err) => {
      // this.photo1 = "data:image/png;base64,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"
      // let params = {
      //   planID: this.item.planID,
      //   installID: this.item.installId,
      //   photo: this.photo1,
      //   empID: this.empID,
      //   jobtype: "SaveImgSerial"
      // }
      // console.log(params);
      // this.postDataService.SaveCaseAll(params).then(picserial => {
      //   this.picserial = this.apiServer_url + picserial;
      //   if (this.type == 'CM') {
      //     let params = {
      //       item: this.item,
      //       type: this.type,
      //     }
      //     let navigationExtras: NavigationExtras = {
      //       queryParams: {
      //         data: JSON.stringify(params)
      //       }
      //     };
      //     console.log(navigationExtras);
      //     this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
      //   } else {
      //     let params = {
      //       planID: this.item.planID,
      //       install: this.item,
      //       data: this.data,
      //       insID: this.item.installId,
      //       sparetype: this.item.sparepart,
      //       item: this.item,
      //       type: this.type,
      //     }
      //     console.log(params);
      //     console.log(this.item);

      //     const navigationExtras: NavigationExtras = {
      //       queryParams: {
      //         data: JSON.stringify(params)
      //       }
      //     };
      //     this.navCtrl.navigateForward(['joball/listpm/detailofdetaillistpm'], navigationExtras);
      //     console.log("sent", navigationExtras);
      //   }
      // });
    });
  }
}
