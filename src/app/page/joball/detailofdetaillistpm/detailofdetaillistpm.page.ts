import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignaturePage } from '../detailofdetaillistpm/signature/signature.page';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Sig } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';
import { Base64 } from '@ionic-native/base64';
@Component({
  selector: 'app-detailofdetaillistpm',
  templateUrl: './detailofdetaillistpm.page.html',
  styleUrls: ['./detailofdetaillistpm.page.scss'],
})
export class DetailofdetaillistpmPage implements OnInit {

  //#region data

  myDate;
  myphoto1;
  myphoto2;
  myphoto3;
  myphoto4;
  myphoto5;
  myphoto6;
  myId;
  planID;
  isTake1 = true;
  isShow1 = false;
  isTake2 = true;
  isShow2 = false;
  isTake3 = true;
  isShow3 = false;
  isTake4 = true;
  isShow4 = false;
  isTake5 = true;
  isShow5 = false;
  isTake6 = true;
  isShow6 = false;
  InstallPlanName;
  SerialNo;
  ItemsName;
  ItemCode;
  ProductCode;
  sign;
  install;
  showSig = false;
  capturedSnapURL;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  base64;
  //#endregion

  //#region constructor

  constructor(private camera: Camera,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private postDataService: PostDataService) {
    this.myDate = new Date().toString();

    // this.loadItems()
  }

  //#endregion

  //#region start

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.planID = this.myId.planID
      this.install = this.myId.install
      console.log("receive", this.planID);

      for (let i = 0; i < this.install.length; i++) {
        this.install = (this.install[i])
      }
      this.InstallPlanName = this.install.InstallPlanName;
      this.SerialNo = this.install.SerialNo;
      this.ItemsName = this.install.ItemsName;
      this.ItemCode = this.install.ItemCode;
      this.ProductCode = this.install.ProductCode;
    });


    // this.route.queryParams.subscribe(params => {
    //   this.myId = JSON.parse(params["sig"]);
    //   console.log("receive", this.myId);

    // });
    // this.loadItems()
  }

  loadItems() {
    this.storageService.getSig().then(items => {
      this.sign = items;
      // console.log(this.sign);

    });
  }

  //#endregion

  //#region click

  async Modal() {
    const modal = await this.modalController.create({
      component: SignaturePage,
      componentProps: { sign: this.sign }
    });

    modal.onDidDismiss().then(data => {
      this.showSig = true;
      this.sign = data
      for (let i = 0; i < this.sign.length; i++) {
        this.sign = this.sign[i]
      }
      this.sign = this.sign.data
      // console.log(this.sign)
    })

    return await modal.present();
  }


  Take(id) {

    if (id == 1) {
      this.camera.getPicture(this.cameraOptions).then((imageData1) => {
        alert('imagedata1=' + imageData1)
        let base64Image1 = 'data:image/jpeg;base64,' + imageData1;
        this.myphoto1 = base64Image1;
        alert('base64Image1=' + base64Image1)
      }, (err) => {

        console.log(err);
        // Handle error
      });

      this.isTake1 = false;
      this.isShow1 = true;

      this.base64 = this.myphoto1.toDataURL();
      alert('base64=' + this.base64);
    }

    if (id == 2) {
      this.camera.getPicture(this.cameraOptions).then((imageData2) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image2 = 'data:image/jpeg;base64,' + imageData2;
        this.myphoto2 = base64Image2;
      }, (err) => {

        console.log(err);
        // Handle error
      });
      this.isTake2 = false;
      this.isShow2 = true;

    }
    if (id == 3) {
      this.camera.getPicture(this.cameraOptions).then((imageData3) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image3 = 'data:image/jpeg;base64,' + imageData3;
        this.myphoto3 = base64Image3;
      }, (err) => {

        console.log(err);
        // Handle error
      });
      this.isTake3 = false;
      this.isShow3 = true;
    }
    if (id == 4) {
      this.camera.getPicture(this.cameraOptions).then((imageData4) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image4 = 'data:image/jpeg;base64,' + imageData4;
        this.myphoto4 = base64Image4;
      }, (err) => {

        console.log(err);
        // Handle error
      });
      this.isTake4 = false;
      this.isShow4 = true;
    }
    if (id == 5) {
      this.camera.getPicture(this.cameraOptions).then((imageData5) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image5 = 'data:image/jpeg;base64,' + imageData5;
        this.myphoto5 = base64Image5;
      }, (err) => {

        console.log(err);
        // Handle error
      });
      this.isTake5 = false;
      this.isShow5 = true;
    }
    if (id == 6) {
      this.camera.getPicture(this.cameraOptions).then((imageData6) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image6 = 'data:image/jpeg;base64,' + imageData6;
        this.myphoto6 = base64Image6;
      }, (err) => {

        console.log(err);
        // Handle error
      });
      this.isTake6 = false;
      this.isShow6 = true;
    }

  }

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {

      console.log(err);
      // Handle error
    });
  }


  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //#endregion

  // takephoto() {
  //   console.log('Take photo');
  //   const options: CameraOptions = {
  //     quality: 70,
  //     targetHeight: 600,
  //     targetWidth: 800,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     allowEdit: true,
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //     this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //     this.photos.push(this.base64Image); 
  //     console.log(this.myphoto);

  //   }, (err) => {
  //   });
  // }

}
