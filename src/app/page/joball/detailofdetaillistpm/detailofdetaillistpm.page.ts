import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignaturePage } from '../detailofdetaillistpm/signature/signature.page';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Sig } from '../../../storage.service';

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
  //#endregion

  //#region constructor

  constructor(private camera: Camera,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private storageService: StorageService) {
    this.myDate = new Date().toISOString();
    // this.loadItems()
  }

  //#endregion

  //#region start

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.planID = this.myId.planID
      // this.tranID = this.myId.tranID
      console.log("receive", this.myId.productInstall);
      for (let i = 0; i < this.myId.productInstall.length; i++) {
        this.InstallPlanName = this.myId.productInstall[i].InstallPlanName;
        this.SerialNo = this.myId.productInstall[i].SerialNo;
        this.ItemsName = this.myId.productInstall[i].ItemsName;
        this.ItemCode = this.myId.productInstall[i].ItemCode;
        this.ProductCode = this.myId.productInstall[i].ProductCode;
        console.log(this.myId);

      }
    });
    this.loadItems()
  }

  loadItems() {
    this.storageService.getSig().then(items => {
      this.sign = items;
      console.log(this.sign);

    });
  }

  //#endregion

  //#region click

  async Modal() {
    const modal = await this.modalController.create({
      component: SignaturePage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'Y'
      }
    });
    return await modal.present();
  }

  Take(id) {

    if (id == 1) {
      this.functiontake();
      this.isShow1 = true;
      this.isTake1 = false;
    }
    if (id == 2) {
      this.functiontake();
      this.isShow2 = true;
      this.isTake2 = false;
    }
    if (id == 3) {
      this.functiontake();
      this.isShow3 = true;
      this.isTake3 = false;
    }
    if (id == 4) {
      this.functiontake();
      this.isShow4 = true;
      this.isTake4 = false;
    }
    if (id == 5) {
      this.functiontake();
      this.isShow5 = true;
      this.isTake5 = false;
    }
    if (id == 6) {
      this.functiontake();
      this.isShow6 = true;
      this.isTake6 = false;
    }
    
  }

functiontake(){
  const options: CameraOptions = {
    quality: 70,
    targetWidth: 320,
    targetHeight: 320,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true
  }
      
  this.camera.getPicture(options).then((imageData) => {
    this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    console.log("Camera issue:" + err);
  });
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
