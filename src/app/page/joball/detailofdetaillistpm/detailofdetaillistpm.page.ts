import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignaturePage } from '../detailofdetaillistpm/signature/signature.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailofdetaillistpm',
  templateUrl: './detailofdetaillistpm.page.html',
  styleUrls: ['./detailofdetaillistpm.page.scss'],
})
export class DetailofdetaillistpmPage implements OnInit {

myDate;
myphoto;
myId;

  constructor(private camera: Camera,public modalController: ModalController,private route: ActivatedRoute) {
    this.myDate = new Date().toISOString();

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      console.log("receive", this.myId);
    });
  }

  async Modal(){
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

  Take() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Camera issue:" + err);
    });
  }

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
