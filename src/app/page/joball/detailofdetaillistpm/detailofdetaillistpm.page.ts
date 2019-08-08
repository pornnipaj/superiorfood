import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-detailofdetaillistpm',
  templateUrl: './detailofdetaillistpm.page.html',
  styleUrls: ['./detailofdetaillistpm.page.scss'],
})
export class DetailofdetaillistpmPage implements OnInit {
myDate;
myphoto;
  constructor(private camera: Camera) {
    this.myDate = new Date().toISOString();

  }

  ngOnInit() {
  }

  takephoto() {
    console.log('Take photo');
    const options: CameraOptions = {
      quality: 70,
      targetHeight: 600,
      targetWidth: 800,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      console.log(this.myphoto);

    }, (err) => {
    });
  }

}
