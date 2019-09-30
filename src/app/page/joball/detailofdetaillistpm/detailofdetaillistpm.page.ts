import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignaturePage } from '../detailofdetaillistpm/signature/signature.page';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Sig } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';
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
      const options: CameraOptions = {
        quality: 70,
        targetWidth: 320,
        targetHeight: 320,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {

        let base64Image = 'data:image/jpeg;base64,${imageData}';
        this.myphoto1 = base64Image;

        alert('string' + imageData)
        alert('base64' + base64Image)

        this.isShow1 = true;
        this.isTake1 = false;
      }, (err) => {
        // Handle error
      });
    }

    if (id == 2) {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.myphoto2 = base64Image

        this.isShow2 = true;
        this.isTake2 = false;
      }, (err) => {
        // Handle error
      });

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

  functiontake() {


    // let params={ 
    //   signature: this.myphoto1
    // }
    // this.postDataService.post(params).then((data:any) => {
    //   this.myphoto1 = data
    //   for (let i = 0; i < this.myphoto1.length; i++) {
    //   this.myphoto1 = this.myphoto1[i];         

    //   }
    //   this.myphoto1 = this.myphoto1.signature
    //   console.log(this.myphoto1);
    // })
  };

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
